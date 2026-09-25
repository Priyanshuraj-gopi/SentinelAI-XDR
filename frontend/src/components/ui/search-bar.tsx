import React, { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onFilterClick?: () => void;
  quickFilters?: string[];
  onSelectQuickFilter?: (filter: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search alerts, entities, MITRE IDs, IOCs (e.g. severity:critical T1059)...",
  value = "",
  onChange,
  onFilterClick,
  quickFilters = ["severity:critical", "source:crowdstrike", "tactic:execution", "suppressed:false"],
  onSelectQuickFilter,
  className,
}: SearchBarProps) {
  const [internalVal, setInternalVal] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalVal(val);
    onChange?.(val);
  };

  const handleClear = () => {
    setInternalVal("");
    onChange?.("");
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={internalVal}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-9 pl-9 pr-20 rounded-md border border-slate-700/80 bg-[#0a0f1d] text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {internalVal && (
            <button
              onClick={handleClear}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {onFilterClick && (
            <button
              onClick={onFilterClick}
              className="p-1 rounded text-slate-400 hover:text-blue-400 hover:bg-slate-800"
              title="Open Advanced Filters"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800/80 text-[10px] font-mono text-slate-400">
            ⌘K
          </span>
        </div>
      </div>

      {quickFilters && quickFilters.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono select-none py-0.5">
          <span className="text-slate-400 text-[10px] uppercase font-semibold">Quick Filters:</span>
          {quickFilters.map((qf) => (
            <button
              key={qf}
              onClick={() => onSelectQuickFilter?.(qf)}
              className="px-2 py-0.5 rounded bg-slate-800/70 hover:bg-blue-900/30 text-slate-300 hover:text-blue-300 border border-slate-700 hover:border-blue-600/50 transition-colors"
            >
              {qf}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
