"use client";

import React from "react";

export default function Minimap({ children, onClickCenter, scale }: {
  children: React.ReactNode;
  onClickCenter?: (x:number,y:number)=>void;
  scale?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !onClickCenter) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    onClickCenter(x, y);
  };

  return (
    <div className="bg-white border rounded-md p-1 shadow-sm" style={{ width: 200, height: 120 }}>
      <div ref={ref} onClick={handleClick} style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}
