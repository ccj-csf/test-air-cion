'use client';
import { useDebounceFn } from 'ahooks';
import Image from 'next/image';
import React, { useRef } from 'react';
import CoinComponent from './CoinComponent';
interface ImageProps {
  url: string;
  bgUrl: string;
  isClocked: boolean;
}

interface ImageSliderProps {
  images: ImageProps[];
  onImageChange?: (image: ImageProps) => void;
  onClick?: (image: ImageProps) => void;
  onStatsUpdate: (coins: number) => void;
  disableAnimation: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onImageChange,
  onClick,
  onStatsUpdate,
  disableAnimation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { run: handleScroll } = useDebounceFn(
    () => {
      const container = containerRef.current;
      if (container) {
        const scrollX = container.scrollLeft;
        const containerWidth = container.offsetWidth;

        const currentIndex = Math.round(scrollX / containerWidth);
        if (images[currentIndex] && onImageChange) {
          onImageChange(images[currentIndex]);
        }
      }
    },
    {
      wait: 50,
    },
  );

  return (
    <div
      ref={containerRef}
      className="hide-scrollbar mt-4 flex snap-x snap-mandatory space-x-10 overflow-x-auto px-[60px] pb-10 pt-2"
      onScroll={handleScroll}
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          onClick={onClick ? () => onClick(image) : undefined}
          className="relative mx-auto   w-[280px] flex-none shrink-0 snap-center"
          style={{ minWidth: '100%' }}
        >
          <CoinComponent
            coinWidth={280}
            coinHeight={256}
            coinImagePath={image.url}
            onStatsUpdate={onStatsUpdate}
            disableAnimation={disableAnimation}
          ></CoinComponent>
          {image.isClocked && (
            <Image
              width={26}
              height={32}
              src="/images/lock.png"
              alt="Locked"
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
