export function LicensesTab({ insight }: { insight: any }) {
  console.log(insight.licenseName);
  console.log(insight.licenseid);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              License ID
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              License Name
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Reference URL
            </th>
          </tr>
        </thead>
        <tbody>
          {insight.licenses?.licenses?.length ? (
            insight.licenses.licenses.map((l: any, i: number) => (
              <tr
                key={i}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="py-3 px-4 font-medium text-slate-900">
                  {l.licenseId}
                </td>
                <td className="py-3 px-4 text-slate-700">
                  {l.licenseName || "-"}
                </td>
                <td className="py-3 px-4">
                  {l.referenceUrl ? (
                    <a
                      href={l.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 text-xs"
                    >
                      {l.referenceUrl}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-3 px-4 text-slate-500">
                No licenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
