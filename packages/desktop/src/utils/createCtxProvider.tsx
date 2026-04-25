import { useContext, createContext, type ReactNode } from 'react'

type ProviderProps<T> = T & { children: ReactNode }

export function createCtxProvider<T extends Record<string, unknown>>(componentName: string, defaultValue?: T) {
  const Context = createContext<T | undefined>(defaultValue)

  function Provider(props: ProviderProps<T>) {
    const { children, ...value } = props

    return <Context.Provider value={value as unknown as T}>{children}</Context.Provider>
  }

  Provider.displayName = componentName + 'Provider'

  function useCtx(displayName: string) {
    const value = useContext(Context)
    if (value === undefined) {
      throw new Error(`${displayName} Context must be used within its ${componentName} provider`)
    }
    return value
  }

  return [Provider, useCtx] as const
}
