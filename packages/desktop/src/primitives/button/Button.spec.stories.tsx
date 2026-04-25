import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from './Button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Button/Tests',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// WCAG 2.4.3 Focus Order
export const TabFocusTest: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button data-testid='button-first'>첫 번째 버튼</Button>
      <Button data-testid='button-second'>두 번째 버튼</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const first = canvas.getByTestId('button-first')
    const second = canvas.getByTestId('button-second')

    first.focus()
    await userEvent.tab()

    expect(second).toHaveFocus()
  }
}

// WCAG 2.1.1 Keyboard — Enter 활성화
const ClickFixture = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button
        data-testid='button'
        onClick={() => setCount((p) => p + 1)}>
        클릭
      </Button>
      <span data-testid='count'>{count}</span>
    </div>
  )
}

export const EnterKeyActivationTest: Story = {
  render: () => <ClickFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByTestId('button')

    button.focus()
    await userEvent.keyboard('{Enter}')

    expect(canvas.getByTestId('count')).toHaveTextContent('1')
  }
}

// WCAG 2.1.1 Keyboard — Space 활성화
export const SpaceKeyActivationTest: Story = {
  render: () => <ClickFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByTestId('button')

    button.focus()
    await userEvent.keyboard('{ }')

    expect(canvas.getByTestId('count')).toHaveTextContent('1')
  }
}

// WCAG 2.4.3 Focus Order — disabled는 Tab 순서에서 제외
export const DisabledSkipsTabOrderTest: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button data-testid='before'>이전</Button>
      <Button
        data-testid='disabled'
        disabled>
        비활성
      </Button>
      <Button data-testid='after'>이후</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    canvas.getByTestId('before').focus()
    await userEvent.tab()

    expect(canvas.getByTestId('disabled')).not.toHaveFocus()
    expect(canvas.getByTestId('after')).toHaveFocus()
  }
}

// WCAG 4.1.2 Name, Role, Value — disabled 속성
export const DisabledAttributeTest: Story = {
  render: () => (
    <Button
      data-testid='button'
      disabled
      onClick={fn()}>
      비활성
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByTestId('button')

    expect(button).toBeDisabled()

    await userEvent.click(button)
    await userEvent.keyboard('{Enter}')
  }
}

// WCAG 1.3.1 Info and Relationships — 접근 가능한 이름
export const AccessibleNameTest: Story = {
  render: () => <Button>저장하기</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: '저장하기' })

    expect(button).toBeInTheDocument()
  }
}

// WCAG 4.1.2 Name, Role, Value — 아이콘 전용 버튼 aria-label
export const IconOnlyAriaLabelTest: Story = {
  render: () => (
    <Button
      aria-label='항목 추가'
      leftAddon={
        <Button.Icon
          name='plus'
          size={16}
        />
      }
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: '항목 추가' })

    expect(button).toBeInTheDocument()
  }
}
