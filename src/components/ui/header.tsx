import { useEffect, useState } from "react";
import { useTypingSpeedContext } from "../../hooks/useTypingSpeedContext";
import LogoSmall from "@/assets/images/logo-small.svg?react";
import TrophyIcon from "@/assets/images/icon-personal-best.svg?react";
import LogoLarge from "../../assets/images/logo-large.svg?react";

const Header = () => {
  const [personalBest, setPersonalBest] = useState(0);
  const { ended } = useTypingSpeedContext();

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedScore = window.localStorage.getItem("personal-best");
      if (storedScore) {
        setPersonalBest(JSON.parse(storedScore));
      }
    } catch (e) {
      console.log(e);
    }
  }, [ended]);

  return (
    <header className='flex justify-between items-center pt-4'>
      <div>
        <LogoLarge className='lg:block hidden' />
        <LogoSmall className='lg:hidden z-10' />
      </div>

      <div className='flex gap-2'>
        <TrophyIcon />
        <p className='text-neutral-400'>
          <span className='md:block hidden text-preset-4 '>Personal best:</span>{" "}
          <span className='text-preset-3-mobile'>Best:</span>{" "}
          <span className='text-neutral-0 md:text-preset-4 text-preset-3-mobile'>
            {personalBest} wpm
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
