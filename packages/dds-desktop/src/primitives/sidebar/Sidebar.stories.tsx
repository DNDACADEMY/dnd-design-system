import { useState } from 'react'

import { Sidebar } from './Sidebar'
import { Chip } from '../chip'
import { Icon } from '../icon'
import { Txt } from '../txt'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['children', 'onOpenChange', 'ref']
    },
    docs: {
      description: {
        component: 'Sidebar 컴포넌트는 앱의 네비게이션 구조를 표현할 때 사용해요.'
      }
    }
  },
  tags: ['autodocs'],
  subcomponents: {
    Content: Sidebar.Content,
    Group: Sidebar.Group,
    Item: Sidebar.Item,
    Affix: Sidebar.Affix
  },
  args: {
    open: true,
    onOpenChange: () => {}
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '사이드바의 열림 상태를 설정해요.'
    }
  }
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    open: true,
    onOpenChange: () => {}
  },
  render: (args) => {
    return (
      <Sidebar
        style={{ height: '700px' }}
        {...args}>
        {/* 섹션 1: Identity 영역 */}
        <Sidebar.Affix>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Sidebar.Collapsible>
              <Icon name='app-window' />
            </Sidebar.Collapsible>
            <Sidebar.Trigger>
              <Icon name='menu' />
            </Sidebar.Trigger>
          </div>
          <Sidebar.Collapsible>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 20, marginBottom: 40 }}>
              <Chip status='selected'>개발</Chip>
              <Txt
                typography='h5'
                fontWeight='bold'>
                손현곤
              </Txt>
            </div>
          </Sidebar.Collapsible>
        </Sidebar.Affix>

        {/* 섹션 2: Navigation 영역 */}
        <Sidebar.Content>
          <Sidebar.Group label='관리'>
            <Sidebar.Item
              isActive
              iconName='file-text'>
              프로젝트 관리
            </Sidebar.Item>
            <Sidebar.Item iconName='users'>운영진 관리</Sidebar.Item>
            <Sidebar.Item iconName='message-circle'>후기 관리</Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Content>

        {/* 섹션 3: Footer 영역 */}
        <Sidebar.Affix padded={false}>
          <Sidebar.Item iconName='user'>비밀번호 변경</Sidebar.Item>
          <Sidebar.Item iconName='log-out'>로그아웃</Sidebar.Item>
        </Sidebar.Affix>
      </Sidebar>
    )
  }
}

export const Controlled: Story = {
  args: {
    open: true
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open ?? false)

    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Sidebar
          style={{ height: '700px' }}
          {...args}
          open={open}
          onOpenChange={setOpen}>
          <Sidebar.Affix>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Sidebar.Collapsible>
                <Icon name='app-window' />
              </Sidebar.Collapsible>
              <Sidebar.Trigger>
                <Icon name='menu' />
              </Sidebar.Trigger>
            </div>
            <Sidebar.Collapsible>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 20, marginBottom: 40 }}>
                <Chip status='selected'>개발</Chip>
                <Txt
                  typography='h5'
                  fontWeight='bold'>
                  손현곤
                </Txt>
              </div>
            </Sidebar.Collapsible>
          </Sidebar.Affix>
          <Sidebar.Content>
            <Sidebar.Group label='관리'>
              <Sidebar.Item iconName='file-text'>프로젝트 관리</Sidebar.Item>
              <Sidebar.Item iconName='users'>운영진 관리</Sidebar.Item>
            </Sidebar.Group>
          </Sidebar.Content>

          <Sidebar.Affix padded={false}>
            <Sidebar.Item iconName='log-out'>로그아웃</Sidebar.Item>
          </Sidebar.Affix>
        </Sidebar>
        <button onClick={() => setOpen((prev) => !prev)}>외부에서 토글 ({open ? '열림' : '닫힘'})</button>
      </div>
    )
  }
}

export const InteractiveItems: Story = {
  args: {
    open: true
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open ?? true)
    const [activeMenu, setActiveMenu] = useState<'project' | 'operator'>('project')

    return (
      <Sidebar
        style={{ height: '700px' }}
        {...args}
        open={open}
        onOpenChange={setOpen}>
        <Sidebar.Affix>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Sidebar.Collapsible>
              <Icon name='app-window' />
            </Sidebar.Collapsible>
            <Sidebar.Trigger>
              <Icon name='menu' />
            </Sidebar.Trigger>
          </div>
        </Sidebar.Affix>
        <Sidebar.Content>
          <Sidebar.Group label='키보드 접근성'>
            <Sidebar.Item
              isActive={activeMenu === 'project'}
              iconName='file-text'
              onClick={() => {
                setActiveMenu('project')
              }}>
              프로젝트 관리
            </Sidebar.Item>
            <Sidebar.Item
              isActive={activeMenu === 'operator'}
              iconName='users'
              onClick={() => {
                setActiveMenu('operator')
              }}>
              운영진 관리
            </Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
    )
  }
}
