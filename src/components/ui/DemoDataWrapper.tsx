"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DemoDataWrapperProps {
    children: React.ReactNode;
    className?: string;

    enabled?: boolean;

    showBadge?: boolean;
}

export function DemoDataWrapper({
    children,
    className,
    enabled = true,
    showBadge = true,
}: DemoDataWrapperProps) {
    if (!enabled) {
        return <>{children}</>;
    }

    return (
        <div className={cn("relative", className)}>
            {/* Grayscale filter applied to the content */}
            <div className="grayscale opacity-60 pointer-events-auto">
                {children}
            </div>
        </div>
    );
}
