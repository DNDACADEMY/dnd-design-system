import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Chip } from './Chip'

import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * Chip은 기본적으로 <div>/<span> 기반의 non-interactive 컴포넌트다.
 * 키보드 접근성이 필요한 경우 소비자가 role="button" + tabIndex={0} + onKeyDown을 직접 제공해야 한다.
 * (WCAG 2.1.1 Keyboard)
 */

const meta = {
  title: 'Primitives/Chip/Tests',
  component: Chip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

// WCAG 1.3.1 — 텍스트 콘텐츠가 스크린 리더에 전달됨
export const TextContentAccessibilityTest: Story = {
  render: () => (
    <Chip
      data-testid='chip'
      status='default'>
      디자인
    </Chip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByTestId('chip')).toHaveTextContent('디자인')
  }
}

// WCAG 4.1.2 — aria-label 전달
export const AriaLabelTest: Story = {
  render: () => (
    <Chip
      data-testid='chip'
      status='default'
      aria-label='필터: 디자인'>
      디자인
    </Chip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByTestId('chip')).toHaveAttribute('aria-label', '필터: 디자인')
  }
}

// WCAG 4.1.2 — listbox 패턴: aria-selected로 선택 상태 전달
export const ListboxPatternTest: Story = {
  render: () => (
    <div
      role='listbox'
      aria-label='카테고리 필터'>
      <Chip
        data-testid='chip-default'
        status='default'
        role='option'
        aria-selected={false}>
        개발
      </Chip>
      <Chip
        data-testid='chip-selected'
        status='selected'
        role='option'
        aria-selected={true}>
        디자인
      </Chip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByTestId('chip-default')).toHaveAttribute('aria-selected', 'false')
    expect(canvas.getByTestId('chip-selected')).toHaveAttribute('aria-selected', 'true')
  }
}

// WCAG 2.1.1 — tabIndex={0}으로 포커스 가능하게 만든 경우 Tab 이동
export const TabFocusTest: Story = {
  render: () => (
    <Chip
      data-testid='chip'
      status='default'
      role='button'
      tabIndex={0}>
      포커스 가능한 칩
    </Chip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.tab()

    expect(canvas.getByTestId('chip')).toHaveFocus()
  }
}

// WCAG 4.1.2 — toggle 패턴: aria-pressed로 선택 상태 전달
const ToggleChipFixture = () => {
  const [pressed, setPressed] = useState(false)
  return (
    <Chip
      data-testid='chip'
      status={pressed ? 'selected' : 'default'}
      role='button'
      tabIndex={0}
      aria-pressed={pressed}
      onClick={() => setPressed((p) => !p)}>
      {pressed ? '선택됨' : '선택 안됨'}
    </Chip>
  )
}

export const AriaPressedToggleTest: Story = {
  render: () => <ToggleChipFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chip = canvas.getByTestId('chip')

    expect(chip).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(chip)

    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(chip).toHaveTextContent('선택됨')
  }
}

// WCAG 2.1.1 — onKeyDown 제공 시 Enter 키로 활성화
const KeyboardChipFixture = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Chip
        data-testid='chip'
        status='default'
        role='button'
        tabIndex={0}
        onClick={() => setCount((p) => p + 1)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Space' || e.key === ' ') {
            e.preventDefault()
            setCount((p) => p + 1)
          }
        }}>
        클릭 가능한 칩
      </Chip>
      <span data-testid='count'>{count}</span>
    </div>
  )
}

export const EnterKeyActivationTest: Story = {
  render: () => <KeyboardChipFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chip = canvas.getByTestId('chip')

    await userEvent.tab()
    expect(chip).toHaveFocus()

    await userEvent.keyboard('{Enter}')

    expect(canvas.getByTestId('count')).toHaveTextContent('1')
  }
}

export const SpaceKeyActivationTest: Story = {
  render: () => <KeyboardChipFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const chip = canvas.getByTestId('chip')

    await userEvent.tab()
    expect(chip).toHaveFocus()

    await userEvent.keyboard('{Space}')

    expect(canvas.getByTestId('count')).toHaveTextContent('1')
  }
}

// WCAG 4.1.2 — 장식 아이콘은 aria-hidden, 제거 버튼은 aria-label 필요
export const IconAccessibilityTest: Story = {
  render: () => (
    <Chip
      data-testid='chip'
      status='default'
      leftAddon={
        <Chip.Icon
          name='star'
          size={16}
          aria-hidden={true}
        />
      }
      rightAddon={
        <Chip.Icon
          data-testid='remove-btn'
          name='x'
          size={16}
          aria-label='칩 제거'
          role='button'
          tabIndex={0}
        />
      }>
      즐겨찾기
    </Chip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByTestId('chip')).toHaveTextContent('즐겨찾기')
    expect(canvas.getByTestId('remove-btn')).toHaveAttribute('aria-label', '칩 제거')
    expect(canvas.getByTestId('remove-btn')).toHaveAttribute('role', 'button')
  }
}
