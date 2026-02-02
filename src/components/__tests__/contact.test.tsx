import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContactSection from '../../sections/ContactSection';

type MotionProps = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
  [key: string]: unknown;
};

const sanitizeMotionProps = ({ children, ref, ...rest }: MotionProps) => {
  const {
    initial,
    animate,
    exit,
    transition,
    whileInView,
    viewport,
    whileTap,
    whileHover,
    variants,
    layout,
    ...safe
  } = rest;
  return { children, ref, props: safe };
};

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, key: string) =>
        React.forwardRef<HTMLElement, MotionProps>((motionProps, forwardedRef) => {
          const { children, ref, props } = sanitizeMotionProps(motionProps);
          return React.createElement(key, { ...props, ref: ref ?? forwardedRef }, children);
        }),
    },
  ),
  AnimatePresence: ({ children }: MotionProps) => <>{children}</>,
}));

const hoisted = vi.hoisted(() => ({
  sendFormMock: vi.fn(() => Promise.resolve({ status: 200 })),
}));

vi.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: {
    sendForm: hoisted.sendFormMock,
  },
}));

const toastMocks = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: toastMocks.success,
    error: toastMocks.error,
  },
  success: toastMocks.success,
  error: toastMocks.error,
}));

describe('ContactSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_EMAILJS_SERVICE_ID = 'service';
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID = 'template';
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY = 'public';
  });

  it('renders heading and form fields', () => {
    render(<ContactSection />);
    expect(screen.getByText('Let us build something intelligent')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('submits contact form when configured', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Subject'), 'Collaboration');
    await user.type(screen.getByLabelText('Message'), 'Hello, Hareesh!');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(hoisted.sendFormMock).toHaveBeenCalledTimes(1));
    expect(toastMocks.success).toHaveBeenCalledWith('Message sent! I will get back within 24 hours.');
  });

  it('notifies about missing configuration', async () => {
    import.meta.env.VITE_EMAILJS_SERVICE_ID = '';
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID = '';
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY = '';

    const user = userEvent.setup();
    render(<ContactSection />);

    await user.type(screen.getByLabelText('Name'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email'), 'jane@example.com');
    await user.type(screen.getByLabelText('Message'), 'Ping!');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() =>
      expect(toastMocks.error).toHaveBeenCalledWith('Email service is not configured. Please try again later.'),
    );
    expect(hoisted.sendFormMock).not.toHaveBeenCalled();
  });
});
