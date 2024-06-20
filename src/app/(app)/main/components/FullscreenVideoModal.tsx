'use client';
import { ShieldQuestion } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface FullscreenVideoModalProps {
  videoUrl: string; // 接受一个视频 URL 作为 props
  isNewUser: boolean;
}

const FullscreenVideoModal: React.FC<FullscreenVideoModalProps> = ({ videoUrl, isNewUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const handleOpenVideo = (): void => {
    setIsOpen(true);
    setTimeout(() => {
      setIsPlaying(true);
    }, 5000);
  };

  const handleCloseVideo = (): void => {
    setIsOpen(false);
    setIsPlaying(false); //
  };
  useEffect(() => {
    if (isNewUser) {
      handleOpenVideo();
    }
  }, [isNewUser]);

  return (
    <div>
      <section className="font-500 fixed bottom-20 right-4 text-14" onClick={handleOpenVideo}>
        <ShieldQuestion size={36} />
      </section>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <ReactPlayer
            url={videoUrl}
            playing={isPlaying}
            controls={true}
            width="100%"
            onEnded={handleCloseVideo}
          />
          <button
            onClick={handleCloseVideo}
            className="absolute right-5 top-5 cursor-pointer border-none bg-transparent text-3xl text-white"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default FullscreenVideoModal;
