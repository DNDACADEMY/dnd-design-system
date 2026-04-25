import { TextareaSize } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type TextareaContextType = {
  size: TextareaSize
}

const [TextareaContextProvider, useTextareaContext] = createCtxProvider<TextareaContextType>('Textarea', {
  size: 'medium'
})

export { TextareaContextProvider, useTextareaContext }
