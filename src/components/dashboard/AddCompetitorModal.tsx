"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Globe, Building2, CheckCircle2, Clock, Play, SkipForward, XCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScrapingStore, ScrapeJob } from "@/store/scrapingStore";
import { useCompaniesStore } from "@/store/companiesStore";

interface AddCompetitorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const JOB_LABELS: Record<string, string> = {
    company_scraper: "Company Info",
    instagram_scraper: "Instagram Profile",
    twitter_scraper: "Twitter/X Profile",
    youtube_scraper: "YouTube Profile",
    facebook_scraper: "Facebook Profile",
    linkedin_scraper: "LinkedIn Profile",
    instagram_posts: "Instagram Posts",
    twitter_posts: "Twitter/X Posts",
    youtube_posts: "YouTube Posts",
    facebook_posts: "Facebook Posts",
    linkedin_posts: "LinkedIn Posts",
    reddit_sentiment: "Reddit Sentiment",
    trustpilot_reviews: "Trustpilot Reviews",
    google_reviews: "Google Reviews",
    keyword_search: "Keyword Research",
    yelp_reviews: "Yelp Reviews",
    word_frequency_analysis: "Word Frequency",
    financial_data: "Financial Data",
    fundraising_data: "Fundraising Data",
    google_news: "Google News",
    hiring_activity: "Hiring Activity",
    word_count: "Word Count",
    revenue_data: "Revenue Data",
    semrush_seo: "SEO Analysis",
    pickleball_pricing: "Pricing Data",
};

// Group jobs into categories for cleaner display
const JOB_GROUPS = [
    {
        label: "Company Profile",
        scripts: ["company_scraper"],
    },
    {
        label: "Social Media",
        scripts: ["instagram_scraper", "twitter_scraper", "youtube_scraper", "facebook_scraper", "linkedin_scraper"],
    },
    {
        label: "Social Posts",
        scripts: ["instagram_posts", "twitter_posts", "youtube_posts", "facebook_posts", "linkedin_posts"],
    },
    {
        label: "Reviews & Sentiment",
        scripts: ["reddit_sentiment", "trustpilot_reviews", "google_reviews", "yelp_reviews", "word_frequency_analysis", "word_count"],
    },
    {
        label: "Financial & Market",
        scripts: ["financial_data", "fundraising_data", "revenue_data"],
    },
    {
        label: "Digital Presence",
        scripts: ["keyword_search", "semrush_seo", "google_news", "hiring_activity", "pickleball_pricing"],
    },
];

function StatusIcon({ status }: { status: ScrapeJob["status"] }) {
    switch (status) {
        case "completed":
            return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
        case "completed_no_data":
            return <CheckCircle2 className="h-4 w-4 text-yellow-500 shrink-0" />;
        case "running":
            return <Loader2 className="h-4 w-4 text-blue-500 animate-spin shrink-0" />;
        case "pending":
            return <Clock className="h-4 w-4 text-muted-foreground shrink-0" />;
        case "skipped":
            return <SkipForward className="h-4 w-4 text-muted-foreground/50 shrink-0" />;
        case "failed":
            return <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
        default:
            return <Clock className="h-4 w-4 text-muted-foreground shrink-0" />;
    }
}

function statusColor(status: ScrapeJob["status"]): string {
    switch (status) {
        case "completed": return "text-emerald-600";
        case "completed_no_data": return "text-yellow-600";
        case "running": return "text-blue-500";
        case "failed": return "text-red-500";
        case "skipped": return "text-muted-foreground/50";
        default: return "text-muted-foreground";
    }
}

