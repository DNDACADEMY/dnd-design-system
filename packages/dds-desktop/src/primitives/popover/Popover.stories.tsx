import { useState } from 'react'

import { Button } from '../button'
import { Textfield } from '../textfield'
import { Popover } from './Popover'

import type { PopoverProps } from './Popover'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Popover',
  component: Popover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '팝오버의 열림/닫힘 상태'
    },
    defaultOpen: {
      control: 'boolean',
      description: '팝오버의 초기 열림 상태'
    },
    children: {
      table: { disable: true }
    }
  },
  subcomponents: {
    Anchor: Popover.Anchor,
    Content: Popover.Content,
    Trigger: Popover.Trigger
  }
} satisfies Meta<PopoverProps>

export default meta
type Story = StoryObj<PopoverProps>

const contentStyle = {
  padding: '16px',
  background: 'white',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  minWidth: '200px'
}

export const Default: Story = {
  render: (args) => {
    return (
      <Popover {...args}>
        <Popover.Trigger asChild={false}>팝오버 열기</Popover.Trigger>
        <Popover.Content style={contentStyle}>팝오버 내용입니다</Popover.Content>
      </Popover>
    )
  }
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Popover
          open={open}
          onOpenChange={setOpen}>
          <Popover.Trigger asChild={false}>제어 팝오버</Popover.Trigger>
          <Popover.Content style={contentStyle}>제어 컴포넌트 예시입니다</Popover.Content>
        </Popover>
        <button onClick={() => setOpen(!open)}>외부에서 토글 ({open ? '열림' : '닫힘'})</button>
      </div>
    )
  }
}

export const WithAnchor: Story = {
  render: (args) => {
    return (
      <div style={{ padding: '100px' }}>
        <Popover {...args}>
          <Popover.Trigger asChild={false}>버튼 클릭</Popover.Trigger>
          <Popover.Anchor
            style={{
              marginTop: '16px',
              padding: '20px',
              border: '2px dashed #999',
              borderRadius: '8px',
              background: '#f9f9f9'
            }}>
            앵커 위치 (팝오버가 여기를 기준으로 표시됩니다)
          </Popover.Anchor>
          <Popover.Content style={contentStyle}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>팝오버 제목</div>
            <div>앵커를 사용한 팝오버 예시입니다. 스크롤해도 앵커를 따라다닙니다.</div>
          </Popover.Content>
        </Popover>
      </div>
    )
  }
}

export const Positioning: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: '24px', padding: '150px' }}>
        <Popover {...args}>
          <Popover.Trigger asChild={false}>Top</Popover.Trigger>
          <Popover.Content
            side='top'
            style={contentStyle}>
            상단 팝오버
          </Popover.Content>
        </Popover>

        <Popover {...args}>
          <Popover.Trigger asChild={false}>Right</Popover.Trigger>
          <Popover.Content
            side='right'
            style={contentStyle}>
            우측 팝오버
          </Popover.Content>
        </Popover>

        <Popover {...args}>
          <Popover.Trigger asChild={false}>Bottom</Popover.Trigger>
          <Popover.Content
            side='bottom'
            style={contentStyle}>
            하단 팝오버
          </Popover.Content>
        </Popover>

        <Popover {...args}>
          <Popover.Trigger asChild={false}>Left</Popover.Trigger>
          <Popover.Content
            side='left'
            style={contentStyle}>
            좌측 팝오버
          </Popover.Content>
        </Popover>
      </div>
    )
  }
}

export const Alignment: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '150px' }}>
        <Popover {...args}>
          <Popover.Trigger asChild={false}>Start Align</Popover.Trigger>
          <Popover.Content
            align='start'
            style={contentStyle}>
            시작 정렬
          </Popover.Content>
        </Popover>

        <Popover {...args}>
          <Popover.Trigger asChild={false}>Center Align</Popover.Trigger>
          <Popover.Content
            align='center'
            style={contentStyle}>
            중앙 정렬
          </Popover.Content>
        </Popover>

        <Popover {...args}>
          <Popover.Trigger asChild={false}>End Align</Popover.Trigger>
          <Popover.Content
            align='end'
            style={contentStyle}>
            끝 정렬
          </Popover.Content>
        </Popover>
      </div>
    )
  }
}

export const HoverTrigger: Story = {
  render: (args) => {
    return (
      <Popover {...args}>
        <Popover.Trigger
          asChild={false}
          trigger='hover'
          hoverDelay={200}
          closeDelay={100}>
          마우스를 올려보세요
        </Popover.Trigger>
        <Popover.Content style={contentStyle}>Hover 트리거 팝오버</Popover.Content>
      </Popover>
    )
  }
}

export const CustomContent: Story = {
  render: (args) => {
    const menuItemStyle = {
      padding: '12px 16px',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background 0.2s'
    }

    return (
      <Popover {...args}>
        <Popover.Trigger asChild={false}>메뉴 열기</Popover.Trigger>

        <Popover.Content
          style={{
            ...contentStyle,
            padding: '8px'
          }}>
          <div
            onClick={() => {
              alert('메뉴 1 클릭')
            }}
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}>
            메뉴 항목 1
          </div>
          <div
            onClick={() => {
              alert('메뉴 2 클릭')
            }}
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}>
            메뉴 항목 2
          </div>
          <div
            onClick={() => {
              alert('메뉴 3 클릭')
            }}
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}>
            메뉴 항목 3
          </div>
        </Popover.Content>
      </Popover>
    )
  }
}

export const WithFocusableContent: Story = {
  render: (args) => {
    return (
      <Popover {...args}>
        <Popover.Trigger asChild={false}>포커스 가능한 콘텐츠</Popover.Trigger>
        <Popover.Content style={contentStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>사용자 정보 입력</h3>
            <Textfield placeholder='이름을 입력하세요' />
            <Textfield placeholder='이메일을 입력하세요' />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant='outline'>취소</Button>
              <Button variant='secondary'>확인</Button>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    )
  }
}
