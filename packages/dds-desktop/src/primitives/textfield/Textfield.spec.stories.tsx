import { expect, userEvent, within } from 'storybook/test'

import { Textfield } from './Textfield'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Textfield/Tests',
  component: Textfield,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Textfield>

export default meta
type Story = StoryObj<typeof meta>

// WCAG 1.3.1, 3.3.2 — label과 input이 htmlFor/id로 연결됨
export const LabelAssociationTest: Story = {
  render: () => (
    <Textfield
      id='email'
      data-testid='input'
      topAddon={<Textfield.Label id='email'>이메일 주소</Textfield.Label>}
      placeholder='이메일을 입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('input')
    const label = canvas.getByText('이메일 주소')

    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveAttribute('for', 'email')
    expect(input).toHaveAttribute('id', 'email')
  }
}

// WCAG 3.3.2 — 레이블 클릭 시 input으로 포커스 이동
export const LabelClickFocusTest: Story = {
  render: () => (
    <Textfield
      id='email-click'
      data-testid='input'
      topAddon={<Textfield.Label id='email-click'>이메일 주소</Textfield.Label>}
      placeholder='이메일을 입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('이메일 주소')

    await userEvent.click(label)

    expect(canvas.getByTestId('input')).toHaveFocus()
  }
}

// WCAG 2.1.1 — Tab 키로 포커스 이동
export const TabFocusTest: Story = {
  render: () => (
    <Textfield
      data-testid='input'
      placeholder='이메일을 입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.tab()

    expect(canvas.getByTestId('input')).toHaveFocus()
  }
}

// WCAG 2.1.1 — 키보드로 텍스트 입력
export const KeyboardInputTest: Story = {
  render: () => (
    <Textfield
      data-testid='input'
      placeholder='입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('input')

    await userEvent.click(input)
    await userEvent.type(input, 'test@example.com')

    expect(input).toHaveValue('test@example.com')
  }
}

// WCAG 1.3.5, 4.1.2 — required 속성 + 레이블의 * 표시
export const RequiredFieldTest: Story = {
  render: () => (
    <Textfield
      id='email-required'
      data-testid='input'
      required
      topAddon={<Textfield.Label id='email-required'>이메일 주소</Textfield.Label>}
      placeholder='이메일을 입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByTestId('input')).toHaveAttribute('required')
    expect(canvas.getByText('*')).toBeInTheDocument()
  }
}

// WCAG 3.3.1 — 에러 상태: aria-invalid + aria-describedby로 오류 메시지 연결
export const ErrorStateTest: Story = {
  render: () => (
    <Textfield
      id='email-error'
      data-testid='input'
      error
      aria-invalid='true'
      aria-describedby='email-error-msg'
      topAddon={<Textfield.Label id='email-error'>이메일 주소</Textfield.Label>}
      bottomAddon={<Textfield.BottomText id='email-error-msg'>이메일 형식이 올바르지 않아요.</Textfield.BottomText>}
      placeholder='이메일을 입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('input')

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'email-error-msg')
    expect(canvas.getByText('이메일 형식이 올바르지 않아요.')).toBeInTheDocument()
  }
}

// WCAG 4.1.2 — disabled: 포커스 불가
export const DisabledStateTest: Story = {
  render: () => (
    <Textfield
      data-testid='input'
      disabled
      placeholder='비활성 필드'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('input')

    expect(input).toBeDisabled()

    await userEvent.tab()
    expect(input).not.toHaveFocus()
  }
}

// WCAG 4.1.2 — readOnly: 포커스는 가능하나 값 변경 불가
export const ReadOnlyStateTest: Story = {
  render: () => (
    <Textfield
      data-testid='input'
      readOnly
      value='변경불가@example.com'
      placeholder='읽기 전용'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('input')

    await userEvent.tab()
    expect(input).toHaveFocus()

    await userEvent.type(input, '변경시도')
    expect(input).toHaveValue('변경불가@example.com')
  }
}

// WCAG 3.3.2 — aria-describedby로 보조 설명 텍스트 연결
export const BottomTextDescriptionTest: Story = {
  render: () => (
    <Textfield
      id='email-desc'
      data-testid='input'
      aria-describedby='email-help'
      topAddon={<Textfield.Label id='email-desc'>이메일 주소</Textfield.Label>}
      bottomAddon={<Textfield.BottomText id='email-help'>로그인에 사용할 이메일 주소를 입력해주세요.</Textfield.BottomText>}
      placeholder='이메일을 입력해주세요.'
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('input')

    expect(input).toHaveAttribute('aria-describedby', 'email-help')
    expect(canvas.getByText('로그인에 사용할 이메일 주소를 입력해주세요.')).toBeInTheDocument()
  }
}
