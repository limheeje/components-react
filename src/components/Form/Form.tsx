import {forwardRef, useContext} from 'react'

import {cx, resolveClassNames} from '~/lib/cx'

import {FORM_DEFAULT, FORM_STATE_CLASS} from '~/components/Form/Form.constant'
import {FormContext} from '~/components/Form/Form.context'
import type {FormActionsProps, FormFieldProps, FormProps} from '~/components/Form/Form.type'
import styles from '~/components/Form/Form.module.scss'

const cap = (s: string) => s.replace(/(^|-)([a-z])/g, (_m, _p, c: string) => c.toUpperCase())

const px = (v: number | string) => (typeof v === 'number' ? `${v}px` : v)

const FormRoot = forwardRef<HTMLFormElement, FormProps>(function Form(
  {
    layout = FORM_DEFAULT.LAYOUT,
    labelWidth = FORM_DEFAULT.LABEL_WIDTH,
    disabled = false,
    classNames,
    children,
    ...rest
  },
  ref
) {
  return (
    <FormContext.Provider value={{layout, labelWidth, disabled}}>
      <form
        {...rest}
        ref={ref}
        className={cx(
          styles.bsForm,
          styles[`bsFormLayout${cap(layout)}`],
          disabled && styles[FORM_STATE_CLASS.IS_DISABLED],
          resolveClassNames(classNames)
        )}
      >
        <fieldset className={styles.bsFormFieldset} disabled={disabled}>
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  )
})

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {label, name, required = false, error, help, htmlFor, layout, classNames, children},
  ref
) {
  const ctx = useContext(FormContext)
  const effectiveLayout = layout ?? ctx.layout
  const hasError = typeof error === 'string' && error.length > 0

  return (
    <div
      ref={ref}
      className={cx(
        styles.bsFormField,
        styles[`bsFormField${cap(effectiveLayout)}`],
        required && styles[FORM_STATE_CLASS.IS_REQUIRED],
        hasError && styles[FORM_STATE_CLASS.IS_ERROR],
        resolveClassNames(classNames)
      )}
      data-field={name}
    >
      {label != null && (
        <label
          className={styles.bsFormLabel}
          htmlFor={htmlFor}
          style={effectiveLayout === 'horizontal' ? {width: px(ctx.labelWidth)} : undefined}
        >
          {label}
          {required && <span className={styles.bsFormRequired}>*</span>}
        </label>
      )}
      <div className={styles.bsFormControl}>
        {children}
        {hasError ? (
          <span className={styles.bsFormError} role="alert">
            {error}
          </span>
        ) : help != null ? (
          <span className={styles.bsFormHelp}>{help}</span>
        ) : null}
      </div>
    </div>
  )
})

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(function FormActions(
  {align = FORM_DEFAULT.ACTIONS_ALIGN, classNames, children},
  ref
) {
  return (
    <div
      ref={ref}
      className={cx(styles.bsFormActions, styles[`bsFormAlign${cap(align)}`], resolveClassNames(classNames))}
    >
      {children}
    </div>
  )
})

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Actions: FormActions
})
