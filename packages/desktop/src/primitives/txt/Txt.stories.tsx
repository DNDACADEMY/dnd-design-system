import { color } from '@dnd-lab/token'

import { Txt } from './Txt'
import { TYPOGRAPHY_OPTIONS } from './types'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Primitives/Txt',
  component: Txt,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref', 'as']
    },
    docs: {
      description: {
        component: 'Txt 컴포넌트는 텍스트를 렌더링할 때 사용해요.'
      }
    }
  },
  tags: ['autodocs'],
  args: {
    typography: 'body1',
    children: '텍스트를 입력하세요'
  },
  argTypes: {
    typography: {
      control: 'select',
      options: TYPOGRAPHY_OPTIONS
    },
    emphasized: {
      control: 'boolean'
    },
    color: {
      control: 'color'
    },
    children: {
      description: '텍스트 내용을 설정해요.',
      control: 'text'
    }
  }
} satisfies Meta<typeof Txt>

export default meta
type Story = StoryObj<typeof meta>

// 가장 기본적인 플레이그라운드
export const Playground: Story = {}

// 지원하는 모든 타이포그래피 스케일 한 번에 보기
export const TypographyScale: Story = {
  args: {
    fontWeight: 'regular',
    color: color.primitive.mono.black
  },
  parameters: {
    controls: {
      exclude: ['typography', 'as', 'children']
    }
  },
  render: ({ color, emphasized }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TYPOGRAPHY_OPTIONS.map((typography) => (
        <Txt
          key={typography}
          typography={typography}
          color={color}
          emphasized={emphasized}>
          {typography}
        </Txt>
      ))}
    </div>
  )
}
