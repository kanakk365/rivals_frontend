"use client";

import { motion } from "motion/react";

function SkeletonPulse({ className }: { className?: string }) {
    return (
        <motion.div
            className={`bg-muted/50 rounded-lg ${className}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

export default function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <SkeletonPulse className="h-9 w-64" />
                    <SkeletonPulse className="h-5 w-96" />
                </div>

                {/* Tabs Skeleton */}
                <div className="border-b border-border pb-4">
                    <div className="flex gap-4">
                        <SkeletonPulse className="h-10 w-24" />
                        <SkeletonPulse className="h-10 w-36" />
                        <SkeletonPulse className="h-10 w-32" />
                        <SkeletonPulse className="h-10 w-24" />
                    </div>
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="p-6 rounded-xl border border-border bg-card"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <SkeletonPulse className="h-10 w-10 rounded-lg" />
                            <SkeletonPulse className="h-5 w-16" />
                        </div>
                        <SkeletonPulse className="h-8 w-20 mb-2" />
                        <SkeletonPulse className="h-4 w-28" />
                    </div>
                ))}
            </div>

            {/* Charts Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-6">
                        <SkeletonPulse className="h-6 w-40" />
                        <SkeletonPulse className="h-8 w-24" />
                    </div>
                    <SkeletonPulse className="h-64 w-full" />
                </div>

                {/* Chart 2 */}
                <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-6">
                        <SkeletonPulse className="h-6 w-36" />
                        <SkeletonPulse className="h-8 w-24" />
                    </div>
                    <SkeletonPulse className="h-64 w-full" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-6">
                    <SkeletonPulse className="h-6 w-48" />
                    <SkeletonPulse className="h-10 w-32" />
                </div>
                <div className="space-y-4">
                    {/* Table Header */}
                    <div className="flex gap-4 pb-4 border-b border-border">
                        <SkeletonPulse className="h-5 w-1/4" />
                        <SkeletonPulse className="h-5 w-1/4" />
                        <SkeletonPulse className="h-5 w-1/4" />
                        <SkeletonPulse className="h-5 w-1/4" />
                    </div>
                    {/* Table Rows */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4 py-3">
                            <SkeletonPulse className="h-5 w-1/4" />
                            <SkeletonPulse className="h-5 w-1/4" />
                            <SkeletonPulse className="h-5 w-1/4" />
                            <SkeletonPulse className="h-5 w-1/4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Loading Message */}
            <div className="fixed bottom-6 right-6 z-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl"
                >
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="text-sm font-medium">Analyzing competitor data...</span>
                </motion.div>
            </div>
        </div>
    );
}
