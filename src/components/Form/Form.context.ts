import {createContext} from 'react'

import {FORM_DEFAULT} from '~/components/Form/Form.constant'
import type {FormContextValue} from '~/components/Form/Form.type'

export const FormContext = createContext<FormContextValue>({
  layout: FORM_DEFAULT.LAYOUT,
  labelWidth: FORM_DEFAULT.LABEL_WIDTH,
  disabled: false
})
