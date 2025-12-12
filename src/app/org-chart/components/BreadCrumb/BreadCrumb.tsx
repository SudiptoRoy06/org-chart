"use client";
import React from "react";
import Link from "next/link";
import classes from "./BreadCrumb.module.css";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter((x) => x);
    
    const items = [{ label: "Home", href: "/org-chart" }];
    
    let parentSegments = [...segments];
    if (segments.length > 1) {
      parentSegments = segments.slice(0, -1);
    }
    parentSegments.forEach((segment, index) => {
      const href = "/" + parentSegments.slice(0, index + 1).join("/");
      items.push({
        label: decodeURIComponent(
          segment.charAt(0).toUpperCase() + segment.slice(1)
        ),
        href,
      });
    });

    return items;
  };

  const items = generateBreadcrumbs();

  return (
    <div className={classes["hero-content"]}>
      <div className={classes.frame}>
        <div className={classes["breadcrumb-wrapper"]}>
          <div className={classes.breadcrumb}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <React.Fragment key={index}>
                  <div className={classes["div-wrapper"]}>
                    {isLast ? (
                      <div className={classes["text-wrapper"]}>
                        {item.label}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        style={{ color: "#4595d8" }}
                        className={classes["text-wrapper"]}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>

                  {!isLast && (
                    <div className={classes["img"]}>
                      <svg
                        width="6"
                        height="12"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.733242 0.822352C0.990972 0.574168 1.40779 0.574168 1.66489 0.822352L7.11412 6.08131C7.2361 6.19724 7.33323 6.33676 7.3996 6.49139C7.46597 6.64603 7.5002 6.81255 7.5002 6.98082C7.5002 7.1491 7.46597 7.31562 7.3996 7.47025C7.33323 7.62489 7.2361 7.76441 7.11412 7.88033L1.62543 13.1781C1.50087 13.2965 1.3359 13.3631 1.16405 13.3642C0.992196 13.3654 0.826335 13.3012 0.700151 13.1845C0.637641 13.1269 0.587625 13.057 0.553201 12.9793C0.518776 12.9016 0.500675 12.8176 0.500019 12.7326C0.499362 12.6476 0.516165 12.5633 0.549386 12.4851C0.582606 12.4068 0.631538 12.3362 0.693151 12.2777L5.71666 7.43042C5.77769 7.37245 5.8263 7.30267 5.85952 7.22533C5.89273 7.14798 5.90986 7.06468 5.90986 6.98051C5.90986 6.89633 5.89273 6.81303 5.85952 6.73568C5.8263 6.65834 5.77769 6.58856 5.71666 6.53059L0.733242 1.72154C0.672221 1.66363 0.623626 1.59391 0.590419 1.51661C0.557212 1.43932 0.540086 1.35607 0.540086 1.27195C0.540086 1.18782 0.557212 1.10458 0.590419 1.02728C0.623626 0.949987 0.672221 0.880262 0.733242 0.822352Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
