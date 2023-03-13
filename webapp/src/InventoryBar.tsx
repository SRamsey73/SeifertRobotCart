import React from 'react';

interface InventoryBarProps {
  icon: React.ReactElement;
  className?: string;
  totalCapacity: number;
  currentCapacity: number;
}

function InventoryBar({
  icon,
  className,
  totalCapacity,
  currentCapacity,
}: InventoryBarProps) {
  return (
    <div className="relative w-16">
      <div className="h-40 bg-slate-900 rounded-t-xl relative">
        <div className="bottom-0 w-full  bg-slate-400 rounded-t-xl absolute" style={{height: currentCapacity / totalCapacity * 100 + '%'}}></div>
      </div>
      {React.cloneElement(icon, {
        className:
          'w-full h-6 pt-2 pb-4 shadow-lg bg-slate-600 text-slate-200 rounded-b-full border-t-2 border-slate-200 box-content',
      })}
    </div>
  );
}

export default InventoryBar;
