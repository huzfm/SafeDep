export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createPromiseClient, Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

/* ------------------ Auth ------------------ */

function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  };
}

/* ---------------- Ecosystem map ---------------- */

function mapEcosystem(value: string): Ecosystem {
  switch (value.toLowerCase()) {
    case "npm":
      return Ecosystem.NPM;
    case "pypi":
      return Ecosystem.PYPI;
    case "maven":
      return Ecosystem.MAVEN;
    case "golang":
      return Ecosystem.GO;
    default:
      throw new Error(`Unsupported ecosystem: ${value}`);
  }
}

/* ---------------- Page ---------------- */

interface PageProps {
  params: Promise<{
    ecosystem: string;
    name: string;
    version: string;
  }>;
}

export default async function PackagePage(props: PageProps) {
  const { ecosystem, name, version } = await props.params;

  const token = process.env.SAFEDEP_API_KEY;
  const tenant = process.env.SAFEDEP_TENANT_ID;
  if (!token || !tenant) throw new Error("Missing SAFEDEP env vars");

  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenant)],
  });

  const client = createPromiseClient(InsightService, transport);

  const res = await client.getPackageVersionInsight({
    packageVersion: {
      package: { ecosystem: mapEcosystem(ecosystem), name },
      version,
    },
  });

  const data = res.toJson();
  const insight = data.insight;

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-12">
      {/* ---------------- Header ---------------- */}
      <header>
        <h1 className="text-3xl font-bold">
          {name}@{version}
        </h1>
        <p className="text-gray-500">
          Published: {new Date(insight.packagePublishedAt).toDateString()}
        </p>
      </header>

      {/* ---------------- Summary ---------------- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Vulnerabilities"
          value={insight.vulnerabilities?.length || 0}
        />
        <SummaryCard
          label="Licenses"
          value={insight.licenses?.licenses?.length || 0}
        />
        <SummaryCard
          label="Dependencies"
          value={insight.dependencies?.length || 0}
        />
        <SummaryCard
          label="OpenSSF Score"
          value={insight.projectInsights?.[0]?.scorecard?.score ?? "N/A"}
        />
      </section>

      {/* ---------------- Vulnerabilities ---------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Vulnerabilities</h2>

        {insight.vulnerabilities?.length ? (
          <div className="space-y-4">
            {insight.vulnerabilities.map((v: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <div className="font-semibold text-lg">{v.id?.value}</div>
                  <RiskBadge risk={v.severities?.[0]?.risk} />
                </div>

                <p className="text-gray-700">{v.summary}</p>

                <div className="text-sm text-gray-600">
                  <p>
                    <b>Aliases:</b>{" "}
                    {v.aliases?.map((a: any) => a.value).join(", ")}
                  </p>
                  <p>
                    <b>Published:</b> {new Date(v.publishedAt).toDateString()}
                  </p>
                  <p>
                    <b>Modified:</b> {new Date(v.modifiedAt).toDateString()}
                  </p>
                </div>

                {v.severities?.map((s: any, idx: number) => (
                  <div key={idx} className="text-xs bg-gray-100 rounded p-2">
                    <b>{s.type.replace("TYPE_", "")}</b>: {s.score}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-600">No known vulnerabilities 🎉</p>
        )}
      </section>

      {/* ---------------- Verification ---------------- */}
      {insight.projectInsights?.[0]?.scorecard && (
        <section>
          <h2 className="text-2xl font-semibold mb-3">Verification & Trust</h2>

          <div className="border rounded-xl p-4 mb-4">
            <p>
              <b>Repo:</b> {insight.projectInsights[0].project.name}
            </p>
            <p>
              <b>Score:</b> {insight.projectInsights[0].scorecard.score}/10
            </p>
          </div>

          <div className="space-y-3">
            {insight.projectInsights[0].scorecard.checks.map(
              (c: any, i: number) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">{c.name}</div>
                    {typeof c.score === "number" && (
                      <span className="text-sm px-2 py-1 rounded bg-gray-200">
                        {c.score}/10
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{c.reason}</p>
                  {c.documentation?.url && (
                    <a
                      href={c.documentation.url}
                      target="_blank"
                      className="text-xs text-blue-600 underline"
                    >
                      Documentation
                    </a>
                  )}
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* ---------------- Licenses ---------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Licenses</h2>
        <div className="flex gap-2 flex-wrap">
          {insight.licenses?.licenses?.map((l: any, i: number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-gray-200 text-sm"
            >
              {l.licenseId}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- Dependencies ---------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">
          Direct Dependencies ({insight.dependencies?.length})
        </h2>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {insight.dependencies?.map((d: any, i: number) => (
            <li key={i} className="border rounded-lg px-3 py-2">
              <span className="font-medium">{d.package.name}</span>
              <span className="text-gray-500"> @{d.version}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Versions ---------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Available Versions</h2>

        <div className="max-h-72 overflow-auto border rounded-xl p-3 text-sm">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {insight.availableVersions?.map((v: any, i: number) => (
              <li key={i}>{v.version}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

/* ---------------- UI Helpers ---------------- */

function SummaryCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="p-4 border rounded-xl">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function RiskBadge({ risk }: { risk?: string }) {
  if (!risk) return null;

  const color = risk.includes("CRITICAL")
    ? "bg-red-100 text-red-800"
    : risk.includes("HIGH")
    ? "bg-orange-100 text-orange-800"
    : risk.includes("MEDIUM")
    ? "bg-yellow-100 text-yellow-800"
    : "bg-green-100 text-green-800";

  return (
    <span className={`text-xs px-2 py-1 rounded ${color}`}>
      {risk.replace("RISK_", "")}
    </span>
  );
}