export default function AddCompetitorModal({ isOpen, onClose }: AddCompetitorModalProps) {
    const [brandName, setBrandName] = useState("");
    const [domain, setDomain] = useState("");
    const [phase, setPhase] = useState<"form" | "progress" | "done">("form");
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const router = useRouter();
    const stopPollingRef = useRef<(() => void) | null>(null);

    const { startScraping, isLoading, completionStatus, startPolling, resetScraping } = useScrapingStore();
    const { fetchCompanies } = useCompaniesStore();

    // Clean up polling on close
    useEffect(() => {
        if (!isOpen) {
            stopPollingRef.current?.();
            stopPollingRef.current = null;
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brandName.trim() || !domain.trim()) return;

        const result = await startScraping(brandName.trim(), domain.trim());

        if (result.success && result.slug) {
            setPhase("progress");

            // Refresh companies in sidebar immediately so it appears
            fetchCompanies();

            // Start polling the completion-status endpoint
            const stopPolling = startPolling(domain.trim(), () => {
                // Jobs are complete — refresh companies again in case it failed early initially
                fetchCompanies();
                setPhase("done");
            });

            stopPollingRef.current = stopPolling;
        }
    };

    const handleGoToDashboard = (slug: string) => {
        handleClose();
        router.push(`/dashboard/company/${slug}`);
    };

    const handleClose = () => {
        if (isLoading) return;
        // Stop polling if active
        stopPollingRef.current?.();
        stopPollingRef.current = null;
        
        // Ensure sidebar is updated if we closed during progress
        if (phase !== "form") {
            fetchCompanies();
        }

        // Reset state
        setBrandName("");
        setDomain("");
        setPhase("form");
        setExpandedGroups(new Set());
        resetScraping();
        onClose();
    };

    const toggleGroup = (label: string) => {
        setExpandedGroups(prev => {
            const next = new Set(prev);
            if (next.has(label)) next.delete(label);
            else next.add(label);
            return next;
        });
    };

    // Map jobs by script_type for O(1) lookup
    const jobMap = new Map<string, ScrapeJob>(
        (completionStatus?.jobs || []).map(j => [j.script_type, j])
    );

    const slug = brandName.trim().toLowerCase().replace(/\s+/g, "-");
    const pct = completionStatus?.completion_percentage ?? 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-101 w-full max-w-lg max-h-[90vh] flex flex-col"
                    >
                        <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            {/* Header */}
                            <div className="relative px-6 py-5 border-b border-border shrink-0">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-linear-to-br from-purple-500 to-blue-500">
                                            {phase === "done" ? <CheckCircle2 className="h-5 w-5 text-white" /> : <Plus className="h-5 w-5 text-white" />}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground">
                                                {phase === "form" ? "Add Competitor" : phase === "progress" ? "Analysing..." : "Analysis Complete!"}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {phase === "form"
                                                    ? "Start tracking a new competitor"
                                                    : phase === "progress"
                                                        ? `${brandName} · ${pct}% complete`
                                                        : `${brandName} data is now ready`}
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

                            {/* --- PHASE: FORM --- */}
                            {phase === "form" && (
                                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="brand-name" className="text-sm font-medium text-foreground flex items-center gap-2">
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

                                    <div className="space-y-2">
                                        <label htmlFor="domain" className="text-sm font-medium text-foreground flex items-center gap-2">
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

                                    <button
                                        type="submit"
                                        disabled={isLoading || !brandName.trim() || !domain.trim()}
                                        className="w-full py-3 px-4 rounded-lg bg-linear-to-r from-purple-600 to-blue-600
                    text-white font-medium transition-all hover:from-purple-700 hover:to-blue-700
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 text-white" />
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
                            )}

                            {/* --- PHASE: PROGRESS --- */}
                            {(phase === "progress" || phase === "done") && completionStatus && (
                                <div className="flex flex-col overflow-hidden">
                                    {/* Progress bar */}
                                    <div className="px-6 pt-5 pb-4 shrink-0">
                                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                            <span>{completionStatus.completed_jobs + completionStatus.completed_no_data_jobs} of {completionStatus.total_jobs} jobs done</span>
                                            <span className="font-medium text-foreground">{pct}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-linear-to-r from-purple-500 to-blue-500 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>

                                        {/* Stats row */}
                                        <div className="flex items-center gap-4 mt-3 text-xs">
                                            <span className="flex items-center gap-1 text-emerald-600">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                {completionStatus.completed_jobs} done
                                            </span>
                                            <span className="flex items-center gap-1 text-blue-500">
                                                <Play className="h-3.5 w-3.5" />
                                                {completionStatus.running_jobs} running
                                            </span>
                                            <span className="flex items-center gap-1 text-muted-foreground">
                                                <Clock className="h-3.5 w-3.5" />
                                                {completionStatus.pending_jobs} pending
                                            </span>
                                            {completionStatus.failed_jobs > 0 && (
                                                <span className="flex items-center gap-1 text-red-500">
                                                    <XCircle className="h-3.5 w-3.5" />
                                                    {completionStatus.failed_jobs} failed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Scrollable job list — grouped */}
                                    <div className="overflow-y-auto flex-1 divide-y divide-border/50 px-2 pb-2" style={{ maxHeight: "340px" }}>
                                        {JOB_GROUPS.map((group) => {
                                            const groupJobs = group.scripts.map(s => jobMap.get(s)).filter((j): j is ScrapeJob => Boolean(j) && j!.status !== "skipped");
                                            if (groupJobs.length === 0) return null;

                                            const isExpanded = expandedGroups.has(group.label);
                                            const doneCount = groupJobs.filter(j => j.status === "completed" || j.status === "completed_no_data").length;
                                            const allDone = doneCount === groupJobs.length;

                                            return (
                                                <div key={group.label} className="py-1">
                                                    <button
                                                        onClick={() => toggleGroup(group.label)}
                                                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-accent/50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {allDone ? (
                                                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                                            ) : (
                                                                <Loader2 className="h-4 w-4 text-blue-500 animate-spin shrink-0" />
                                                            )}
                                                            <span className="text-sm font-medium text-foreground">{group.label}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-muted-foreground">{doneCount}/{groupJobs.length}</span>
                                                            {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                                        </div>
                                                    </button>

                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="space-y-1 px-4 pb-2 pt-1">
                                                                    {groupJobs.map((job) => (
                                                                        <div key={job.job_id} className="flex items-center gap-3 py-1.5 pl-4">
                                                                            <StatusIcon status={job.status} />
                                                                            <span className="text-sm text-foreground flex-1">
                                                                                {JOB_LABELS[job.script_type] || job.script_type}
                                                                            </span>
                                                                            <span className={`text-xs capitalize ${statusColor(job.status)}`}>
                                                                                {job.status.replace("_", " ")}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Footer message */}
                                    {phase === "done" ? (
                                        <div className="px-6 py-4 border-t border-border shrink-0 flex gap-3">
                                            <button
                                                onClick={handleClose}
                                                className="flex-1 py-2.5 px-4 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
                                            >
                                                Close
                                            </button>
                                            <button
                                                onClick={() => handleGoToDashboard(slug)}
                                                className="flex-1 py-2.5 px-4 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all cursor-pointer"
                                            >
                                                View Dashboard →
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="px-6 py-4 border-t border-border shrink-0">
                                            <p className="text-xs text-muted-foreground text-center">
                                                {completionStatus.message}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Waiting for first status response */}
                            {phase === "progress" && !completionStatus && (
                                <div className="flex flex-col items-center justify-center py-16 gap-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
                                    <p className="text-sm text-muted-foreground">Starting analysis for <span className="font-medium text-foreground">{brandName}</span>...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
