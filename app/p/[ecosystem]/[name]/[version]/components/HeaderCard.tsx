import Image from "next/image";
import { StatCard } from "./StatCard";
import { Award, BookMarked, Bug, Earth, Github, Info } from "lucide-react";

interface HeaderInsight {
  packagePublishedAt: string | number;
  registries?: string[];
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

function joinUrl(base: string, path: string) {
  if (!base) return path;
  if (!path) return base;
  return base.endsWith("/") ? base + path : `${base}/${path}`;
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
  const source = insight.registries?.[0]
    ? joinUrl(insight.registries[0], name)
    : null;

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-thin text-slate-400 uppercase tracking-wider">
            powered by
          </span>

          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SafeDep"
              width={30}
              height={24}
              className="object-contain"
            />
            <p className="font-bold text-2xl">SafeDep</p>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-sm text-xs font-semibold hover:bg-teal-700 transition">
          <Github width={14} height={14} />
          <span className="font-bold text-[15px]">Install GitHub App</span>
        </button>
      </div>

      {/* White card */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        {/* Package info */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Github className="border rounded-sm p-1" />
            <span className="text-xl font-bold text-slate-900">
              {name}@{version}
            </span>
          </div>

          <div className="text-[13px] space-y-1">
            <div>
              <span className="text-slate-500">Analyzed at </span>
              <span className="text-black font-black">
                {new Date(insight.packagePublishedAt).toLocaleDateString(
                  "en-GB"
                )}{" "}
                {new Date(insight.packagePublishedAt).toLocaleTimeString(
                  "en-GB"
                )}
              </span>
            </div>

            <div>
              <span className="text-slate-500">Source </span>
              {source ? (
                <a
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:underline break-all font-bold"
                >
                  {source}
                </a>
              ) : (
                <span className="text-slate-500">Unknown</span>
              )}
            </div>

            <div>
              <span className="text-slate-500">SHA256 </span>
              <span className="text-black font-bold">
                {insight.sha256 ?? "-------"}
              </span>
            </div>

            <div>
              <span className="text-slate-500">Confidence </span>
              <span className="text-black font-bold">
                {insight.confidence ?? "--------------------"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white border border-slate-200 rounded-sm p-4">
            <StatCard
              icon={
                <Info
                  height={25}
                  width={25}
                  className="text-[#009699] border-2 p-1 rounded-sm"
                />
              }
              label="Version"
              value={version}
              color="text-[#000]"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-4">
            <StatCard
              icon={
                <Bug
                  height={25}
                  width={25}
                  className="text-red-700 border-2 p-1 rounded-sm"
                />
              }
              label="Vulnerabilities"
              value={insight.vulnerabilities?.length || 0}
              color="text-[#000]"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-4">
            <StatCard
              icon={
                <BookMarked
                  height={25}
                  width={25}
                  className="text-[#009699] border-2 p-1 rounded-sm"
                />
              }
              label="OpenSSF Scorecard"
              value={
                insight.projectInsights?.[0]?.scorecard?.score !== undefined
                  ? `${Number(
                      insight.projectInsights[0].scorecard.score
                    ).toFixed(1)}/10`
                  : "N/A"
              }
              color="text-[#009689]"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-4">
            <StatCard
              icon={
                <Award
                  height={25}
                  width={25}
                  className="text-[#009699] border-2 p-1 rounded-sm"
                />
              }
              label="License"
              value={insight.licenses?.licenses?.[0]?.licenseId || "N/A"}
              color="text-[#000]"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-4">
            <StatCard
              icon={
                <Earth
                  height={25}
                  width={25}
                  className="text-[#009699] border-2 p-1 rounded-sm"
                />
              }
              label="Ecosystem"
              value={ecosystem === "golang" ? "Go" : ecosystem.toUpperCase()}
              color="text-[#000]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
