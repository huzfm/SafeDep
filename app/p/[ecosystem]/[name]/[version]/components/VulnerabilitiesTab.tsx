import { RiskBadge } from "./RiskBadge";

export function VulnerabilitiesTab({ insight }: { insight: any }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Vulnerability ID
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Summary
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Risk
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Published
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Modified
            </th>
          </tr>
        </thead>
        <tbody>
          {insight.vulnerabilities.map((v: any, i: number) => (
            <tr
              key={i}
              className="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <td className="py-3 px-4 font-medium text-slate-900 text-xs">
                {v.id?.value}
              </td>
              <td className="py-3 px-4 text-slate-700 max-w-xs truncate">
                {v.summary}
              </td>
              <td className="py-3 px-4">
                <RiskBadge risk={v.severities?.[0]?.risk} />
              </td>
              <td className="py-3 px-4 text-slate-600 text-xs">
                {new Date(v.publishedAt).toLocaleDateString("en-GB", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td className="py-3 px-4 text-slate-600 text-xs">
                {new Date(v.modifiedAt).toLocaleDateString("en-GB", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
