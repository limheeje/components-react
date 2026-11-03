import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'
import Checkbox from '~/components/Checkbox'
import {Icon} from '~/components/Icon/Icon'
import Radio from '~/components/Radio'

import {CASCADER_DEFAULT} from '~/components/Cascader/Cascader.constant'
import type {CascaderModelValue, CascaderNode, CascaderPanelProps} from './Cascader.type'
import {buildNodes, encodeNodes, findByPath, flattenNodes, resolveConfig, resolveModel} from './Cascader.util'
import styles from './Cascader.module.scss'

export interface CascaderPanelRef {
  getCheckedNodes: (leafOnly?: boolean) => CascaderNode[]
  handleKeydown: (event: React.KeyboardEvent) => boolean
}

const EMPTY_OPTIONS: CascaderPanelProps['options'] = []

export const CascaderPanel = forwardRef<CascaderPanelRef, CascaderPanelProps>(function CascaderPanel(
  {
    options = EMPTY_OPTIONS,
    config,
    value,
    defaultValue,
    onChange,
    onExpandChange,
    renderLabel,
    renderEmpty,
    classNames,
    className,
    ...rest
  },
  ref
) {
  const cfg = useMemo(() => resolveConfig(config), [config])
  const {lazy, lazyLoad} = cfg
  const [sourceOptions, setSourceOptions] = useState(options)
  const [rootLoading, setRootLoading] = useState(false)
  const [version, setVersion] = useState(0)
  const roots = useMemo(() => {
    void version
    return buildNodes(sourceOptions, config)
  }, [sourceOptions, config, version])
  const [internal, setInternal] = useState<CascaderModelValue | undefined>(defaultValue)
  const current = value !== undefined ? value : internal
  const selected = useMemo(() => resolveModel(roots, current, config), [roots, current, config])
  const [path, setPath] = useState<CascaderNode[]>(() => (selected[0] ? chainOf(selected[0]).slice(0, -1) : []))
  const [focusNode, setFocusNode] = useState<CascaderNode | null>(selected[0] ?? null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selected[0]) setPath(chainOf(selected[0]).slice(0, -1))
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setSourceOptions(options), [options])

  useEffect(() => {
    if (sourceOptions.length || !lazy || !lazyLoad) return
    setRootLoading(true)
    lazyLoad(createRootNode(), (items) => {
      setRootLoading(false)
      setSourceOptions(items ?? [])
    })
  }, [lazy, lazyLoad, sourceOptions.length])

  useEffect(() => {
    if (!version || !path.length) return
    const currentNode = findByPath(roots, path[path.length - 1].pathValues)
    if (currentNode) setPath(chainOf(currentNode))
  }, [version, roots]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!lazy || !lazyLoad || !cfg.emitPath || !Array.isArray(current) || !current.length || !sourceOptions.length)
      return
    const paths = (Array.isArray(current[0]) ? current : [current]) as Array<Array<string | number>>
    let cancelled = false
    const ensure = async () => {
      let changed = false
      for (const values of paths) {
        for (let index = 0; index < values.length - 1; index++) {
          const partial = values.slice(0, index + 1)
          const tree = buildNodes(sourceOptions, config)
          const node = findByPath(tree, partial)
          if (!node || node.loaded || node.leaf) continue
          await new Promise<void>((resolve) => {
            lazyLoad(node, (items) => {
              node.data[cfg.children] = items ?? []
              node.data[cfg.leaf] = !items?.length
              changed = true
              resolve()
            })
          })
        }
      }
      if (!cancelled && changed) setSourceOptions([...sourceOptions])
    }
    void ensure()
    return () => {
      cancelled = true
    }
  }, [current, lazy, lazyLoad]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToFocus = (node: CascaderNode) =>
    requestAnimationFrame(() =>
      rootRef.current?.querySelector<HTMLElement>(`[data-uid="${node.uid}"]`)?.scrollIntoView?.({block: 'nearest'})
    )

  const handleKeydown = (event: React.KeyboardEvent) => {
    const move = (direction: 1 | -1) => {
      const siblings = focusNode?.parent ? focusNode.parent.children : roots
      const enabled = siblings.filter((node) => !node.disabled)
      if (!enabled.length) return
      const position = focusNode ? enabled.findIndex((node) => node.uid === focusNode.uid) : -1
      const next = enabled[(position + direction + enabled.length) % enabled.length] ?? enabled[0]
      if (!next) return
      setFocusNode(next)
      setPath(chainOf(next))
      scrollToFocus(next)
    }
    switch (event.key) {
      case 'ArrowDown':
        move(1)
        return true
      case 'ArrowUp':
        move(-1)
        return true
      case 'ArrowRight': {
        if (!focusNode) move(1)
        else if (!focusNode.leaf && !focusNode.disabled) {
          expand(focusNode)
          load(focusNode)
          const child = focusNode.children.find((node) => !node.disabled)
          if (child) {
            setFocusNode(child)
            scrollToFocus(child)
          }
        }
        return true
      }
      case 'ArrowLeft':
        if (focusNode?.parent) {
          setFocusNode(focusNode.parent)
          setPath(chainOf(focusNode.parent))
          scrollToFocus(focusNode.parent)
        }
        return true
      case 'Enter':
        if (focusNode && !focusNode.disabled) {
          if (focusNode.leaf || cfg.checkStrictly) activate(focusNode)
          else {
            expand(focusNode)
            load(focusNode)
          }
        }
        return true
      case ' ':
        if (focusNode && !focusNode.disabled && (cfg.multiple || cfg.checkStrictly)) toggleNode(focusNode)
        return true
      default:
        return false
    }
  }

  useImperativeHandle(ref, () => ({
    getCheckedNodes: (leafOnly = false) => {
      if (leafOnly || cfg.checkStrictly || !cfg.multiple) return selected.filter((node) => !leafOnly || node.leaf)
      const selectedPaths = new Set(selected.map(pathKey))
      return flattenNodes(roots).filter((node) => {
        if (node.leaf) return selectedPaths.has(pathKey(node))
        const leaves = enabledLeaves(node)
        return leaves.length > 0 && leaves.every((leaf) => selectedPaths.has(pathKey(leaf)))
      })
    },
    handleKeydown
  }))

  const commit = (next: CascaderNode[]) => {
    const encoded = encodeNodes(next, config)
    if (value === undefined) setInternal(encoded)
    onChange?.(encoded, next)
  }

  const expand = (node: CascaderNode) => {
    const next = [...path.slice(0, node.level - 1), node]
    setPath(next)
    onExpandChange?.(node.pathValues)
  }

  const load = (node: CascaderNode) => {
    if (!cfg.lazy || !cfg.lazyLoad || node.loaded || node.loading || node.leaf) return
    node.loading = true
    cfg.lazyLoad(node, (items) => {
      node.data[cfg.children] = items ?? []
      node.data[cfg.leaf] = !items?.length
      node.loading = false
      setVersion((v) => v + 1)
    })
  }

  const activate = (node: CascaderNode) => {
    if (node.disabled) return
    const selectable = cfg.checkStrictly || node.leaf
    if (selectable) {
      if (cfg.multiple) {
        const exists = selected.some((item) => samePath(item, node))
        commit(exists ? selected.filter((item) => !samePath(item, node)) : [...selected, node])
      } else {
        commit([node])
      }
    }
    if (!node.leaf) {
      expand(node)
      load(node)
    }
  }

  const toggleNode = (node: CascaderNode) => {
    if (node.disabled) return
    if (cfg.checkStrictly || node.leaf) return activate(node)
    const leaves = enabledLeaves(node)
    const leafKeys = new Set(leaves.map(pathKey))
    const selectedKeys = new Set(selected.map(pathKey))
    const allChecked = leaves.length > 0 && leaves.every((leaf) => selectedKeys.has(pathKey(leaf)))
    const others = selected.filter((item) => !leafKeys.has(pathKey(item)))
    commit(allChecked ? others : [...others, ...leaves])
  }

  const menus = [roots, ...path.map((node) => node.children)].filter((menu, index) => index === 0 || menu.length > 0)

  return (
    <div
      {...rest}
      ref={rootRef}
      role="group"
      className={cx(styles.bsCascaderPanel, className, resolveClassNames(classNames))}
      tabIndex={0}
      onKeyDown={(event) => {
        rest.onKeyDown?.(event)
        if (!event.defaultPrevented && handleKeydown(event)) event.preventDefault()
      }}
    >
      {roots.length === 0 ? (
        <div className={styles.bsCascaderEmpty}>
          {renderEmpty?.() ??
            (rootLoading ? (
              <>
                <span className={styles.bsCascaderSpinner} /> {CASCADER_DEFAULT.LOADING_TEXT}
              </>
            ) : (
              CASCADER_DEFAULT.EMPTY_TEXT
            ))}
        </div>
      ) : (
        menus.map((menu, level) => (
          <ul key={level} className={styles.bsCascaderMenu} role="menu">
            {menu.map((node) => {
              const picked = selected.some((item) => samePath(item, node))
              const leaves = enabledLeaves(node)
              const selectedKeys = new Set(selected.map(pathKey))
              const childCount = leaves.filter((leaf) => selectedKeys.has(pathKey(leaf))).length
              const checked = picked || (!cfg.checkStrictly && leaves.length > 0 && childCount === leaves.length)
              const indeterminate = !cfg.checkStrictly && childCount > 0 && childCount < leaves.length
              const active = path[level]?.uid === node.uid
              return (
                <li
                  key={node.uid}
                  data-uid={node.uid}
                  role={cfg.multiple ? 'menuitemcheckbox' : cfg.checkStrictly ? 'menuitemradio' : 'menuitem'}
                  aria-checked={cfg.multiple || cfg.checkStrictly ? checked : undefined}
                  aria-disabled={node.disabled || undefined}
                  aria-haspopup={!node.leaf || undefined}
                  aria-expanded={!node.leaf ? active : undefined}
                  className={cx(
                    styles.bsCascaderNode,
                    active && styles.bsCascaderNodeInPath,
                    picked && styles.bsCascaderNodeSelected,
                    focusNode?.uid === node.uid && styles.bsCascaderNodeFocus,
                    node.disabled && styles.bsCascaderNodeDisabled
                  )}
                  onClick={() => {
                    setFocusNode(node)
                    activate(node)
                  }}
                  onMouseEnter={() => cfg.expandTrigger === 'hover' && !node.disabled && !node.leaf && expand(node)}
                >
                  {(cfg.multiple || cfg.checkStrictly) && (
                    <span className={styles.bsCascaderControl} onClick={(event) => event.stopPropagation()}>
                      {cfg.multiple ? (
                        <Checkbox
                          size="sm"
                          checked={checked}
                          indeterminate={indeterminate}
                          disabled={node.disabled}
                          tabIndex={-1}
                          onChange={() => toggleNode(node)}
                        />
                      ) : (
                        <Radio
                          size="sm"
                          checked={picked}
                          disabled={node.disabled}
                          tabIndex={-1}
                          onChange={() => toggleNode(node)}
                        />
                      )}
                    </span>
                  )}
                  <span className={styles.bsCascaderNodeLabel}>{renderLabel?.(node) ?? node.label}</span>
                  {node.loading ? (
                    <span className={styles.bsCascaderSpinner} />
                  ) : !node.leaf ? (
                    <span className={styles.bsCascaderNodeArrow}>
                      <Icon name="chevron-right" size={12} />
                    </span>
                  ) : picked ? (
                    <span className={styles.bsCascaderNodeCheck}>
                      <Icon name="check" size={14} />
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ul>
        ))
      )}
    </div>
  )
})

function chainOf(node: CascaderNode) {
  const chain: CascaderNode[] = []
  for (let current: CascaderNode | null = node; current; current = current.parent) chain.unshift(current)
  return chain
}

function samePath(a: CascaderNode, b: CascaderNode) {
  return a.pathValues.length === b.pathValues.length && a.pathValues.every((value, i) => value === b.pathValues[i])
}

function pathKey(node: CascaderNode) {
  return JSON.stringify(node.pathValues)
}

function enabledLeaves(node: CascaderNode): CascaderNode[] {
  if (node.children.length) return node.children.flatMap(enabledLeaves)
  return node.leaf && !node.disabled ? [node] : []
}

function createRootNode(): CascaderNode {
  return {
    uid: 0,
    data: {},
    value: '',
    label: '',
    level: 0,
    parent: null,
    children: [],
    disabled: false,
    leaf: false,
    loaded: false,
    loading: true,
    pathValues: [],
    pathLabels: []
  }
}
