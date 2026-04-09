import { Fragment } from 'react'

export const withLineBreaks = (txt: string | undefined) => {
  if (!txt) return null
  return txt.split(/\\n|\n/).map((line, i, arr) => (
    <Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </Fragment>
  ))
}
