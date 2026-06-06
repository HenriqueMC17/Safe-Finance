import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HeroSection from '../HeroSection'
import { copywriting } from '@/config/copywriting'
import React from 'react'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right" />,
  Shield: () => <div data-testid="shield" />,
  Check: () => <div data-testid="check" />,
}))

describe('HeroSection', () => {
  it('renders the title from copywriting config', () => {
     render(<HeroSection />)
     // The highlight is usually part of the title
     expect(screen.getByText(copywriting.hero.title.line1)).toBeInTheDocument()
  })

  it('renders the main description', () => {
    render(<HeroSection />)
    expect(screen.getByText(copywriting.hero.description)).toBeInTheDocument()
  })
})
