import '~/assets/styles/tokens.css'

import {Dialog, DialogProvider} from '~/components/Dialog/Dialog'

export {Dialog, DialogProvider}
export default Dialog
export {openDialog, confirmDialog, alertDialog, closeDialog, closeAllDialogs} from '~/components/Dialog/Dialog.store'
export {
  DIALOG_SIZE,
  DIALOG_TONE,
  DIALOG_KIND,
  DIALOG_VARIANT,
  DIALOG_DIRECTION,
  DIALOG_DEFAULT
} from '~/components/Dialog/Dialog.constant'
export type {
  DialogProps,
  DialogProviderProps,
  DialogModalOptions,
  DialogConfirmOptions,
  DialogAlertOptions,
  DialogInstance,
  DialogSize,
  DialogTone,
  DialogKind,
  DialogVariant,
  DialogDirection
} from '~/components/Dialog/Dialog.type'
