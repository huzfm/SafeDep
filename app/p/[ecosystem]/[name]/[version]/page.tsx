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
import { ErrorState } from "./components/ErrorState";

//authentication interceptor
function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  };
}

//map ecosystem to enum
function mapEcosystem(value: string): Ecosystem {
  switch (value.toLowerCase()) {
    case "npm":
      return Ecosystem.NPM;

    case "pypi":
    case "python":
      return Ecosystem.PYPI;

    case "maven":
    case "gradle":
      return Ecosystem.MAVEN;

    case "golang":
    case "go":
      return Ecosystem.GO;

    case "rubygems":
    case "ruby":
    case "gem":
      return Ecosystem.RUBYGEMS;

    case "cargo":
    case "rust":
      return Ecosystem.CARGO;

    case "nuget":
    case "dotnet":
      return Ecosystem.NUGET;

    case "packagist":
    case "composer":
    case "php":
      return Ecosystem.PACKAGIST;

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

type VulnerabilityItem = {
  id?: { value?: string };
  summary?: string;
  severities?: { risk?: string }[];
  publishedAt?: string;
  modifiedAt?: string;
};

type LicenseItem = {
  licenseId: string;
  licenseName?: string;
  referenceUrl?: string;
};

type Insight = {
  packagePublishedAt: string | number;
  registries?: string[];
  sha256?: string;
  confidence?: string | number;
  vulnerabilities?: VulnerabilityItem[];
  projectInsights?: Array<{ scorecard?: { score?: number } }>;
  licenses?: { licenses?: LicenseItem[] };
  availableVersions?: Array<{ version: string; publishedAt?: string }>;
  [key: string]: unknown;
};

export default async function PackagePage(props: PageProps) {
  const { ecosystem, name, version } = await props.params;

  const token = process.env.SAFEDEP_API_KEY;
  const tenant = process.env.SAFEDEP_TENANT_ID;

  if (!token || !tenant) {
    return (
      <ErrorState
        title="Configuration error"
        message="SafeDep credentials are missing."
        detail="SAFEDEP_API_KEY or SAFEDEP_TENANT_ID is not set."
      />
    );
  }
//creating transport with authentication
  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenant)],
  });

  //creating client
  const client = createPromiseClient(InsightService, transport);

  let mappedEcosystem: Ecosystem | null = null;
  let insight: Insight | null = null;
  let apiError: string | null = null;

  try {
    mappedEcosystem = mapEcosystem(ecosystem);
  } catch (err: unknown) {
    return (
      <ErrorState
        title="Unsupported ecosystem"
        message={`"${ecosystem}" is not supported.`}
        detail={err instanceof Error ? err.message : String(err)}
      />
    );
  }

  try {
    //making API call
    const res = await client.getPackageVersionInsight({
      packageVersion: {
        package: { ecosystem: mappedEcosystem, name },
        version,
      },
    });

    const data = res.toJson() as unknown;

    if (!data || typeof data !== "object" || !("insight" in data)) {
      apiError = "No insight data returned from SafeDep.";
    } else {
      insight = (data as { insight: Insight }).insight;
    }
  } catch (err: unknown) {
    console.error("SafeDep API error:", err);
    apiError =
      err instanceof Error
        ? err.message
        : "Unexpected error while contacting SafeDep API.";
  }

  if (!insight) {
    return (
      <ErrorState
        title="Package not found"
        message={`We could not find ${name}@${version} in ${ecosystem}.`}
        detail={
          apiError ?? "The package may not exist or SafeDep has no data yet."
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#E2E8F0] p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <HeaderCard
          name={name}
          version={version}
          ecosystem={ecosystem}
          insight={insight}
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="px-10 justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>

            {(insight.vulnerabilities?.length ?? 0) > 0 && (
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            )}

            <TabsTrigger value="versions">Versions</TabsTrigger>
            <TabsTrigger value="licenses">License</TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="w-full min-h-screen p-6 bg-white rounded-lg border border-slate-200"
          >
            <OverviewTab />
          </TabsContent>

          {(insight.vulnerabilities?.length ?? 0) > 0 && (
            <TabsContent
              value="vulnerabilities"
              className="w-full min-h-screen p-6 bg-white rounded-lg border border-slate-200"
            >
              <VulnerabilitiesTab insight={insight} />
            </TabsContent>
          )}

          <TabsContent
            value="versions"
            className="w-full min-h-screen p-6 bg-white rounded-lg border border-slate-200"
          >
            <VersionsTab insight={insight} />
          </TabsContent>

          <TabsContent
            value="licenses"
            className="w-full min-h-screen p-6 bg-white rounded-lg border border-slate-200"
          >
            <LicensesTab insight={insight} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
