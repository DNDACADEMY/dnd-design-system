import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button'
import { Textfield } from '../textfield'
import { Popover } from './Popover'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Popover/Tests',
  component: Popover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

const contentStyle = {
  padding: '16px',
  background: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  minWidth: '200px'
}

export const ClickTriggerTest: Story = {
  render: () => {
    const handleOpenChange = fn()

    return (
      <Popover onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <Button data-testid='popover-trigger'>팝오버 열기</Button>
        </Popover.Trigger>
        <Popover.Content
          data-testid='popover-content'
          style={contentStyle}>
          팝오버 내용입니다
        </Popover.Content>
      </Popover>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    const trigger = canvas.getByTestId('popover-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      const content = body.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    await userEvent.click(trigger)
  }
}

export const EscapeKeyTest: Story = {
  render: () => {
    const handleOpenChange = fn()

    return (
      <Popover onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <Button data-testid='popover-trigger'>팝오버 열기</Button>
        </Popover.Trigger>
        <Popover.Content
          data-testid='popover-content'
          style={contentStyle}>
          팝오버 내용입니다
        </Popover.Content>
      </Popover>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    const trigger = canvas.getByTestId('popover-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      const content = body.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    await userEvent.keyboard('{Escape}')
  }
}

export const FocusableContentTest: Story = {
  render: () => {
    const handleOpenChange = fn()

    return (
      <Popover onOpenChange={handleOpenChange}>
        <Popover.Trigger asChild>
          <Button data-testid='popover-trigger'>포커스 가능한 콘텐츠</Button>
        </Popover.Trigger>
        <Popover.Content
          data-testid='popover-content'
          style={contentStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>사용자 정보 입력</h3>
            <Textfield
              data-testid='name-input'
              placeholder='이름을 입력하세요'
            />
            <Textfield
              data-testid='email-input'
              placeholder='이메일을 입력하세요'
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button
                variant='outline'
                data-testid='cancel-button'>
                취소
              </Button>
              <Button
                variant='primary'
                data-testid='confirm-button'>
                확인
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    )
  },
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    const canvas = within(canvasElement)

    const trigger = canvas.getByTestId('popover-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      const content = body.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    const nameInput = body.getByPlaceholderText('이름을 입력하세요')
    const emailInput = body.getByPlaceholderText('이메일을 입력하세요')

    await userEvent.type(nameInput, '홍길동')
    await expect(nameInput).toHaveValue('홍길동')

    await userEvent.type(emailInput, 'test@example.com')
    await expect(emailInput).toHaveAttribute('value', 'test@example.com')

    const cancelButton = body.getByTestId('cancel-button')
    await expect(cancelButton).toBeInTheDocument()
  }
}

export const OutsideClickTest: Story = {
  render: () => {
    const handleOpenChange = fn()

    return (
      <div>
        <Popover onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild>
            <Button data-testid='popover-trigger'>팝오버 열기</Button>
          </Popover.Trigger>
          <Popover.Content
            data-testid='popover-content'
            style={contentStyle}>
            팝오버 내용입니다
          </Popover.Content>
        </Popover>
        <div
          data-testid='outside-element'
          style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
          외부 영역
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    const trigger = canvas.getByTestId('popover-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      const content = body.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    const outsideElement = canvas.getByTestId('outside-element')
    await userEvent.click(outsideElement)
  }
}

export const AnchorPositioningTest: Story = {
  render: () => {
    const handleOpenChange = fn()

    return (
      <div style={{ padding: '100px' }}>
        <Popover onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild>
            <Button data-testid='popover-trigger'>버튼 클릭</Button>
          </Popover.Trigger>
          <Popover.Anchor
            data-testid='popover-anchor'
            style={{
              marginTop: '16px',
              padding: '20px',
              border: '2px dashed #999',
              borderRadius: '8px',
              background: '#f9f9f9'
            }}>
            앵커 위치
          </Popover.Anchor>
          <Popover.Content
            data-testid='popover-content'
            style={contentStyle}>
            앵커를 사용한 팝오버
          </Popover.Content>
        </Popover>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)

    const trigger = canvas.getByTestId('popover-trigger')
    await userEvent.click(trigger)

    await waitFor(() => {
      const content = body.getByTestId('popover-content')
      expect(content).toBeInTheDocument()
    })

    const anchor = canvas.getByTestId('popover-anchor')
    await expect(anchor).toBeInTheDocument()
  }
}
