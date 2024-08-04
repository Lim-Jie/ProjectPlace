"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function UploadProjects() {
    const { push } = useRouter();

    const handleIconClick = () => {
        push('/uploadProjects');
    };

    return (
        <div onClick={handleIconClick} className="cursor-pointer">
            <Image src="icons/CodeIcon_MaterialSymbolsLightCodeOff.svg" alt="Upload Icon" width={32} height={32} />
        </div>
    )


}