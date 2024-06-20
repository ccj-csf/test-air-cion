'use client';
import { BaseButton, BaseSlideUpModal } from '@/components';
import { SlideUpModalRef } from '@/components/base-slide-up-modal';
import Image from 'next/image';
import { useRef } from 'react';

const Energy = () => {
  const modalRef = useRef<SlideUpModalRef>(null);
  const handleClose = () => {
    modalRef.current?.close();
  };
  const handleOpen = () => {
    modalRef.current?.open();
  };
  return (
    <main>
      <section
        className="flex  items-center justify-between rounded-14 bg-gray-400 p-3 px-[14px] text-14"
        onClick={handleOpen}
      >
        <div className="flex flex-col">
          <span>Full Energy</span>
          <span className="text-12 text-gray-200">
            1/3 <span>available</span>
          </span>
        </div>
        <Image src="/icons/lightning1.svg" alt="lightning" width={28} height={32} />
      </section>
      <BaseSlideUpModal ref={modalRef}>
        <main className="mt-4 flex flex-col items-center px-8">
          <h2 className="font-700 text-24">Full energy</h2>
          <Image
            src="/icons/lightning1.svg"
            alt="lightning"
            width={78}
            height={90}
            className="mb-2 mt-6"
          />
          <p className="text-14">Recharge your energy to maximum</p>
          <div className="mb-7 mt-6 flex items-center space-x-4">
            <Image src="/icons/coin1.svg" alt="lightning" width={42} height={42} />
            <span className="font-700 text-24">Free</span>
          </div>
          <BaseButton onClick={handleClose} className="w-full">
            ok
          </BaseButton>
        </main>
      </BaseSlideUpModal>
    </main>
  );
};

export default Energy;
