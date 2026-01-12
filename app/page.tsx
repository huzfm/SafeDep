export default async function Page() {
  return (
    <main className="min-h-screen bg-[#E2E8F0] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            SafeDep Package Insight
          </h1>
        </div>

        {/* How it works */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Dynamic Route Format
          </h2>

          <pre className="bg-slate-900 text-green-400 text-sm rounded-lg p-4 overflow-x-auto">
            {`/p/{ecosystem}/{package-name}/{version}`}
          </pre>

          <p className="text-slate-600 mt-3">
            Replace the values with the ecosystem, package name, and version you
            want to inspect.
          </p>
        </div>

        {/* Examples */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Example URLs
          </h2>

          <ul className="space-y-2 text-sm">
            <li className="font-mono text-slate-800">/p/npm/react/18.2.0</li>
            <li className="font-mono text-slate-800">
              /p/pypi/requests/2.31.0
            </li>

            <li className="font-mono text-slate-800">
              /p/rubygems/rails/7.1.3
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
