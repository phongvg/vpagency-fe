import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";
import type React from "react";

interface SearchInputProps {
  searchInput: string | undefined;
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder?: string;
}

export default function SearchInput({ searchInput, setSearchInput, placeholder }: SearchInputProps) {
  return (
    <Input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      placeholder={placeholder}
      className='pr-4 pl-10 border-primary w-[300px] max-w-[300px]'
      icon={<Search size={18} />}
    />
  );
}
