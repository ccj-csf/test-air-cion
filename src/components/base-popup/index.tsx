'use client';
import React, { useEffect, useRef, useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  height?: number;
  children?: React.ReactNode;
}

const BasePopup: React.FC<PopupProps> = ({ isOpen, onClose, height = 300, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0); // 修改为只需要一个状态来存储开始的Y坐标

  const maxHeight = height > 470 ? 470 : height;
  // 最小高度
  const minHeight = 300;
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      // 开始动画关闭序列
      if (animate) {
        const timeoutId = setTimeout(() => {
          setAnimate(false);
        }, 1000); // 延时应与动画持续时间相同
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isOpen, animate]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setStartY(event.touches[0].clientY);
        event.preventDefault();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (ref.current && ref.current.contains(event.target as Node) && startY) {
        const touchEndY = event.touches[0].clientY;
        if (touchEndY > startY + 90) {
          // 如果在整个弹窗区域内向下滑动超过90px，关闭弹窗
          onClose();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onClose, startY]);

  useEffect(() => {
    const handleBackgroundClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleBackgroundClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen && !animate) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end text-white">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div
        ref={ref}
        className="w-full  rounded-t-lg bg-gray-400 pt-6 shadow-lg transition-transform duration-1000 ease-in-out"
        style={{
          maxHeight: `${maxHeight}px`,
          minHeight: `${minHeight}px`,
          transform: animate ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {JSON.stringify(isOpen)}
        {children}
        <div
          className="absolute left-1/2 top-2 -translate-x-1/2 transform rounded-full bg-white"
          style={{ width: '76px', height: '5px', cursor: 'grab' }}
        />
      </div>
    </div>
  );
};

export default BasePopup;
