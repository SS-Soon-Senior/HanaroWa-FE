import type { Preview } from '@storybook/nextjs';
// The 'getRouter' import is no longer needed
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true, // Keep this for App Router
      router: {
        pathname: '/app/',
        push: () => {},
        back: () => {},
        replace: () => {},
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
