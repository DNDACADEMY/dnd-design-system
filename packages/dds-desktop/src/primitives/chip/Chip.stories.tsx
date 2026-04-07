import { Chip } from './Chip'

import type { ChipStatus } from './type'
import type { Meta, StoryObj } from '@storybook/react-vite'

const STATUS_OPTIONS: ChipStatus[] = ['default', 'selected']

const meta = {
  title: 'Primitives/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref']
    },
    docs: {
      description: {
        component: 'Chip 컴포넌트는 태그, 필터, 선택 항목을 표시할 때 사용해요.'
      }
    }
  },
  tags: ['autodocs'],
  args: {
    children: '칩 텍스트',
    status: 'default'
  },
  argTypes: {
    status: {
      description: '칩의 타입을 설정해요.',
      control: 'select',
      options: STATUS_OPTIONS
    },
    leftAddon: {
      description: '칩의 왼쪽 영역을 설정해요. 보통 아이콘을 배치할 때 사용해요.'
    },
    rightAddon: {
      description: '칩의 오른쪽 영역을 설정해요. 보통 아이콘을 배치할 때 사용해요.'
    },
    children: {
      description: '칩의 텍스트 내용을 설정해요.',
      control: 'text'
    }
  },
  subcomponents: {
    Icon: Chip.Icon
  }
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: '칩 텍스트',
    status: 'default'
  }
}

export const Default: Story = {
  args: {
    children: '기본 칩',
    status: 'default'
  }
}

export const Selected: Story = {
  args: {
    children: '선택된 칩',
    status: 'selected'
  }
}

export const WithLeftIcon: Story = {
  args: {
    children: '아이콘 칩',
    status: 'default',
    leftAddon: (
      <Chip.Icon
        name='star'
        size={16}
      />
    )
  }
}

export const WithRightIcon: Story = {
  args: {
    children: '닫기 가능',
    status: 'default',
    rightAddon: (
      <Chip.Icon
        name='x'
        size={16}
      />
    )
  }
}

export const WithBothIcons: Story = {
  args: {
    children: '양쪽 아이콘',
    status: 'selected',
    leftAddon: (
      <Chip.Icon
        name='check'
        size={16}
      />
    ),
    rightAddon: (
      <Chip.Icon
        name='x'
        size={16}
      />
    )
  }
}

export const StatusVariants: Story = {
  parameters: {
    controls: {
      exclude: ['status', 'children', 'leftAddon', 'rightAddon']
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Chip status='default'>기본 칩</Chip>
      <Chip status='selected'>선택된 칩</Chip>
    </div>
  )
}

export const IconCombinations: Story = {
  parameters: {
    controls: {
      exclude: ['status', 'children', 'leftAddon', 'rightAddon']
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Chip
        status='default'
        leftAddon={
          <Chip.Icon
            name='star'
            size={16}
          />
        }>
        즐겨찾기
      </Chip>
      <Chip
        status='default'
        rightAddon={
          <Chip.Icon
            name='x'
            size={16}
          />
        }>
        제거 가능
      </Chip>
      <Chip
        status='selected'
        leftAddon={
          <Chip.Icon
            name='check'
            size={16}
          />
        }>
        선택됨
      </Chip>
      <Chip
        status='selected'
        leftAddon={
          <Chip.Icon
            name='heart'
            size={16}
          />
        }
        rightAddon={
          <Chip.Icon
            name='x'
            size={16}
          />
        }>
        좋아요
      </Chip>
    </div>
  )
}

export const FilterExample: Story = {
  parameters: {
    controls: {
      exclude: ['status', 'children', 'leftAddon', 'rightAddon']
    },
    docs: {
      description: {
        story: '필터나 태그 목록에서 칩을 사용하는 예시에요.'
      }
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Chip status='selected'>전체</Chip>
      <Chip status='default'>디자인</Chip>
      <Chip status='default'>개발</Chip>
      <Chip status='default'>마케팅</Chip>
      <Chip status='default'>기획</Chip>
    </div>
  )
}

export const TagList: Story = {
  parameters: {
    controls: {
      exclude: ['status', 'children', 'leftAddon', 'rightAddon']
    },
    docs: {
      description: {
        story: '삭제 가능한 태그 목록에서 칩을 사용하는 예시에요.'
      }
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {['React', 'TypeScript', 'Storybook', 'Vanilla Extract'].map((tag) => (
        <Chip
          key={tag}
          status='default'
          rightAddon={
            <Chip.Icon
              name='x'
              size={16}
            />
          }>
          {tag}
        </Chip>
      ))}
    </div>
  )
}
