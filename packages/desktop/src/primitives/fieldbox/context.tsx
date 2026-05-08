import { FieldBoxSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type FieldboxContextType = {
  size: FieldBoxSize
  required: boolean
  error: boolean
  disabled: boolean
  readOnly: boolean
}

const [FieldboxContextProvider, useFieldboxContext] = createCtxProvider<FieldboxContextType>('Fieldbox', {
  size: 'medium',
  required: false,
  error: false,
  disabled: false,
  readOnly: false
})

export { FieldboxContextProvider, useFieldboxContext }
