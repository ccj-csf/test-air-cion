'use client';
import Image from 'next/image';
import React from 'react';
const defaultImage = '/icons/default-empty.svg';
interface EmptyStateProps {
  imageUrl?: string; // 自定义图片 URL
  message?: string; // 自定义显示的文案
}

const BaseEmpty: React.FC<EmptyStateProps> = ({ imageUrl, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <Image
        src={imageUrl || defaultImage}
        alt="Empty State"
        width={154}
        height={154}
        className="mb-4"
      />
      <p className="text-center text-14 text-gray-200">{message || 'no data'}</p>
    </div>
  );
};

export default BaseEmpty;
