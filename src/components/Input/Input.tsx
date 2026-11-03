import {forwardRef, useCallback, useId, useImperativeHandle, useRef, useState} from 'react'
import type {ChangeEvent, FocusEvent, KeyboardEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {INPUT_DEFAULT, INPUT_STATE_CLASS, INPUT_TYPE} from '~/components/Input/Input.constant'
import type {InputProps, InputVariantProps} from '~/components/Input/Input.type'
import styles from '~/components/Input/Input.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

const InputBase = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = INPUT_DEFAULT.TYPE,
    size = INPUT_DEFAULT.SIZE,
    error = false,
    helperText,
    clearable = INPUT_DEFAULT.CLEARABLE,
    onClear,
    onSearch,
    showCount = false,
    prefix,
    suffix,
    showToggle = false,
    onToggle,
    classNames,
    disabled,
    readOnly,
    maxLength,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    id,
    ...rest
  },
  ref
) {
  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, [])

  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue != null ? String(defaultValue) : '')
  const currentValue = isControlled ? String(value ?? '') : uncontrolled

  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)

  const reactId = useId()
  const inputId = id ?? reactId
  const errorMessage = typeof error === 'string' ? error : ''
  const hasError = error === true || errorMessage.length > 0
  const describedById = hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined

  const isSearch = type === INPUT_TYPE.SEARCH
  const isPassword = type === INPUT_TYPE.PASSWORD
  const resolvedType = isSearch ? 'text' : isPassword && visible ? 'text' : type

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolled(event.target.value)
      onChange?.(event)
    },
    [isControlled, onChange]
  )

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur?.(event)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isSearch && onSearch != null && event.key === 'Enter') {
      onSearch(event.currentTarget.value)
    }
    onKeyDown?.(event)
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

  const handleToggle = () => {
    setVisible((prev) => {
      const next = !prev
      onToggle?.(next)
      return next
    })
  }

  const showClear = clearable && currentValue.length > 0 && !disabled && !readOnly
  const showToggleButton = isPassword && showToggle
  const searchAsButton = isSearch && onSearch != null

  return (
    <div className={cx(styles.bsInput, styles[`bsInputSize${cap(size)}`], resolveClassNames(classNames))}>
      <div
        className={cx(
          styles.bsInputField,
          focused && styles[INPUT_STATE_CLASS.IS_FOCUSED],
          hasError && styles[INPUT_STATE_CLASS.IS_ERROR],
          disabled && styles[INPUT_STATE_CLASS.IS_DISABLED],
          readOnly && styles[INPUT_STATE_CLASS.IS_READONLY]
        )}
      >
        {prefix != null && <span className={styles.bsInputAffix}>{prefix}</span>}

        <input
          {...rest}
          ref={innerRef}
          id={inputId}
          type={resolvedType}
          className={styles.bsInput}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
          aria-describedby={describedById}
          {...(isControlled ? {value: currentValue} : {defaultValue})}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />

        <span className={styles.bsInputSuffixArea}>
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              className={styles.bsInputIconButton}
              aria-label="입력 내용 지우기"
              onClick={handleClear}
            >
              <i className={cx(styles.bsInputIcon, styles.bsInputIconClear)} aria-hidden="true" />
            </button>
          )}
          {showToggleButton && (
            <button
              type="button"
              tabIndex={-1}
              className={cx(styles.bsInputIconButton, visible && styles.bsInputIconActive)}
              aria-label={visible ? '비밀번호 숨기기' : '비밀번호 표시'}
              aria-pressed={visible}
              onClick={handleToggle}
            >
              <i
                className={cx(styles.bsInputIcon, visible ? styles.bsInputIconEyeOff : styles.bsInputIconEye)}
                aria-hidden="true"
              />
            </button>
          )}
          {isSearch &&
            (searchAsButton ? (
              <button
                type="button"
                className={styles.bsInputIconButton}
                aria-label="검색"
                onClick={() => onSearch?.(currentValue)}
              >
                <i className={cx(styles.bsInputIcon, styles.bsInputIconSearch)} aria-hidden="true" />
              </button>
            ) : (
              <i
                className={cx(styles.bsInputIcon, styles.bsInputIconSearch, styles.bsInputIconStatic)}
                aria-hidden="true"
              />
            ))}
          {suffix != null && <span className={styles.bsInputAffix}>{suffix}</span>}
        </span>
      </div>

      {(hasError || helperText != null || (showCount && maxLength != null)) && (
        <div className={styles.bsInputMeta}>
          <span className={styles.bsInputMessage}>
            {hasError && errorMessage ? (
              <span id={`${inputId}-error`} className={styles.bsInputError}>
                {errorMessage}
              </span>
            ) : helperText != null ? (
              <span id={`${inputId}-helper`} className={styles.bsInputHelper}>
                {helperText}
              </span>
            ) : null}
          </span>
          {showCount && maxLength != null && (
            <span className={styles.bsInputCount}>
              {currentValue.length} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
})

/** `type` 고정 서브 컴포넌트 (원본 `CommonInput.Text` … 패턴) */
function makeVariant(fixedType: InputProps['type'], displayName: string) {
  const Variant = forwardRef<HTMLInputElement, InputVariantProps>(function Variant(props, ref) {
    return <InputBase {...props} type={fixedType} ref={ref} />
  })
  Variant.displayName = `Input.${displayName}`
  return Variant
}

export const Input = Object.assign(InputBase, {
  Text: makeVariant(INPUT_TYPE.TEXT, 'Text'),
  Password: makeVariant(INPUT_TYPE.PASSWORD, 'Password'),
  Number: makeVariant(INPUT_TYPE.NUMBER, 'Number'),
  Email: makeVariant(INPUT_TYPE.EMAIL, 'Email'),
  Tel: makeVariant(INPUT_TYPE.TEL, 'Tel'),
  Search: makeVariant(INPUT_TYPE.SEARCH, 'Search')
})
