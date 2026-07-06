import React from 'react';

interface TextProps {
  children: React.ReactNode;
  font?: 'inter';
  size?: string;
}

export default function Text({ children, font = 'inter', size = '16px' }: TextProps) {
  
  const fontStyles = {
    inter: 'inter-uniquifier' //Main
  };

  const selectedFontClass = fontStyles[font];

  return (
    <div className={selectedFontClass} style={{ fontSize: size }}>
      {children}
    </div>
  );
}