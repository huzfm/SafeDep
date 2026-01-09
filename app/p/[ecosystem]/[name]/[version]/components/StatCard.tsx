import React from "react";

export function StatCard({
  icon,
  label,
  value,
  color,
  style,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="flex flex-col gap-1 text-left ">
      {}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>{icon}</span>
        <span className="font-bold text-[16px]">{label}</span>
      </div>

      {}
      <div
        className={`text-2xl leading-loose font-black  ${color ?? ""} mt-8`}
        style={style}
      >
        {value}
      </div>
    </div>
  );
}
