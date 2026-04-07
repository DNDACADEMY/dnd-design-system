import { semantic } from '@dds/token'

import { Icon } from '../icon'
import { Txt } from '../txt'
import { Fieldbox } from './Fieldbox'

import type { FieldboxProps } from './Fieldbox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Fieldbox',
  component: Fieldbox,
  parameters: {
    controls: {
      exclude: ['ref', 'topAddon', 'bottomAddon', 'leftAddon', 'rightAddon', 'as']
    },
    layout: 'centered',
    docs: {
      description: {
        component:
          'Fieldbox 컴포넌트는 라벨, 입력 영역, 보조 텍스트를 하나의 필드 블록 형태로 묶어서 배치할 때 사용하는 내부 전용 레이아웃 컴포넌트예요.'
      }
    }
  },
  tags: ['autodocs'],
  subcomponents: {
    Content: Fieldbox.Content,
    Label: Fieldbox.Label,
    BottomTxt: Fieldbox.BottomTxt
  }
} satisfies Meta<typeof Fieldbox>

export default meta

type Story = StoryObj<typeof meta>

const CustomInput = ({ fieldboxProps, id, placeholder }: { fieldboxProps: FieldboxProps; id?: string; placeholder?: string }) => {
  const { size = 'medium', disabled, readonly } = fieldboxProps

  return (
    <Txt
      as='input'
      id={id}
      typography='body2'
      fontWeight='regular'
      readOnly={readonly}
      disabled={disabled}
      color={semantic.color.labelSubtitle}
      placeholder={placeholder ?? 'example@dnd.com'}
      style={{
        flex: 1,
        padding: 0,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        height: size === 'small' ? '17px' : '22px'
      }}
    />
  )
}

export const Playground: Story = {
  args: {
    size: 'medium',
    disabled: false,
    error: false,
    required: true,
    readonly: false
  },
  render: (args) => {
    const { size = 'medium', ...fieldboxProps } = args
    const inputId = 'fieldbox-email'

    const bottomText = fieldboxProps.error ? '이메일 형식이 올바르지 않아요.' : '로그인에 사용할 이메일 주소를 입력해 주세요.'

    return (
      <Fieldbox
        {...fieldboxProps}
        size={size}
        topAddon={<Fieldbox.Label id={inputId}>이메일 주소</Fieldbox.Label>}
        bottomAddon={<Fieldbox.BottomTxt>{bottomText}</Fieldbox.BottomTxt>}>
        <Fieldbox.Content
          leftAddon={
            <Icon
              name='mail'
              size={16}
              color={semantic.color.labelSubtitle}
            />
          }>
          <CustomInput
            fieldboxProps={{ ...fieldboxProps, size }}
            id={inputId}
            placeholder='example@dnd.com'
          />
        </Fieldbox.Content>
      </Fieldbox>
    )
  }
}

export const Sizes: Story = {
  name: 'Size variants',
  args: {
    required: true
  },
  render: (args) => {
    const inputIdBase = 'fieldbox-size'
    const sizes: FieldboxProps['size'][] = ['small', 'medium', 'large']

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
        {sizes.map((size) => {
          const id = `${inputIdBase}-${size}`
          return (
            <Fieldbox
              key={size}
              {...args}
              size={size}
              topAddon={<Fieldbox.Label id={id}>{`이메일 주소 (${size})`}</Fieldbox.Label>}>
              <Fieldbox.Content
                leftAddon={
                  <Icon
                    name='mail'
                    size={16}
                    color={semantic.color.labelSubtitle}
                  />
                }>
                <CustomInput
                  fieldboxProps={{ ...args, size }}
                  id={id}
                />
              </Fieldbox.Content>
            </Fieldbox>
          )
        })}
      </div>
    )
  }
}

export const ErrorState: Story = {
  args: {
    error: true,
    required: true,
    readonly: false
  },
  render: (fieldboxProps) => {
    const id = 'fieldbox-error'
    return (
      <Fieldbox
        {...fieldboxProps}
        topAddon={<Fieldbox.Label id={id}>이메일 주소</Fieldbox.Label>}
        bottomAddon={<Fieldbox.BottomTxt>이메일 형식이 올바르지 않아요.</Fieldbox.BottomTxt>}>
        <Fieldbox.Content
          leftAddon={
            <Icon
              name='mail'
              size={16}
              color={semantic.color.labelSubtitle}
            />
          }>
          <CustomInput
            fieldboxProps={fieldboxProps}
            id={id}
            placeholder='example@dnd.com'
          />
        </Fieldbox.Content>
      </Fieldbox>
    )
  }
}

export const DisabledState: Story = {
  args: {
    disabled: true,
    readonly: false
  },
  render: (fieldboxProps) => {
    const id = 'fieldbox-disabled'
    return (
      <Fieldbox
        {...fieldboxProps}
        topAddon={<Fieldbox.Label id={id}>이메일 주소</Fieldbox.Label>}
        bottomAddon={<Fieldbox.BottomTxt>현재 입력이 비활성화된 상태예요.</Fieldbox.BottomTxt>}>
        <Fieldbox.Content
          leftAddon={
            <Icon
              name='mail'
              size={16}
              color={semantic.color.labelSubtitle}
            />
          }>
          <CustomInput
            fieldboxProps={fieldboxProps}
            id={id}
            placeholder='example@dnd.com'
          />
        </Fieldbox.Content>
      </Fieldbox>
    )
  }
}
