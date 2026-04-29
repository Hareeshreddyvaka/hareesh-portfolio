import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContactSection from '../sections/ContactSection';

type MotionStubProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
};

vi.mock('../../hooks/usePortfolioData', () => ({
  usePortfolioData: () => ({
    data: {
      personal: {
        name: 'Test User',
        email: 'test@example.com',
        social: { github: 'https://github.com/test', linkedin: 'https://linkedin.com/test', twitter: 'https://twitter.com/test' }
      }
    },
    isLoading: false,
    error: null
  })
}));

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target: object, key: string | symbol) =>
        React.forwardRef<HTMLElement, MotionStubProps>((motionProps, forwardedRef) => {
          const { children, ref, ...rest } = motionProps;
          return React.createElement(key as React.ElementType, { ...rest, ref: ref ?? forwardedRef }, children);
        }),
    },
  ),
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe('ContactSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading and form fields', () => {
    render(<ContactSection />);
    expect(screen.getByText('Let us build something intelligent')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });
});
