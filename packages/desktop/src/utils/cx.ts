export function cx(...args: (string | undefined | null | false)[]): string {
  let result = ''
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg) {
      result += (result && ' ') + arg
    }
  }
  return result
}
