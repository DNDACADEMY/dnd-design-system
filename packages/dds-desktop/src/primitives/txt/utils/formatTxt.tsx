import { Fragment } from 'react'

export const withLineBreaks = (txt: string | undefined) => {
  if (!txt) return null
  return txt.split('/n').map((line, i) => {
    if (line === '/n') return <br key={i} />
    return <Fragment key={line}>{line}</Fragment>
  })
}
