"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    id: 0,
    title: "Always fresh & always crispy & always hot",
    image: "/slider01.jpg",
  },
  {
    id: 1,
    title: "We deliver your order wherever you are",
    image: "/slider02.jpg",
  },
  {
    id: 2,
    title: "The best pizza to share with your family",
    image: "/slider03.jpg",
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] md:flex-row bg-fuchsia-50">
      <div className="flex flex-col flex-1 gap-4 justify-center items-center p-4 md:w-1/2">
        <p className="uppercase text-center font-bold text-red-600 text-3xl md:text-4xl lg:text-5xl leading-tight">
          {data[currentSlide].title}
        </p>
        <Link
          href="/menu"
          className="px-6 py-3 bg-red-600 rounded-xl hover:bg-red-400 text-white transition-colors mt-4"
        >
          Order now!
        </Link>
        
        {/* Slide indicators */}
        <div className="flex gap-2 mt-4">
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === idx ? "bg-red-600" : "bg-red-200"
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="relative w-full md:w-1/2 flex-1">
        <Image
          src={data[currentSlide].image}
          alt="slideLogo"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}