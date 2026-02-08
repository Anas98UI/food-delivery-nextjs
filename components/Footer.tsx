import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between items-center h-12 md:px-20 uppercase md:text-xl text-red-600 px-4 bg-emerald-100">
      <Link href="/" className="font-bold hover:underline">
       
          The Big Three

      </Link>
      <p className="text-black text-sm">All Rights Reserved</p>
    </div>
  );
}