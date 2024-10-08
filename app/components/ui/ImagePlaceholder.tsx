import React from 'react';

interface ImagePlaceholderProps {
  width: number | string;
  height: number | string;
  text?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  width, 
  height, 
  text = 'Placeholder' 
}) => {
  return (
    <div 
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {text}
    </div>
  );
};

export default ImagePlaceholder;