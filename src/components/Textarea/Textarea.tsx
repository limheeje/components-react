import {forwardRef, useId, useState} from 'react'
import type {ChangeEvent, FocusEvent} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {TEXTAREA_DEFAULT, TEXTAREA_STATE_CLASS} from '~/components/Textarea/Textarea.constant'
import type {TextareaProps} from '~/components/Textarea/Textarea.type'
import styles from '~/components/Textarea/Textarea.module.scss'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    error = false,
    resize = TEXTAREA_DEFAULT.RESIZE,
    showCount = false,
    rows = TEXTAREA_DEFAULT.ROWS,
    helperText,
    classNames,
    disabled,
    readOnly,
    maxLength,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    id,
    ...rest
  },
  ref
) {
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultValue != null ? String(defaultValue) : '')
  const currentValue = isControlled ? String(value ?? '') : uncontrolled
  const [focused, setFocused] = useState(false)

  const reactId = useId()
  const areaId = id ?? reactId
  const errorMessage = typeof error === 'string' ? error : ''
  const hasError = error === true || errorMessage.length > 0
  const overLimit = maxLength != null && currentValue.length >= maxLength

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setUncontrolled(event.target.value)
    onChange?.(event)
  }
  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true)
    onFocus?.(event)
  }
  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false)
    onBlur?.(event)
  }

  const showMeta = hasError || helperText != null || (showCount && maxLength != null)

  return (
    <div className={cx(styles.bsTextarea, resolveClassNames(classNames))}>
      <div
        className={cx(
          styles.bsTextareaField,
          !resize && styles[TEXTAREA_STATE_CLASS.IS_NO_RESIZE],
          focused && styles[TEXTAREA_STATE_CLASS.IS_FOCUSED],
          hasError && styles[TEXTAREA_STATE_CLASS.IS_ERROR],
          disabled && styles[TEXTAREA_STATE_CLASS.IS_DISABLED],
          readOnly && styles[TEXTAREA_STATE_CLASS.IS_READONLY],
          showCount && maxLength != null && styles.hasCount
        )}
      >
        <textarea
          {...rest}
          ref={ref}
          id={areaId}
          className={styles.bsTextareaInp}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${areaId}-error` : helperText ? `${areaId}-helper` : undefined}
          {...(isControlled ? {value: currentValue} : {defaultValue})}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showCount && maxLength != null && (
          <span className={cx(styles.bsTextareaCount, overLimit && styles.bsTextareaCountMax)} aria-hidden="true">
            {currentValue.length} / {maxLength}
          </span>
        )}
      </div>

      {showMeta && (hasError || helperText != null) && (
        <div className={styles.bsTextareaMeta}>
          {hasError && errorMessage ? (
            <span id={`${areaId}-error`} className={styles.bsTextareaError}>
              {errorMessage}
            </span>
          ) : helperText != null ? (
            <span id={`${areaId}-helper`} className={styles.bsTextareaHelper}>
              {helperText}
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
})
