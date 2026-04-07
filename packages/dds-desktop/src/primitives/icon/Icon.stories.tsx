import { Icon } from './Icon'

import type { IconName } from './type'
import type { Meta, StoryObj } from '@storybook/react-vite'

const POPULAR_ICONS: IconName[] = [
  'home',
  'user',
  'settings',
  'search',
  'heart',
  'star',
  'bell',
  'mail',
  'phone',
  'calendar',
  'arrow-right',
  'arrow-left',
  'arrow-up',
  'arrow-down',
  'chevron-right',
  'chevron-left',
  'plus',
  'minus',
  'x',
  'check',
  'trash',
  'edit',
  'download',
  'upload'
]

const meta = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['ref']
    },
    docs: {
      description: {
        component: 'Icon 컴포넌트는 아이콘을 렌더링할 때 사용해요.'
      }
    }
  },
  tags: ['autodocs'],
  args: {
    name: 'home',
    size: 24
  },
  argTypes: {
    name: {
      description: '아이콘 이름을 설정해요.',
      control: 'select',
      options: POPULAR_ICONS
    },
    url: {
      description: '커스텀 아이콘 URL을 설정해요.',
      control: 'text'
    },
    size: {
      description: '아이콘 크기를 설정해요.',
      control: 'number'
    },
    color: {
      description: '아이콘 색상을 설정해요.',
      control: 'color'
    },
    strokeWidth: {
      description: '선 두께를 설정해요.',
      control: { type: 'range', min: 0.5, max: 3, step: 0.5 }
    }
  }
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    name: 'home',
    size: 24
  }
}

export const WithURL: Story = {
  args: {
    url: 'https://api.iconify.design/logos/react.svg',
    size: 48,
    alt: 'React Logo',
    name: undefined
  },
  parameters: {
    exclude: ['name'],
    docs: {
      description: {
        story: 'url prop을 사용하면 외부 이미지를 아이콘으로 사용할 수 있어요.'
      }
    }
  }
}

export const Sizes: Story = {
  args: {
    name: 'heart',
    size: 24
  },
  parameters: {
    controls: {
      exclude: ['name', 'size', 'url']
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon
        name='heart'
        size={16}
      />
      <Icon
        name='heart'
        size={24}
      />
      <Icon
        name='heart'
        size={32}
      />
      <Icon
        name='heart'
        size={48}
      />
      <Icon
        name='heart'
        size={64}
      />
    </div>
  )
}

export const Colors: Story = {
  args: {
    name: 'star',
    size: 32
  },
  parameters: {
    controls: {
      exclude: ['name', 'color', 'url']
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon
        name='star'
        size={32}
        color='#000000'
      />
      <Icon
        name='star'
        size={32}
        color='#3b82f6'
      />
      <Icon
        name='star'
        size={32}
        color='#10b981'
      />
      <Icon
        name='star'
        size={32}
        color='#f59e0b'
      />
      <Icon
        name='star'
        size={32}
        color='#ef4444'
      />
    </div>
  )
}

export const IconGallery: Story = {
  args: {
    name: 'home',
    size: 24
  },
  parameters: {
    controls: {
      exclude: ['name', 'url']
    }
  },
  render: (_) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 24,
        padding: 16
      }}>
      {POPULAR_ICONS.map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8
          }}>
          <Icon
            name={iconName}
            size={24}
          />
          <span style={{ fontSize: 10, color: '#666' }}>{iconName}</span>
        </div>
      ))}
    </div>
  )
}

export const StrokeWidth: Story = {
  args: {
    name: 'settings',
    size: 32
  },
  parameters: {
    controls: {
      exclude: ['name', 'strokeWidth', 'url']
    }
  },
  render: (_) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Icon
          name='settings'
          size={32}
          strokeWidth={0.5}
        />
        <span style={{ fontSize: 10 }}>0.5</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Icon
          name='settings'
          size={32}
          strokeWidth={1}
        />
        <span style={{ fontSize: 10 }}>1</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Icon
          name='settings'
          size={32}
          strokeWidth={1.5}
        />
        <span style={{ fontSize: 10 }}>1.5</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Icon
          name='settings'
          size={32}
          strokeWidth={2}
        />
        <span style={{ fontSize: 10 }}>2</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Icon
          name='settings'
          size={32}
          strokeWidth={3}
        />
        <span style={{ fontSize: 10 }}>3</span>
      </div>
    </div>
  )
}
