import { cn } from "@/shared/libs/utils";
import searchIcon from "@/assets/search.png";
import { useState } from "react";
import type React from "react";

interface SearchInputProps {
  searchInput: string | undefined;
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder?: string;
}

export default function SearchInput({ searchInput, setSearchInput, placeholder }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showIcon = !isFocused && !searchInput;

  return (
    <div className="relative w-[300px] max-w-[300px]">
      {showIcon && (
        <div className="top-1/2 left-3 absolute -translate-y-1/2 pointer-events-none">
          <img src={searchIcon} alt="search" className="w-4 h-4 object-contain" />
        </div>
      )}
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "block bg-white disabled:opacity-50 h-9 pr-3 py-0 border-[3px] border-black rounded-none outline-none w-full text-xs font-bold placeholder:text-black/40 placeholder:italic placeholder:font-normal placeholder:text-xs appearance-none disabled:cursor-not-allowed text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all",
          showIcon ? "pl-10" : "pl-3"
        )}
      />
    </div>
  );
}
