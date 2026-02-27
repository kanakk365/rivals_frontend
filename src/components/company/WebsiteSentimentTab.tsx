"use client";

import { Globe } from "lucide-react";

interface WebsiteSentimentTabProps {
  companySlug: string;
}

export default function WebsiteSentimentTab({
  companySlug: _companySlug,
}: WebsiteSentimentTabProps) {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent w-fit">
            Website Sentiment Analysis
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sentiment analysis and insights for website content
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Globe className="h-12 w-12 mb-4 opacity-20" />
        <p>Sentiment analysis content will appear here.</p>
      </div>
    </div>
  );
}
