import { AlertTriangle, PackageSearch } from "lucide-react";
import Link from "next/link";

type ErrorStateProps = {
  title?: string;
  message: string;
  detail?: string;
};

export function ErrorState({
  title = "Something went wrong",
  message,
  detail,
}: ErrorStateProps) {
  return (
    <main className="min-h-screen bg-[#E2E8F0] p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="bg-slate-100 p-3 rounded-full">
            <AlertTriangle className="h-7 w-7 text-slate-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        <p className="text-slate-600 mt-3">{message}</p>

        {detail && (
          <p className="mt-4 text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-md px-4 py-2">
            {detail}
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <PackageSearch size={16} />
            Search another package
          </Link>
        </div>
      </div>
    </main>
  );
}
