"use client";

import { DeleteAccfromSwitch } from "@/HelperFun/DeleteAccformSwitch";
import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function SwitchAccDropD({
  id,
  setUsersData,
}: {
  id: string;
  setUsersData: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function handledelete() {
    const res = await DeleteAccfromSwitch(id);
    if (res?.success) {
      setUsersData((prev: any[]) => prev.filter((u) => u.id !== id));
    }
  }

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1 rounded-full text-text-muted hover:text-foreground hover:bg-card-border/40 transition cursor-pointer flex items-center justify-center"
        aria-label="Options"
      >
        <EllipsisVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-32 bg-card-bg border border-card-border rounded-xl shadow-lg z-50 py-1 overflow-hidden animate-fadeIn">
          <button
            onClick={() => {
              handledelete();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition cursor-pointer font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-indigo-soft/10 hover:text-foreground transition cursor-pointer font-medium"
          >
            None
          </button>
        </div>
      )}
    </div>
  );
}
