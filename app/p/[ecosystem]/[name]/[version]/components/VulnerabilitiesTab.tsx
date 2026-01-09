import { RiskBadge } from "./RiskBadge";

interface VulnerabilityId {
  value?: string;
}

interface VulnerabilitySeverity {
  risk?: string;
}

interface VulnerabilityItem {
  id?: VulnerabilityId;
  summary?: string;
  severities?: VulnerabilitySeverity[];
  publishedAt?: string;
  modifiedAt?: string;
}

interface VulnerabilitiesInsight {
  vulnerabilities?: VulnerabilityItem[];
}

export function VulnerabilitiesTab({
  insight,
}: {
  insight: VulnerabilitiesInsight;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-300">
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Vulnerability ID
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Summary
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Risk
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Published
            </th>
          </tr>
        </thead>

        <tbody>
          {insight.vulnerabilities?.length ? (
            insight.vulnerabilities.map((v, i) => (
              <tr key={i} className="border-b border-slate-200 align-middle">
                {/* ID */}
                <td className="px-4 py-3 text-xs font-semibold text-slate-900 whitespace-nowrap">
                  {v.id?.value ?? "-"}
                </td>

                {/* Summary */}
                <td className="px-4 py-3 text-sm text-slate-800 leading-relaxed">
                  {v.summary ?? "-"}
                </td>

                {/* Risk */}
                <td className="px-4 py-3">
                  <RiskBadge risk={v.severities?.[0]?.risk} />
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                  {v.publishedAt
                    ? new Date(v.publishedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-slate-500 text-sm"
              >
                No vulnerabilities found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
