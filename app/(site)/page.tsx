import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="">
      <div
        className="
            absolute
            top-0
            left-0
            w-full
            h-full
            bg-gradient-to-br
            from-[#e8fcff]
            to-[#fff]
            rounded-md
            opacity-100
            -z-50
        "
      />
      <header className="hover:bg-white bg-white md:bg-transparent shadow-lg md:shadow-none hover:shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between text-2xl font-semibold">
          <Image
            src={"/trello.png"}
            alt="trello logo"
            width={200}
            height={100}
            className="w-44 md:w-32 pb-10 md:pb-0object-contain"
          />
          <Link href={'/Board'} className="bg-blue-600 px-10 flex items-center">Log in</Link>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center py-10 md:w-[750px] mx-auto">
        <Image
          src={"/Hero.webp"}
          alt="trello logo"
          width={750}
          height={750}
          className="object-contain"
        />
        <div className="md:text-5xl text-3xl font-bold text-center">Project management without the mayhem</div>
      </div>
    </div>
  );
};

export default page;
