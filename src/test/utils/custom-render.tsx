import type { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

export function CustomRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { CustomRender as render };
