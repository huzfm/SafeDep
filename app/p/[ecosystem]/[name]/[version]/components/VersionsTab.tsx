import { Badge } from "@/components/ui/badge";

export function VersionsTab({ insight }: { insight: any }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Version
            </th>
            <th className="text-right py-3 px-4 font-semibold text-slate-700">
              Published On
            </th>
          </tr>
        </thead>
        <tbody>
          {insight.availableVersions?.map((v: any, i: number) => (
            <tr
              key={i}
              className="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">
                    {v.version}
                  </span>
                  {i === 0 && (
                    <Badge className="bg-teal-100 text-teal-800 text-xs px-2 py-1 border-0">
                      Latest
                    </Badge>
                  )}
                </div>
              </td>

              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <span className="text-slate-600 text-xs">
                    {v.publishedAt
                      ? new Date(v.publishedAt).toLocaleDateString("en-GB", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "N/A"}
                  </span>

                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-700 font-medium text-xs"
                  >
                    View Version
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
