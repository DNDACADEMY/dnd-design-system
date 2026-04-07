import { primitive } from '@dds/token'

import { Txt } from './Txt'

import type { Typography } from './types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const TYPOGRAPHY_OPTIONS: Typography[] = ['h4', 'h5', 'h6', 'body1', 'body2', 'caption1', 'caption2']

const meta = {
  title: 'Primitives/Txt',
  component: Txt,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref']
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
    as: 'span',
    children: '텍스트를 입력하세요'
  },
  argTypes: {
    typography: {
      control: 'select',
      options: TYPOGRAPHY_OPTIONS
    },
    as: {
      description: '텍스트를 렌더링할 HTML 요소를 설정해요.',
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3']
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
export const Playground: Story = {
  args: {
    fontWeight: 'regular',
    color: primitive.color.mono900
  }
}

// 지원하는 모든 타이포그래피 스케일 한 번에 보기
export const TypographyScale: Story = {
  args: {
    fontWeight: 'regular',
    color: primitive.color.mono900
  },
  parameters: {
    controls: {
      exclude: ['typography', 'as', 'children']
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TYPOGRAPHY_OPTIONS.map((typography) => (
        <Txt
          key={typography}
          typography={typography}
          fontWeight='regular'
          color='mono900'>
          {typography}
        </Txt>
      ))}
    </div>
  )
}

// 제목으로 사용할 때의 예시
export const AsHeading: Story = {
  args: {
    as: 'h2',
    typography: 'h5',
    fontWeight: 'medium',
    color: primitive.color.mono900,
    children: '섹션 제목 텍스트'
  }
}
