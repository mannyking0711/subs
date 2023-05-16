import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { App } from '~/views';
import { PaletteTree } from './palette';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
