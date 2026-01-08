import Image from "next/image";
import { StatCard } from "./StatCard";

interface HeaderInsight {
  packagePublishedAt: string | number;
  sha256?: string;
  confidence?: string | number;
  vulnerabilities?: unknown[];
  projectInsights?: {
    scorecard?: {
      score?: number;
    };
  }[];
  licenses?: {
    licenses?: {
      licenseId?: string;
    }[];
  };
}

export function HeaderCard({
  name,
  version,
  ecosystem,
  insight,
}: {
  name: string;
  version: string;
  ecosystem: string;
  insight: HeaderInsight;
}) {
  return (
    <div className="bg-white rounded-xl border-4 border-blue-500 p-6 shadow-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            powered by
          </span>

          <Image
            src="/logo.svg"
            alt="SafeDep"
            width={90}
            height={24}
            className="object-contain"
          />
        </div>

        <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-teal-700 transition">
          <span>Install GitHub App</span>
        </button>
      </div>

      {/* Package info */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold text-slate-900">
            {name}@{version}
          </span>
        </div>

        <div className="text-xs text-slate-500 space-y-1">
          <div>
            Analyzed at{" "}
            {new Date(insight.packagePublishedAt).toLocaleDateString("en-GB")}{" "}
            {new Date(insight.packagePublishedAt).toLocaleTimeString("en-GB")}
          </div>

          <div className="text-blue-600">
            Source https://registry.npmjs.org/{name}
          </div>

          <div>SHA256 {insight.sha256 ?? insight.packagePublishedAt}</div>
          <div>
            Confidence {insight.confidence ?? insight.packagePublishedAt}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard
          icon="●"
          label="Version"
          value={version}
          color="text-slate-700"
        />

        <StatCard
          icon="●"
          label="Vulnerabilities"
          value={insight.vulnerabilities?.length || 0}
          color="text-red-500"
        />

        <StatCard
          icon="◻"
          label="OpenSSF Scorecard"
          value={
            insight.projectInsights?.[0]?.scorecard?.score !== undefined
              ? `${Number(insight.projectInsights[0].scorecard.score).toFixed(
                  1
                )}/10`
              : "N/A"
          }
          color="text-teal-600"
        />

        <StatCard
          icon="◻"
          label="License"
          value={insight.licenses?.licenses?.[0]?.licenseId || "N/A"}
          color="text-slate-700"
        />

        <StatCard
          icon="◻"
          label="Ecosystem"
          value={ecosystem === "golang" ? "Go" : ecosystem.toUpperCase()}
          color="text-slate-700"
        />
      </div>
    </div>
  );
}
