import { ChipStatus } from './type'
import { createCtxProvider } from '../../utils/createCtxProvider'

type ChipContextType = {
  status: ChipStatus
}

const [ChipContextProvider, useChipContext] = createCtxProvider<ChipContextType>('Chip', {
  status: 'default'
})

export { ChipContextProvider, useChipContext }
