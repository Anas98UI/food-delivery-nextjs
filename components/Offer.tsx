import Image from "next/image";
import CountDown from "./CountDown";
import Link from "next/link";

export default function Offer() {
  return (
    <div className="flex flex-col h-screen md:flex-row bg-black md:justify-between bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4 md:p-8">
        <h1 className="text-red-500 font-bold text-4xl xl:text-5xl text-center">
          Smile, It's Burger Time!
        </h1>
        <p className="text-white text-center max-w-md">
          More flavor, less price! Our Burger & Fries deal makes your day tastier.
        </p>
        <CountDown />
        <Link
          href="/menu"
          className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-400 text-white transition-colors"
        >
          Order now!
        </Link>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="relative w-full flex-1 md:h-full min-h-75">
        <Image
          src="/offerProduct.png"
          alt="Special Offer"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}