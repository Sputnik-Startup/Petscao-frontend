import React from 'react';

function ComponentHeader({ title, icon }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'baseline',
      }}
    >
      <h3 style={{ marginRight: '10px', color: '#fff', fontSize: '27px' }}>
        {title}
      </h3>
      {icon}
    </header>
  );
}

export default ComponentHeader;
