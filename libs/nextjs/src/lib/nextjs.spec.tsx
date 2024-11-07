import { render } from '@testing-library/react';

import Nextjs from './nextjs';

describe('Nextjs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Nextjs />);
    expect(baseElement).toBeTruthy();
  });
});
