import React from 'react';
import { MdOutlineClose } from 'react-icons/md';

type MediaViewModalProps = {
  mediaUrl: string;
  closefunc: () => void;
};

const MediaViewModal: React.FC<MediaViewModalProps> = ({ mediaUrl, closefunc }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={closefunc}>
      <div className="relative w-[900px] sm:w-[400px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end p-2 px-0 relative left-[25px] sm:left-0 sm:top-1 ">
          <button
            className="text-white text-2xl hover:bg-slate-400 rounded-full p-1"
            onClick={closefunc}>
            <MdOutlineClose />
          </button>
        </div>
        <img
          src={mediaUrl}
          alt="Media"
          className="w-full sm:w-[380px] h-auto max-w-[1000px] max-h-[600px] object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default MediaViewModal;
