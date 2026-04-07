import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Sidebar } from './Sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Sidebar/Tests',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const SidebarItemKeyboardFixture = () => {
  const [activateCount, setActivateCount] = useState(0)

  return (
    <Sidebar
      open
      style={{ height: '500px' }}>
      <Sidebar.Content>
        <Sidebar.Group label='테스트 그룹'>
          <Sidebar.Item
            data-testid='sidebar-item'
            onClick={() => {
              setActivateCount((prev) => prev + 1)
            }}>
            프로젝트 관리
          </Sidebar.Item>
        </Sidebar.Group>
      </Sidebar.Content>
      <div data-testid='activate-count'>{activateCount}</div>
    </Sidebar>
  )
}

export const TabFocusTest: Story = {
  render: () => {
    return <SidebarItemKeyboardFixture />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByTestId('sidebar-item')

    await userEvent.tab()

    expect(item).toHaveFocus()
  }
}

export const EnterKeyActivationTest: Story = {
  render: () => {
    return <SidebarItemKeyboardFixture />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByTestId('sidebar-item')
    const activateCount = canvas.getByTestId('activate-count')

    await userEvent.tab()
    await userEvent.keyboard('{Enter}')

    expect(item).toHaveFocus()
    expect(activateCount).toHaveTextContent('1')
  }
}

export const SpaceKeyActivationTest: Story = {
  render: () => {
    return <SidebarItemKeyboardFixture />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const item = canvas.getByTestId('sidebar-item')
    const activateCount = canvas.getByTestId('activate-count')

    await userEvent.tab()
    await userEvent.keyboard('{Space}')

    expect(item).toHaveFocus()
    expect(activateCount).toHaveTextContent('1')
  }
}
