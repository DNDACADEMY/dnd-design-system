import { TextfieldSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type TextfieldContextType = {
  size: TextfieldSize
  id: string
}

const [TextfieldContextProvider, useTextfieldContext] = createCtxProvider<TextfieldContextType>('Textfield', {
  size: 'medium',
  id: ''
})

export { TextfieldContextProvider, useTextfieldContext }
