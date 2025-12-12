"use client";

import OrgChartNode from "./OrgChartNode";
import type { OrgChartResponse } from "@/lib/types";
import {
  TransformWrapper,
  TransformComponent
} from "react-zoom-pan-pinch";

export default function OrgChartTree({ data }: { data: OrgChartResponse }) {
  return (
    <div className="w-full h-[80vh] bg-gray-50 rounded-lg overflow-hidden cursor-grab relative">
      <TransformWrapper
        minScale={0.4}
        maxScale={2}
        initialScale={1}
        wheel={{ step: 0.1 }}
        pinch={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom Buttons */}
            <div className="absolute right-6 top-6 z-50 flex flex-col gap-2">
              <button
                onClick={() => zoomIn()}
                className="bg-white p-2 rounded shadow"
              >
                ➕
              </button>
              <button
                onClick={() => zoomOut()}
                className="bg-white p-2 rounded shadow"
              >
                ➖
              </button>
              <button
                onClick={() => resetTransform()}
                className="bg-white p-2 rounded shadow"
              >
                ⟳
              </button>
            </div>

            {/* Draggable + Zoomable canvas */}
            <TransformComponent>
              <div className="min-w-max flex justify-center py-10">
                <OrgChartNode employee={data.tree} />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
