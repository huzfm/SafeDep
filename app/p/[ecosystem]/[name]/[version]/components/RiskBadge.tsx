export function RiskBadge({ risk }: { risk?: string }) {
  if (!risk) return null;

  const riskMap: Record<
    string,
    { color: string; label: string; dotColor: string }
  > = {
    CRITICAL: {
      color: "bg-red-100 text-red-800",
      label: "Critical",
      dotColor: "bg-red-500",
    },
    HIGH: {
      color: "bg-pink-100 text-pink-800",
      label: "High",
      dotColor: "bg-pink-500",
    },
    MEDIUM: {
      color: "bg-yellow-100 text-yellow-800",
      label: "Medium",
      dotColor: "bg-yellow-500",
    },
    LOW: {
      color: "bg-blue-100 text-blue-800",
      label: "Low",
      dotColor: "bg-blue-500",
    },
    UNSPECIFIED: {
      color: "bg-slate-100 text-slate-600",
      label: "Unspecified",
      dotColor: "bg-slate-400",
    },
  };

  const riskType =
    Object.keys(riskMap).find((key) => risk.includes(key)) || "UNSPECIFIED";
  const style = riskMap[riskType];

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${style.dotColor}`} />
      <span className={`${style.color} px-2 py-1 rounded text-xs font-medium`}>
        {style.label}
      </span>
    </div>
  );
}
