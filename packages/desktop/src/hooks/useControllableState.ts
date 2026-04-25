import { ChangeEventHandler, useCallback, useState } from 'react'

interface UseControlStableParams<T, E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> {
  value?: T
  defaultValue?: T
  onChange?: ChangeEventHandler<E>
}

export function useControllableState<T, E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(params: UseControlStableParams<T, E>) {
  const { value, defaultValue, onChange } = params

  const isControlled = value != null
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const currentValue = isControlled ? value! : uncontrolledValue

  const handleChange: ChangeEventHandler<E> = useCallback(
    (event) => {
      const nextValue = event.target.value

      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }

      onChange?.(event)
    },
    [isControlled, onChange]
  )

  return { value: currentValue, onChange: handleChange }
}
