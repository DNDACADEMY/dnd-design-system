import { Fieldbox, FieldboxBottomTxtProps } from '../../fieldbox'
import { useTextfieldContext } from '../context'

export type TextfieldBottomTextProps = FieldboxBottomTxtProps

export const TextfieldBottomText = (props: TextfieldBottomTextProps) => {
  const { children, ...restProps } = props
  const { id } = useTextfieldContext('Textfield.BottomText')

  return (
    <Fieldbox.BottomTxt
      id={`${id}-description`}
      {...restProps}>
      {children}
    </Fieldbox.BottomTxt>
  )
}

TextfieldBottomText.displayName = 'Textfield.BottomText'
