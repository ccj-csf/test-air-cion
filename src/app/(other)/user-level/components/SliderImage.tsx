'use client';
import { Icon } from '@/components';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import './index.css';
export interface IImageItem {
  url: string;
  alt: string;
  level: string;
  grade: number;
}

interface ImageSliderProps {
  images: IImageItem[];
  onImageChange?: (currentIndex: number, currentImage: IImageItem) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, onImageChange }) => {
  const handleSlideChange = (swiper: SwiperClass) => {
    console.log('Slide index changed to: ', swiper.activeIndex);
    if (onImageChange) {
      onImageChange(swiper.activeIndex, images[swiper.activeIndex]);
    }
  };

  return (
    <div className="-mt-10 flex h-[300px] items-center justify-center px-4">
      <Swiper
        onSlideChange={handleSlideChange}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-122px w-[96px]">
              <Image src={image.url} alt={image.alt} width={96} height={122} />
            </div>
          </SwiperSlide>
        ))}
        <Icon name="left-arrow" className="swiper-button-prev !-mt-4 !text-36" />
        <Icon name="right-arrow" className="swiper-button-next !-mt-4 !text-36" />
      </Swiper>
    </div>
  );
};

export default ImageSlider;
