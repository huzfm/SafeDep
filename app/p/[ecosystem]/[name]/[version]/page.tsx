export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createPromiseClient, type Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { HeaderCard } from "./components/HeaderCard";
import { OverviewTab } from "./components/OverviewTab";
import { VulnerabilitiesTab } from "./components/VulnerabilitiesTab";
import { VersionsTab } from "./components/VersionsTab";
import { LicensesTab } from "./components/LicensesTab";

function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  };
}

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
  const data = res.toJson() as unknown;

  if (!data || typeof data !== "object" || !("insight" in data)) {
    throw new Error("Invalid response from SafeDep API");
  }

  const insight = (data as { insight: any }).insight;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <HeaderCard
          name={name}
          version={version}
          ecosystem={ecosystem}
          insight={insight}
        />

        <div className="bg-white rounded-lg border border-slate-200">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b border-slate-200 bg-white p-0 rounded-none">
              <TabsTrigger
                value="overview"
                className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-slate-800 data-[state=active]:bg-transparent text-sm font-medium text-slate-600 data-[state=active]:text-slate-900"
              >
                Overview
              </TabsTrigger>

              {insight.vulnerabilities?.length > 0 && (
                <TabsTrigger
                  value="vulnerabilities"
                  className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-slate-800 data-[state=active]:bg-transparent text-sm font-medium text-slate-600 data-[state=active]:text-slate-900"
                >
                  Vulnerabilities
                </TabsTrigger>
              )}

              <TabsTrigger
                value="versions"
                className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-slate-800 data-[state=active]:bg-transparent text-sm font-medium text-slate-600 data-[state=active]:text-slate-900"
              >
                Versions
              </TabsTrigger>

              <TabsTrigger
                value="licenses"
                className="rounded-none px-4 py-3 border-b-2 border-transparent data-[state=active]:border-slate-800 data-[state=active]:bg-transparent text-sm font-medium text-slate-600 data-[state=active]:text-slate-900"
              >
                License
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6 space-y-6">
              <OverviewTab />
            </TabsContent>

            {insight.vulnerabilities?.length > 0 && (
              <TabsContent value="vulnerabilities" className="p-6">
                <VulnerabilitiesTab insight={insight} />
              </TabsContent>
            )}

            <TabsContent value="versions" className="p-6">
              <VersionsTab insight={insight} />
            </TabsContent>

            <TabsContent value="licenses" className="p-6">
              <LicensesTab insight={insight} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
