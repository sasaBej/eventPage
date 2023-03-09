import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import './types/global.d.ts';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
