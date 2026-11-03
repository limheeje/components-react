import {forwardRef, useEffect, useId, useImperativeHandle, useMemo, useRef, useState} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'
import {Icon} from '~/components/Icon/Icon'

import {CASCADER_DEFAULT, CASCADER_STATE_CLASS} from './Cascader.constant'
import {CascaderPanel} from './CascaderPanel'
import type {CascaderPanelRef} from './CascaderPanel'
import type {CascaderModelValue, CascaderNode, CascaderProps} from './Cascader.type'
import {buildNodes, encodeNodes, flattenNodes, resolveConfig, resolveModel} from './Cascader.util'
import styles from './Cascader.module.scss'

const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

export interface CascaderRef {
  el: HTMLDivElement | null
  getCheckedNodes: (leafOnly?: boolean) => CascaderNode[]
  focus: () => void
  blur: () => void
}

export const Cascader = forwardRef<CascaderRef, CascaderProps>(function Cascader(
  {
    options = [],
    config,
    value,
    defaultValue,
    onChange,
    onExpandChange,
    renderLabel,
    renderEmpty,
    placeholder = CASCADER_DEFAULT.PLACEHOLDER,
    size = CASCADER_DEFAULT.SIZE,
    disabled = false,
    clearable = false,
    showAllLevels = true,
    collapseTags = false,
    separator = CASCADER_DEFAULT.SEPARATOR,
    filterable = false,
    filterMethod,
    debounce = CASCADER_DEFAULT.DEBOUNCE,
    beforeFilter,
    error = false,
    helperText,
    name,
    id,
    onVisibleChange,
    onRemoveTag,
    onClear,
    onFocus,
    onBlur,
    classNames,
    className,
    ...rest
  },
  ref
) {
  const cfg = useMemo(() => resolveConfig(config), [config])
  const roots = useMemo(() => buildNodes(options, config), [options, config])
  const [internal, setInternal] = useState<CascaderModelValue | undefined>(defaultValue)
  const current = value !== undefined ? value : internal
  const selected = useMemo(() => resolveModel(roots, current, config), [roots, current, config])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [keyword, setKeyword] = useState('')
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const panelRef = useRef<CascaderPanelRef | null>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const generatedId = useId()
  const triggerId = id ?? `cascader-${generatedId}`
  const hasError = error === true || (typeof error === 'string' && error.length > 0)

  useImperativeHandle(ref, () => ({
    el: rootRef.current,
    getCheckedNodes: (leafOnly = false) =>
      panelRef.current?.getCheckedNodes(leafOnly) ?? selected.filter((node) => !leafOnly || node.leaf),
    focus: () => (filterable ? searchRef.current : triggerRef.current)?.focus(),
    blur: () => (document.activeElement as HTMLElement | null)?.blur()
  }))

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query) return setKeyword('')
      try {
        if ((await beforeFilter?.(query)) === false) return
        setKeyword(query)
      } catch {
        setKeyword('')
      }
    }, debounce)
    return () => clearTimeout(timer)
  }, [query, debounce, beforeFilter])

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setVisible(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  })

  const setVisible = (next: boolean) => {
    if (disabled || next === open) return
    setOpen(next)
    if (!next) {
      setQuery('')
      setKeyword('')
      setActiveIndex(-1)
    } else if (filterable) {
      requestAnimationFrame(() => searchRef.current?.focus())
    }
    onVisibleChange?.(next)
  }

  const commit = (next: CascaderModelValue, nodes: CascaderNode[]) => {
    if (value === undefined) setInternal(next)
    onChange?.(next, nodes)
    if (!cfg.multiple) setVisible(false)
  }

  const clear = (event: React.MouseEvent) => {
    event.stopPropagation()
    commit(cfg.emitPath ? [] : cfg.multiple ? [] : '', [])
    onClear?.()
  }

  const removeNode = (node: CascaderNode) => {
    const nextNodes = selected.filter((item) => item.uid !== node.uid)
    const nextValue = encodeNodes(nextNodes, config)
    if (value === undefined) setInternal(nextValue)
    onChange?.(nextValue, nextNodes)
    onRemoveTag?.(cfg.emitPath ? node.pathValues : node.value)
  }

  const remove = (node: CascaderNode, event: React.MouseEvent) => {
    event.stopPropagation()
    removeNode(node)
  }

  const labelOf = (node: CascaderNode) => (showAllLevels ? node.pathLabels.join(separator) : node.label)
  const all = flattenNodes(roots)
  const candidates = cfg.checkStrictly ? all : all.filter((node) => node.leaf)
  const suggestions = keyword
    ? candidates.filter((node) =>
        filterMethod
          ? filterMethod(node, keyword)
          : node.pathLabels.join(separator).toLowerCase().includes(keyword.toLowerCase())
      )
    : []
  const shown = collapseTags ? selected.slice(0, 1) : selected
  const pickSuggestion = (node: CascaderNode) => {
    if (node.disabled) return
    const picked = selected.some((item) => item.uid === node.uid)
    const nextNodes = cfg.multiple
      ? picked
        ? selected.filter((item) => item.uid !== node.uid)
        : [...selected, node]
      : [node]
    commit(encodeNodes(nextNodes, config), nextNodes)
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const typing = event.target instanceof HTMLInputElement
    if (event.key === 'Escape' || event.key === 'Tab') {
      setVisible(false)
      return
    }
    if (event.key === 'Backspace' && typing && cfg.multiple && selected.length && !query) {
      event.preventDefault()
      removeNode(selected[selected.length - 1])
      return
    }
    if (!open) {
      if (event.key === 'Enter' || event.key === 'ArrowDown' || (event.key === ' ' && !typing)) {
        event.preventDefault()
        setVisible(true)
      }
      return
    }
    if (keyword) {
      const enabled = suggestions.map((node, index) => (node.disabled ? -1 : index)).filter((index) => index >= 0)
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        if (!enabled.length) return
        const direction = event.key === 'ArrowDown' ? 1 : -1
        const position = enabled.indexOf(activeIndex)
        setActiveIndex(enabled[(position + direction + enabled.length) % enabled.length] ?? enabled[0] ?? -1)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        const node = suggestions[activeIndex]
        if (node) pickSuggestion(node)
      }
      return
    }
    if (typing && (event.key === ' ' || (query && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')))) return
    if (panelRef.current?.handleKeydown(event)) event.preventDefault()
  }

  return (
    <div
      {...rest}
      ref={rootRef}
      className={cx(styles.bsCascader, styles[`bsCascaderSize${cap(size)}`], className, resolveClassNames(classNames))}
      onFocus={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onFocus?.(event)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setVisible(false)
          onBlur?.(event)
        }
      }}
    >
      <div
        ref={triggerRef}
        id={triggerId}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={`${triggerId}-list`}
        aria-disabled={disabled || undefined}
        aria-invalid={hasError || undefined}
        className={cx(
          styles.bsCascaderTrigger,
          cfg.multiple && styles.bsCascaderTriggerMultiple,
          open && styles[CASCADER_STATE_CLASS.IS_OPEN],
          hasError && styles[CASCADER_STATE_CLASS.IS_ERROR],
          disabled && styles[CASCADER_STATE_CLASS.IS_DISABLED],
          selected.length === 0 && styles[CASCADER_STATE_CLASS.IS_PLACEHOLDER]
        )}
        onClick={() => setVisible(!open)}
        onKeyDown={handleKeydown}
      >
        {cfg.multiple ? (
          <span className={styles.bsCascaderTags}>
            {shown.map((node) => (
              <span key={node.uid} className={styles.bsCascaderTag}>
                <span>{labelOf(node)}</span>
                <button type="button" aria-label={`${labelOf(node)} 제거`} onClick={(event) => remove(node, event)}>
                  <Icon name="close" size={10} />
                </button>
              </span>
            ))}
            {collapseTags && selected.length > 1 && (
              <span className={styles.bsCascaderTag}>+ {selected.length - 1}</span>
            )}
            {filterable && (
              <input
                ref={searchRef}
                value={query}
                placeholder={selected.length ? '' : placeholder}
                onChange={(e) => setQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {!filterable && selected.length === 0 && <span>{placeholder}</span>}
          </span>
        ) : filterable && open ? (
          <input
            ref={searchRef}
            value={query}
            placeholder={selected[0] ? labelOf(selected[0]) : CASCADER_DEFAULT.SEARCH_PLACEHOLDER}
            onChange={(e) => setQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={styles.bsCascaderLabel}>{selected[0] ? labelOf(selected[0]) : placeholder}</span>
        )}
        {clearable && selected.length > 0 && !disabled && (
          <button type="button" className={styles.bsCascaderClear} aria-label="지우기" onClick={clear}>
            <Icon name="close-circle" size={14} />
          </button>
        )}
        <span className={styles.bsCascaderChevron}>
          <Icon name="chevron-down" size={10} />
        </span>
      </div>

      {name && selected.map((node) => <input key={node.uid} type="hidden" name={name} value={String(node.value)} />)}
      {name && !cfg.multiple && !selected.length && <input type="hidden" name={name} value="" />}

      {open && (
        <div
          id={`${triggerId}-list`}
          className={styles.bsCascaderDropdown}
          onMouseDown={(event) => event.preventDefault()}
        >
          {keyword ? (
            suggestions.length ? (
              <ul className={styles.bsCascaderSuggestions} role="listbox">
                {suggestions.map((node, index) => (
                  <li
                    key={node.uid}
                    role="option"
                    aria-selected={selected.some((item) => item.uid === node.uid)}
                    aria-disabled={node.disabled || undefined}
                    className={cx(
                      styles.bsCascaderSuggestion,
                      selected.some((item) => item.uid === node.uid) && styles.bsCascaderSuggestionSelected,
                      node.disabled && styles.bsCascaderSuggestionDisabled,
                      index === activeIndex && styles.bsCascaderSuggestionActive
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => pickSuggestion(node)}
                  >
                    {node.pathLabels.join(separator)}
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.bsCascaderEmpty}>{renderEmpty?.() ?? CASCADER_DEFAULT.NO_MATCH_TEXT}</div>
            )
          ) : (
            <CascaderPanel
              ref={panelRef}
              options={options}
              config={config}
              value={current}
              onChange={commit}
              onExpandChange={onExpandChange}
              renderLabel={renderLabel}
              renderEmpty={renderEmpty}
            />
          )}
        </div>
      )}

      {(hasError || helperText) && (
        <div className={cx(styles.bsCascaderMeta, hasError && styles.bsCascaderError)}>
          {typeof error === 'string' && error ? error : !hasError ? helperText : null}
        </div>
      )}
    </div>
  )
})
