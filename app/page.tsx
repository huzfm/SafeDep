import { getInsights } from "./actions/getInsights";

export default async function Page() {
  const data = await getInsights();

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Safedep Insight</h1>
      <pre className="text-sm bg-black text-green-400 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
