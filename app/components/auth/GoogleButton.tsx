'use client';

import Image from 'next/image';

interface GoogleButtonProps {
  onClick: () => void;
}

const GoogleButton = ({ onClick }: GoogleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
    >
      <Image
        src="/google-icon.svg"
        alt="Google"
        width={20}
        height={20}
      />
      Continue with Google
    </button>
  );
};

export default GoogleButton; 