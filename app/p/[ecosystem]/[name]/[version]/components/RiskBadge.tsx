export function RiskBadge({ risk }: { risk?: string }) {
  if (!risk) return null;

  const riskMap: Record<string, { color: string; label: string }> = {
    CRITICAL: {
      color: "bg-red-100 text-red-800",
      label: "Critical",
    },
    HIGH: {
      color: "bg-pink-100 text-pink-800",
      label: "High",
    },
    MEDIUM: {
      color: "bg-yellow-100 text-yellow-800",
      label: "Medium",
    },
    LOW: {
      color: "bg-blue-100 text-blue-800",
      label: "Low",
    },
    UNSPECIFIED: {
      color: "bg-slate-100 text-slate-600",
      label: "Unspecified",
    },
  };

  const riskType =
    Object.keys(riskMap).find((key) => risk.includes(key)) || "UNSPECIFIED";
  const style = riskMap[riskType];

  return (
    <div className="flex items-center ">
      <span className={`${style.color} px-2 py-1 rounded text-xs font-medium`}>
        {style.label}
      </span>
    </div>
  );
}
