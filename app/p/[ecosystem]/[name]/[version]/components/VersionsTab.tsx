import { Badge } from "@/components/ui/badge";

interface VersionItem {
  version: string;
  publishedAt?: string;
}

interface VersionsInsight {
  availableVersions?: VersionItem[];
}

export function VersionsTab({ insight }: { insight: VersionsInsight }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-300">
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Version
            </th>
            <th className="px-4 py-3 text-right pr-30 font-semibold text-slate-700">
              Published
            </th>
          </tr>
        </thead>

        <tbody>
          {insight.availableVersions?.map((v, i) => (
            <tr key={i} className="border-b border-slate-200 align-middle">
              {}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {v.version}
                  </span>

                  {i === 0 && (
                    <Badge className="bg-teal-100 text-teal-800 text-xs px-2 py-1 border-0 rounded-md">
                      Latest
                    </Badge>
                  )}
                </div>
              </td>

              {}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end">
                  <span className="text-black font-bold text-xs whitespace-nowrap">
                    {v.publishedAt
                      ? new Date(v.publishedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>

                  <a
                    href="#"
                    className="ml-8 text-teal-600 font-medium text-xs"
                  >
                    View version
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
