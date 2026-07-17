import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import App from './App.tsx';
import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource-variable/manrope/wght.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig
      reducedMotion="user"
      transition={{duration: 0.55, ease: [0.22, 1, 0.36, 1]}}
    >
      <App />
    </MotionConfig>
  </StrictMode>,
);
