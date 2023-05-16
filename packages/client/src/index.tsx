import { DevSupport } from '@react-buddy/ide-toolbox';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { APP_ROOT } from '~/config';
import { App } from '~/views/App';

import './index.css';
import { ComponentPreviews, useInitial } from '~/dev';

const container = document.getElementById(APP_ROOT);
const root = createRoot(container!);

function ReactApp(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <App />
    </Suspense>
  );
}

root.render(
  <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
    <ReactApp />
  </DevSupport>
);
