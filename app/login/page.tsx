"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-9rem)]">
        <p className="text-red-500">Loading...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="py-2 h-[calc(100vh-9rem)] flex justify-center items-center">
      {/* BOX */}
      <div className="p-4 flex flex-col gap-7 rounded-md shadow-2xl md:flex-row md:items-center max-w-4xl mx-4">
        {/* IMAGE CONTAINER */}
        <div className="relative h-48 w-full md:h-80 md:w-1/2">
          <Image
            src="/loginBg.png"
            alt="Login Background"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        {/* TEXT CONTAINER */}
        <div className="flex flex-col items-center gap-4 p-2 md:w-1/2">
          <h1 className="font-bold text-2xl text-red-500">Welcome</h1>
          <p className="text-center px-4 text-gray-600">
            Join us! Log in or create an account with your favorite social platform
          </p>
          
          <button
            className="flex gap-4 px-4 py-3 min-w-56 ring-1 ring-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt="Google"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
          
          <button
            className="flex gap-4 px-4 py-3 min-w-56 ring-1 ring-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => signIn("facebook")}
          >
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Facebook</span>
          </button>
          
          <p className="text-sm text-gray-500">
            Have a problem?{" "}
            <Link href="/" className="underline text-red-500">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
