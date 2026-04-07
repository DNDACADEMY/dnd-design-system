import { ButtonVariant } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type ButtonContextType = {
  variant: ButtonVariant
  disabled: boolean
}

const [ButtonContextProvider, useButtonContext] = createCtxProvider<ButtonContextType>('Button', {
  variant: 'primary',
  disabled: false
})

export { ButtonContextProvider, useButtonContext }
