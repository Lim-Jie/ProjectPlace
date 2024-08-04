"use client"; // This directive enables client-side features

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function AdminIcon() {
  const { push } = useRouter();

  const handleIconClick = () => {
    push('/dashboard'); // Redirect to the dashboard page when the icon is clicked
  };

  return (
    <div onClick={handleIconClick} className="cursor-pointer">
      <Image src="icons/AdminIcon_MaterialSymbolsLightTerminal.svg" width={32} height={32}/>
    </div>
  );
}
