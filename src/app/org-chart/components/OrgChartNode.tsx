"use client";
import { useAppDispatch } from "@/redux/hooks";
import type { EmployeeNode } from "@/lib/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { setSelectedEmployee } from "@/redux/slices/orgChartSlice";
import { Avatar, Paper, Typography, Box, IconButton } from "@mui/material";
import React, { useRef, useState, useLayoutEffect, useCallback } from "react";


export default function OrgChartNode({ employee, minimap }: { employee: EmployeeNode; minimap?: boolean }) {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(true);

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const childrenWrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const childRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const setChildRef = useCallback((id: number) => (el: HTMLDivElement | null) => {
    childRefs.current[id] = el;
  }, []);

  const hasChildren = employee.children && employee.children.length > 0;
  
  const computePaths = useCallback(() => {
    const parent = nodeRef.current;
    const wrap = childrenWrapRef.current;
    if (!parent || !wrap || !svgRef.current) return [];

    const wrapRect = wrap.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const parentX = parentRect.left + parentRect.width / 2 - wrapRect.left;
    const parentY = parentRect.bottom - wrapRect.top;

    const paths: string[] = [];

    for (const child of employee.children || []) {
      const childEl = childRefs.current[child.employee_id];
      if (!childEl) continue;
      const childRect = childEl.getBoundingClientRect();
      const childX = childRect.left + childRect.width / 2 - wrapRect.left;
      const childY = childRect.top - wrapRect.top;
      
      const dx = childX - parentX;
      const dy = childY - parentY;
      const cpx1 = parentX;
      const cpy1 = parentY + Math.max(20, dy * 0.35);
      const cpx2 = childX;
      const cpy2 = childY - Math.max(20, dy * 0.35);

      const d = `M ${parentX} ${parentY} C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${childX} ${childY}`;
      paths.push(d);
    }

    return paths;
  }, [employee.children]);
  
  const [paths, setPaths] = useState<string[]>([]);
  useLayoutEffect(() => {
    const update = () => setPaths(computePaths());
    update();

    const ro = new ResizeObserver(update);
    if (nodeRef.current) ro.observe(nodeRef.current);
    if (childrenWrapRef.current) ro.observe(childrenWrapRef.current);
    for (const k of Object.keys(childRefs.current)) {
      const el = childRefs.current[Number(k)];
      if (el) ro.observe(el);
    }
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [computePaths]);
  
  if (minimap) {
    return (
      <div className="flex items-center justify-center">
        <div style={{ width: 160, height: 40, borderRadius: 6, background: "#fff", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: "#ddd", marginRight: 8 }} />
          <div style={{ fontSize: 9, color: "#374151" }}>{employee.target}</div>
        </div>
        {employee.children && employee.children.length > 0 && (
          <div style={{ marginLeft: 12, display: "flex", gap: 8 }}>
            {employee.children.map(c => (
              <div key={c.employee_id} style={{ width: 120, height: 32, background: "#fff", border: "1px solid #eee", borderRadius: 6 }} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative">
      <div ref={nodeRef}>
        <Paper
          elevation={1}
          onClick={() => dispatch(setSelectedEmployee(employee))}
          sx={{
            px: 3,
            py: 2,
            borderRadius: 2,
            minWidth: { xs: 140, md: 220 },
            textAlign: "left",
            cursor: "pointer",
            transition: "transform 180ms ease, box-shadow 180ms ease",
            "&:hover": { transform: "translateY(-4px)" }
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar src={employee.pic} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography fontWeight={700} sx={{ fontSize: { xs: 12, md: 16 } }}>{employee.target}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 10, md: 13 } }}>{employee.relationship_id ?? ""}</Typography>
            </Box>
            {hasChildren && (
              <IconButton
                aria-label="toggle"
                onClick={(e) => { e.stopPropagation(); setExpanded(s => !s); }}
                sx={{ ml: "auto" }}
              >
                {expanded ? <ChevronDown /> : <ChevronRight />}
              </IconButton>
            )}
          </Box>
        </Paper>
      </div>

      {/* Children + SVG overlay */}
      {hasChildren && expanded && (
        <div ref={childrenWrapRef} className="relative mt-6 w-full min-w-max flex justify-center px-4">
          <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
            <g stroke="#d1d5db" strokeWidth={1.6} fill="none" strokeLinecap="round">
              {paths.map((p, i) => <path key={i} d={p} />)}
            </g>
          </svg>

          <div className="flex gap-8">
            {employee.children.map(child => (
              <div key={child.employee_id} ref={setChildRef(child.employee_id)} className="flex flex-col items-center">
                <div style={{ height: 8 }} />
                <OrgChartNode employee={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
