import { Fieldbox, FieldboxLabelProps } from '../../fieldbox'
import { useTextfieldContext } from '../context'

export type TextfieldLabelProps = FieldboxLabelProps

export const TextfieldLabel = (props: TextfieldLabelProps) => {
  const { id: idFromProps, ...restProps } = props
  const { id: idFromCtx } = useTextfieldContext('Textfield.Label')
  const id = idFromProps ?? idFromCtx

  return (
    <Fieldbox.Label
      id={id}
      {...restProps}
    />
  )
}

TextfieldLabel.displayName = 'Textfield.Label'
