import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import OpenTestWindowButton from './OpenTestWindowButton';

const UIControls = () => (
  <div
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      display: 'flex',
      gap: '10px',
      zIndex: 1000,
    }}
  >
    <LanguageSwitcher />
    <OpenTestWindowButton />
  </div>
);

export default UIControls;
