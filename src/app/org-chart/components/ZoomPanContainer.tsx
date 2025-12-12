"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

export interface ZoomPanHandle {
  containerEl: HTMLDivElement | null;
  innerEl: HTMLDivElement | null;
  getSnapshot: () => { scrollLeft: number; scrollTop: number; scale: number };
}

export default forwardRef<ZoomPanHandle, {
  scale: number;
  setScale?: (n:number)=>void;
  children: React.ReactNode;
}>(({ scale, children }, ref) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    containerEl: outerRef.current,
    innerEl: innerRef.current,
    getSnapshot: () => ({
      scrollLeft: outerRef.current?.scrollLeft ?? 0,
      scrollTop: outerRef.current?.scrollTop ?? 0,
      scale,
    }),
  }));
  
  useEffect(() => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = `scale(${scale})`;
    innerRef.current.style.transformOrigin = "top center";
    innerRef.current.style.transition = "transform 200ms ease";
  }, [scale]);

  return (
    <div
      ref={outerRef}
      className="w-full h-full overflow-auto"
      style={{ touchAction: "pan-x pan-y" }}
    >
      <div
        ref={innerRef}
        className="inline-block min-w-max min-h-[200px] pb-20"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
});
