"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function Title() {
  const words = [
    {
      text: "Bienvenue",
      // className: "text-red-200 dark:text-blue-500",
    },
    {
      text: "sur",
    },
    {
      text: "Gloom ! -",
      className: "text-lime-600 dark:text-blue-500",
    },
    // {
    //   text: "with",
    // },
    {
      text: "Achetez, vendez, jouez.",
      className: "text-lime-700 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          S'inscrire
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Se connecter
        </button>
      </div>
    </div>
  );
}
