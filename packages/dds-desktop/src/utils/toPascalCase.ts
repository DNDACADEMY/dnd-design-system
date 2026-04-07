/**
 * 소문자 이름을 PascalCase로 변환
 * 예: 'arrow-right' -> 'ArrowRight', 'home' -> 'Home'
 */
export function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}
