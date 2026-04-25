import * as LucideIcons from 'lucide-react'

import type { LucideProps } from 'lucide-react'

type LucideIconName = keyof typeof LucideIcons

/**
 * PascalCase를 kebab-case로 변환
 * 예: 'ArrowRight' -> 'arrow-right', 'Home' -> 'home'
 */
type PascalToKebab<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? `${Lowercase<First>}${PascalToKebabRest<Rest>}`
    : `${First}${PascalToKebabRest<Rest>}`
  : S

type PascalToKebabRest<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? `-${Lowercase<First>}${PascalToKebabRest<Rest>}`
    : `${First}${PascalToKebabRest<Rest>}`
  : S

/**
 * lucide-react의 모든 아이콘 이름을 kebab-case로 변환한 타입
 */
export type IconName = PascalToKebab<
  Exclude<
    LucideIconName,
    | 'default'
    | 'createLucideIcon'
    | 'createElement'
    | 'Fragment'
    | 'StrictMode'
    | 'Suspense'
    | 'createContext'
    | 'forwardRef'
    | 'lazy'
    | 'memo'
    | 'useCallback'
    | 'useContext'
    | 'useDebugValue'
    | 'useEffect'
    | 'useImperativeHandle'
    | 'useLayoutEffect'
    | 'useMemo'
    | 'useReducer'
    | 'useRef'
    | 'useState'
  >
>

export interface NameIconProps extends Omit<LucideProps, 'ref'> {
  /**
   * 아이콘 이름을 설정해요
   *
   * @example
   * <Icon name="home" />
   * <Icon name="arrow-right" />
   * <Icon name="user-circle" />
   */
  name: IconName
  /**
   * 아이콘 크기를 설정해요.
   *
   * @default 24
   */
  size?: number | string
  /**
   * 이미지 대체 텍스트를 설정해요.
   */
  alt?: string
}

export interface UrlIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 커스텀 아이콘 URL을 설정해요.
   *
   * @example
   * <Icon url="https://example.com/logo.svg" size={32} alt="Logo" />
   */
  url: string
  /**
   * 아이콘 크기를 설정해요.
   *
   * @default 24
   */
  size?: number | string
  /**
   * 이미지 대체 텍스트를 설정해요.
   */
  alt?: string
}

export type IconProps = NameIconProps | UrlIconProps
