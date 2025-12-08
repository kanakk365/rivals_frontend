"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Globe, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScrapingStore } from "@/store/scrapingStore";

interface AddCompetitorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCompetitorModal({ isOpen, onClose }: AddCompetitorModalProps) {
    const [brandName, setBrandName] = useState("");
    const [domain, setDomain] = useState("");
    const router = useRouter();
    const { startScraping, isLoading } = useScrapingStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!brandName.trim() || !domain.trim()) {
            return;
        }

        const result = await startScraping(brandName.trim(), domain.trim());

        if (result.success && result.slug) {
            // Reset form and close modal
            setBrandName("");
            setDomain("");
            onClose();
            // Navigate to the new company page
            router.push(`/dashboard/company/${result.slug}`);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setBrandName("");
            setDomain("");
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
                    >
                        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="relative px-6 py-5 border-b border-border">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                                            <Plus className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground">
                                                Add Competitor
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Start tracking a new competitor
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        disabled={isLoading}
                                        className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <X className="h-5 w-5 text-muted-foreground" />
                                    </button>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Brand Name */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="brand-name"
                                        className="text-sm font-medium text-foreground flex items-center gap-2"
                                    >
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        Brand Name
                                    </label>
                                    <input
                                        id="brand-name"
                                        type="text"
                                        placeholder="e.g., Starbucks"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50
                      focus:border-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                </div>

                                {/* Domain */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="domain"
                                        className="text-sm font-medium text-foreground flex items-center gap-2"
                                    >
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        Domain
                                    </label>
                                    <input
                                        id="domain"
                                        type="text"
                                        placeholder="e.g., starbucks.com"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground
                      placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50
                      focus:border-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Enter the main website domain without http:// or www.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !brandName.trim() || !domain.trim()}
                                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 
                    text-white font-medium transition-all hover:from-purple-700 hover:to-blue-700
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {isLoading ? (
                                        <>
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
                                            Starting Analysis...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-5 w-5" />
                                            Add Competitor
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
