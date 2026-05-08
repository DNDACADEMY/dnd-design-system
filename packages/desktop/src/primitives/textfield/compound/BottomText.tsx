import { Fieldbox, FieldboxBottomTextProps } from '../../fieldbox'
import { useTextfieldContext } from '../context'

export type TextfieldBottomTextProps = FieldboxBottomTextProps

export const TextfieldBottomText = (props: TextfieldBottomTextProps) => {
  const { children, ...restProps } = props
  const { id } = useTextfieldContext('Textfield.BottomText')

  return (
    <Fieldbox.BottomText
      id={`${id}-description`}
      {...restProps}>
      {children}
    </Fieldbox.BottomText>
  )
}

TextfieldBottomText.displayName = 'Textfield.BottomText'
