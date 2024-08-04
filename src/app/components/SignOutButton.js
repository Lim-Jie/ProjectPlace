// src/app/components/SignOutButton.js

"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })} 
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}

//http://localhost:3000/api/auth/signin