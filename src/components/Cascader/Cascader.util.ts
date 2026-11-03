import {CASCADER_CONFIG_DEFAULT} from '~/components/Cascader/Cascader.constant'
import type {
  CascaderConfig,
  CascaderModelValue,
  CascaderNode,
  CascaderOption,
  CascaderValue
} from '~/components/Cascader/Cascader.type'

export function resolveConfig(config?: CascaderConfig) {
  const d = CASCADER_CONFIG_DEFAULT
  return {
    expandTrigger: config?.expandTrigger ?? d.EXPAND_TRIGGER,
    multiple: config?.multiple ?? d.MULTIPLE,
    checkStrictly: config?.checkStrictly ?? d.CHECK_STRICTLY,
    emitPath: config?.emitPath ?? d.EMIT_PATH,
    lazy: config?.lazy ?? d.LAZY,
    lazyLoad: config?.lazyLoad,
    value: config?.value ?? d.VALUE,
    label: config?.label ?? d.LABEL,
    children: config?.children ?? d.CHILDREN,
    disabled: config?.disabled ?? d.DISABLED,
    leaf: config?.leaf ?? d.LEAF
  }
}

export function buildNodes(options: CascaderOption[], config?: CascaderConfig): CascaderNode[] {
  const cfg = resolveConfig(config)
  let uid = 0
  const build = (items: CascaderOption[], parent: CascaderNode | null): CascaderNode[] =>
    items.map((data) => {
      const rawChildren = data[cfg.children]
      const children = Array.isArray(rawChildren) ? (rawChildren as CascaderOption[]) : []
      const leafFlag = data[cfg.leaf]
      const node: CascaderNode = {
        uid: ++uid,
        data,
        value: data[cfg.value] as CascaderValue,
        label: String(data[cfg.label] ?? ''),
        level: (parent?.level ?? 0) + 1,
        parent,
        children: [],
        disabled: Boolean(data[cfg.disabled]) || (!cfg.checkStrictly && Boolean(parent?.disabled)),
        leaf:
          typeof leafFlag === 'boolean'
            ? leafFlag
            : cfg.lazy
              ? Array.isArray(rawChildren) && children.length === 0
              : children.length === 0,
        loaded: !cfg.lazy || Array.isArray(rawChildren),
        loading: false,
        pathValues: [...(parent?.pathValues ?? []), data[cfg.value] as CascaderValue],
        pathLabels: [...(parent?.pathLabels ?? []), String(data[cfg.label] ?? '')]
      }
      node.children = build(children, node)
      return node
    })
  return build(options, null)
}

export function flattenNodes(nodes: CascaderNode[]): CascaderNode[] {
  return nodes.flatMap((node) => [node, ...flattenNodes(node.children)])
}

export function findByPath(nodes: CascaderNode[], path: CascaderValue[]): CascaderNode | undefined {
  let current = nodes
  let found: CascaderNode | undefined
  for (const value of path) {
    found = current.find((node) => node.value === value)
    if (!found) return undefined
    current = found.children
  }
  return found
}

export function resolveModel(nodes: CascaderNode[], model: CascaderModelValue | undefined, config?: CascaderConfig) {
  const cfg = resolveConfig(config)
  const flat = flattenNodes(nodes)
  const one = (item: unknown) =>
    cfg.emitPath
      ? Array.isArray(item)
        ? findByPath(nodes, item as CascaderValue[])
        : undefined
      : flat.find((node) => node.value === item)
  if (cfg.multiple) return (Array.isArray(model) ? model : []).map(one).filter((node): node is CascaderNode => !!node)
  const found = one(model)
  return found ? [found] : []
}

export function encodeNodes(nodes: CascaderNode[], config?: CascaderConfig): CascaderModelValue {
  const cfg = resolveConfig(config)
  const one = (node: CascaderNode) => (cfg.emitPath ? node.pathValues : node.value)
  if (cfg.multiple) return nodes.map(one) as CascaderModelValue
  return nodes[0] ? one(nodes[0]) : cfg.emitPath ? [] : ''
}
