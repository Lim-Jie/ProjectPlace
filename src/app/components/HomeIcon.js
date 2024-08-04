"use client"; // This directive enables client-side features

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function AdminIcon() {
  const { push } = useRouter();

  const handleIconClick = () => {
    push('/'); // Redirect to the dashboard page when the icon is clicked
  };

  return (
    <div onClick={handleIconClick} className="cursor-pointer">
      <Image src="icons/Home_MaterialSymbolsLightGarageHomeOutlineRounded.svg" width={32} height={32}/>
    </div>
  );
}
