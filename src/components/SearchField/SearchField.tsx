import {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import type {ChangeEvent, FocusEvent, KeyboardEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {Icon} from '~/components/Icon/Icon'
import {SEARCH_FIELD_DEFAULT, SEARCH_FIELD_STATE_CLASS} from '~/components/SearchField/SearchField.constant'
import type {SearchFieldProps} from '~/components/SearchField/SearchField.type'
import styles from '~/components/SearchField/SearchField.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  {
    size = SEARCH_FIELD_DEFAULT.SIZE,
    onSearch,
    clearable = SEARCH_FIELD_DEFAULT.CLEARABLE,
    onClear,
    loading = false,
    placeholder = SEARCH_FIELD_DEFAULT.PLACEHOLDER,
    classNames,
    disabled,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    ...rest
  },
  ref
) {
  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, [])

  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue != null ? String(defaultValue) : '')
  const current = isControlled ? String(value ?? '') : uncontrolled
  const [focused, setFocused] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolled(e.target.value)
    onChange?.(e)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch?.(e.currentTarget.value)
    onKeyDown?.(e)
  }
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(e)
  }
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur?.(e)
  }
  const handleClear = () => {
    if (!isControlled) setUncontrolled('')
    const el = innerRef.current
    if (el) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
      setter?.call(el, '')
      el.dispatchEvent(new Event('input', {bubbles: true}))
      el.focus()
    }
    onClear?.()
  }

  const showClear = clearable && current.length > 0 && !disabled

  return (
    <div
      className={cx(
        styles.bsSearchField,
        styles[`bsSearchFieldSize${cap(size)}`],
        focused && styles[SEARCH_FIELD_STATE_CLASS.IS_FOCUSED],
        disabled && styles[SEARCH_FIELD_STATE_CLASS.IS_DISABLED],
        loading && styles[SEARCH_FIELD_STATE_CLASS.IS_LOADING],
        resolveClassNames(classNames)
      )}
    >
      <button
        type="button"
        className={styles.bsSearchFieldSearchButton}
        aria-label="검색"
        disabled={disabled || loading}
        onClick={() => onSearch?.(current)}
      >
        {loading ? (
          <Icon name="upload" size="1em" spin classNames={styles.bsSearchFieldIcon} />
        ) : (
          <Icon name="search" size="1em" classNames={styles.bsSearchFieldIcon} />
        )}
      </button>

      <input
        {...rest}
        ref={innerRef}
        type="search"
        className={styles.bsSearchFieldInput}
        disabled={disabled}
        placeholder={placeholder}
        {...(isControlled ? {value: current} : {defaultValue})}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          className={styles.bsSearchFieldClearButton}
          aria-label="입력 내용 지우기"
          onClick={handleClear}
        >
          <Icon name="cancel" size="1em" classNames={styles.bsSearchFieldIcon} />
        </button>
      )}
    </div>
  )
})
