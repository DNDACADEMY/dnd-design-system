import { useId as useIdHook } from 'react'

export const useId = (id?: string) => {
  const generatedId = useIdHook()
  return id ?? generatedId
}
