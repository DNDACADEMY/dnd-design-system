import { Button } from './Button'

import type { ButtonProps } from './Button'
import type { ButtonSize, ButtonVariant } from './type'
import type { Meta, StoryObj } from '@storybook/react-vite'

const SIZE_OPTIONS: ButtonSize[] = ['small', 'medium', 'large', 'xlarge']
const VARIANT_OPTIONS: ButtonVariant[] = ['primary', 'secondary', 'assistive', 'outline']

type StoryArgs = ButtonProps & {
  showLeftIcon?: boolean
  showRightIcon?: boolean
}

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: SIZE_OPTIONS
    },
    variant: {
      control: 'select',
      options: VARIANT_OPTIONS
    },
    children: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    showLeftIcon: {
      control: 'boolean',
      description: '왼쪽 아이콘 표시'
    },
    showRightIcon: {
      control: 'boolean',
      description: '오른쪽 아이콘 표시'
    },
    leftAddon: {
      table: { disable: true }
    },
    rightAddon: {
      table: { disable: true }
    }
  },
  subcomponents: {
    Icon: Button.Icon
  }
} satisfies Meta<StoryArgs>

export default meta
type Story = StoryObj<StoryArgs>

export const Default: Story = {
  args: {
    children: '버튼',
    size: 'medium',
    variant: 'primary',
    disabled: false,
    showLeftIcon: false,
    showRightIcon: false
  },
  render: ({ showLeftIcon, showRightIcon, ...buttonProps }) => {
    return (
      <Button
        {...buttonProps}
        leftAddon={
          showLeftIcon ? (
            <Button.Icon
              name='plus'
              size={16}
            />
          ) : undefined
        }
        rightAddon={
          showRightIcon ? (
            <Button.Icon
              name='arrow-right'
              size={16}
            />
          ) : undefined
        }
      />
    )
  }
}

export const AllVariants: Story = {
  render: (_) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='assistive'>Assistive</Button>
      <Button variant='outline'>Outline</Button>
    </div>
  )
}

export const AllSizes: Story = {
  render: (_) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size='small'>Small</Button>
      <Button size='medium'>Medium</Button>
      <Button size='large'>Large</Button>
      <Button size='xlarge'>XLarge</Button>
    </div>
  )
}
