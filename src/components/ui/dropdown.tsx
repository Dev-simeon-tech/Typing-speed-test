import { useRef, useState, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import ListComponent from "./listComponent";

import ArrowIcon from "@/assets/images/icon-down-arrow.svg?react";

type DropdownProps<T> = {
  itemsArr: T[];
  currentItem: T;
  renderItem: (item: T, index: number) => React.ReactNode;
};

const Dropdown = <T,>({
  itemsArr,
  currentItem,
  renderItem,
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex gap-2 items-center justify-center border w-full  border-neutral-700 px-2.5 rounded-lg py-1.5'
      >
        <p className='capitalize text-preset-5'>{String(currentItem)}</p>
        <ArrowIcon
          className={`${isOpen ? "rotate-180" : ""} transition-transform`}
        />
      </button>
      <div
        role='listbox'
        aria-expanded={isOpen}
        className={` bg-neutral-800 z-20 w-full rounded-md divide-y top-10 divide-neutral-700  transition-all flex-col absolute ${
          isOpen ? "flex overflow-y-auto " : "hidden overflow-y-hidden"
        }`}
      >
        <ListComponent data={itemsArr} renderItem={renderItem} />
      </div>
    </div>
  );
};

export default Dropdown;
