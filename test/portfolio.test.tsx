import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Contact from '../components/Contact';
import { PERSONAL_INFO, PROJECTS } from '../constants';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('portfolio navigation and contact', () => {
  it('links to GitHub and LinkedIn from the hero and footer', () => {
    render(<App />);
    expect(screen.getAllByRole('link', { name: 'GitHub' }).map(a => a.getAttribute('href'))).toEqual([PERSONAL_INFO.github, PERSONAL_INFO.github]);
    expect(screen.getAllByRole('link', { name: 'LinkedIn' }).map(a => a.getAttribute('href'))).toEqual([PERSONAL_INFO.linkedin, PERSONAL_INFO.linkedin]);
  });
  it('shows every project without hiding any behind a toggle', () => {
    const { container } = render(<App />);
    for (const p of PROJECTS) expect(screen.getByRole('heading', { level: 3, name: p.title })).toBeVisible();
    expect(container.querySelector('#projects details')).toBeNull();
  });
  it('renders the career content and resolves every page anchor', () => {
    const { container } = render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Thoughtful code.');
    expect(screen.getAllByText('United Medical Monitoring').length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/Aspiring Cybersecurity Analyst|Hire Analyst|Expected May|In Progress/);
    expect(container.textContent).not.toContain(PERSONAL_INFO.phone);
    for (const anchor of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(container.querySelector(anchor.getAttribute('href')!)).not.toBeNull();
    }
    expect(screen.getByRole('link', { name: /Let’s talk/ })).toHaveAttribute('href', `mailto:${PERSONAL_INFO.email}`);
  });
  it('opens mobile navigation and closes it with Escape or a destination', async () => {
    const user = userEvent.setup(); render(<App />);
    const toggle = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(toggle); expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}'); expect(toggle).toHaveAttribute('aria-expanded', 'false'); expect(toggle).toHaveFocus();
    await user.click(toggle); await user.click(screen.getByRole('link', { name: 'Experience', exact: true }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
  it('shows an honest offline assistant and returns focus when closed', async () => {
    const user = userEvent.setup(); render(<App />);
    const launcher = screen.getByRole('button', { name: /Ask about my work/ });
    await user.click(launcher); expect(screen.getByText(/Chat is offline/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Send message' })).not.toBeInTheDocument();
    await user.keyboard('{Escape}'); expect(launcher).toHaveFocus(); expect(launcher).toHaveAttribute('aria-expanded', 'false');
  });
  it('copies the real email address and acknowledges it only after success', async () => {
    const user = userEvent.setup(); render(<Contact />);
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    await user.click(screen.getByRole('button', { name: /Copy email/ }));
    expect(writeText).toHaveBeenCalledWith(PERSONAL_INFO.email);
    expect(screen.getByRole('button', { name: /Email copied/ })).toBeInTheDocument();
  });
  it('provides the address if clipboard permission fails', async () => {
    const user = userEvent.setup(); render(<Contact />);
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Permission denied'));
    await user.click(screen.getByRole('button', { name: /Copy email/ }));
    expect(screen.getByRole('status')).toHaveTextContent(`You can copy this address: ${PERSONAL_INFO.email}`);
    expect(screen.queryByRole('button', { name: /Email copied/ })).not.toBeInTheDocument();
  });
});
