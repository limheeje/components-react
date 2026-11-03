import {forwardRef, useEffect, useId, useMemo, useRef, useState} from 'react'
import type {KeyboardEvent, MouseEvent as ReactMouseEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {SELECT_DEFAULT, SELECT_STATE_CLASS} from '~/components/Select/Select.constant'
import type {SelectOption, SelectProps} from '~/components/Select/Select.type'
import styles from '~/components/Select/Select.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(props, ref) {
  const {
    options,
    placeholder = '선택해주세요',
    size = SELECT_DEFAULT.SIZE,
    searchable = false,
    disabled = false,
    error = false,
    helperText,
    name,
    id,
    classNames
  } = props
  const multiple = props.multiple === true

  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const isControlled = props.value !== undefined
  const initial = useMemo<string[]>(() => {
    const dv = props.defaultValue
    if (Array.isArray(dv)) return dv
    if (typeof dv === 'string' && dv !== '') return [dv]
    return []
  }, [props.defaultValue])
  const [uncontrolled, setUncontrolled] = useState<string[]>(initial)

  const current = useMemo<string[]>(() => {
    if (!isControlled) return uncontrolled
    const v = props.value
    if (Array.isArray(v)) return v
    if (typeof v === 'string' && v !== '') return [v]
    return []
  }, [isControlled, uncontrolled, props.value])

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)

  const reactId = useId()
  const triggerId = id ?? reactId
  const listId = `${reactId}-list`

  const errorMessage = typeof error === 'string' ? error : ''
  const hasError = error === true || errorMessage.length > 0

  const selectedOptions = useMemo(
    () => current.map((v) => options.find((o) => o.value === v)).filter((o): o is SelectOption => o != null),
    [options, current]
  )
  const hasSelection = selectedOptions.length > 0

  const filtered = useMemo(
    () => (searchable && query ? options.filter((o) => o.label.includes(query)) : options),
    [options, searchable, query]
  )

  useEffect(() => {
    if (!open) return
    const onDocDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open])

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus()
  }, [open, searchable])

  const emit = (next: string[]) => {
    if (!isControlled) setUncontrolled(next)
    if (multiple) (props.onChange as ((v: string[]) => void) | undefined)?.(next)
    else (props.onChange as ((v: string) => void) | undefined)?.(next[0] ?? '')
  }

  const commit = (option: SelectOption) => {
    if (option.disabled) return
    if (multiple) {
      const next = current.includes(option.value)
        ? current.filter((v) => v !== option.value)
        : [...current, option.value]
      emit(next)
      return
    }
    emit([option.value])
    setOpen(false)
    setQuery('')
  }

  const removeValue = (value: string, e: ReactMouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    emit(current.filter((v) => v !== value))
  }

  const toggleOpen = () => {
    if (disabled) return
    setOpen((v) => !v)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      return
    }
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const dir = e.key === 'ArrowDown' ? 1 : -1
      const enabled = filtered.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0)
      if (enabled.length === 0) return
      const pos = enabled.indexOf(activeIndex)
      const next = enabled[(pos + dir + enabled.length) % enabled.length] ?? enabled[0]
      setActiveIndex(next)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const opt = filtered[activeIndex]
      if (opt) commit(opt)
    }
  }

  return (
    <div
      ref={(node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cx(styles.bsSelect, styles[`bsSelectSize${cap(size)}`], resolveClassNames(classNames))}
    >
      <div
        id={triggerId}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-disabled={disabled || undefined}
        aria-invalid={hasError || undefined}
        aria-multiselectable={multiple || undefined}
        className={cx(
          styles.bsSelectTrigger,
          multiple && styles.isMultiple,
          open && styles[SELECT_STATE_CLASS.IS_OPEN],
          hasError && styles[SELECT_STATE_CLASS.IS_ERROR],
          disabled && styles[SELECT_STATE_CLASS.IS_DISABLED],
          !hasSelection && styles[SELECT_STATE_CLASS.IS_PLACEHOLDER]
        )}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
      >
        {multiple && hasSelection ? (
          <span className={styles.bsSelectTags}>
            {selectedOptions.map((option) => (
              <span key={option.value} className={styles.bsSelectTag}>
                <span className={styles.bsSelectTagLabel}>{option.label}</span>
                <button
                  type="button"
                  className={styles.bsSelectTagRemove}
                  aria-label={`${option.label} 제거`}
                  onClick={(e) => removeValue(option.value, e)}
                >
                  <i className={styles.bsSelectTagRemoveIcon} aria-hidden="true" />
                </button>
              </span>
            ))}
          </span>
        ) : (
          <span className={styles.bsSelectTriggerLabel}>
            {hasSelection ? selectedOptions.map((o) => o.label).join(', ') : placeholder}
          </span>
        )}
        <i className={styles.bsSelectChevron} aria-hidden="true" />
      </div>

      {name != null &&
        (multiple ? (
          current.map((v) => <input key={v} type="hidden" name={name} value={v} />)
        ) : (
          <input type="hidden" name={name} value={current[0] ?? ''} />
        ))}

      {open && (
        <div className={styles.bsSelectDropdown} role="listbox" id={listId}>
          {searchable && (
            <div className={styles.bsSelectSearch}>
              <i className={styles.bsSelectSearchIcon} aria-hidden="true" />
              <input
                ref={searchRef}
                className={styles.bsSelectSearchInput}
                value={query}
                placeholder={SELECT_DEFAULT.SEARCH_PLACEHOLDER}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(-1)
                }}
              />
            </div>
          )}

          {filtered.length === 0 ? (
            <div className={styles.bsSelectEmpty}>{SELECT_DEFAULT.EMPTY_TEXT}</div>
          ) : (
            <ul className={cx(styles.bsSelectList, multiple && styles.bsSelectListMultiple)}>
              {filtered.map((option, index) => {
                const isSelected = current.includes(option.value)
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    className={cx(
                      styles.bsSelectOption,
                      isSelected && styles.bsSelectOptionSelected,
                      option.disabled && styles.bsSelectOptionDisabled,
                      index === activeIndex && styles.bsSelectOptionActive
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(option)}
                  >
                    {multiple && (
                      <span
                        className={cx(
                          styles.bsSelectOptionCheckbox,
                          isSelected && styles.bsSelectOptionCheckboxChecked
                        )}
                        aria-hidden="true"
                      >
                        <svg className={styles.bsSelectOptionCheckboxMark} viewBox="0 0 12 12" fill="none">
                          <polyline
                            points="2,6 5,9 10,3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                    <span className={styles.bsSelectOptionLabel}>{option.label}</span>
                    {!multiple && isSelected && <i className={styles.bsSelectCheck} aria-hidden="true" />}
                    {option.disabled && <span className={styles.bsSelectDisabledTag}>비활성</span>}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {(hasError || helperText != null) && (
        <div className={styles.bsSelectMeta}>
          {hasError && errorMessage ? (
            <span id={`${triggerId}-error`} className={styles.bsSelectError}>
              {errorMessage}
            </span>
          ) : helperText != null ? (
            <span id={`${triggerId}-helper`} className={styles.bsSelectHelper}>
              {helperText}
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
})
