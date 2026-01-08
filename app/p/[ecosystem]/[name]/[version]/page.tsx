export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createPromiseClient, Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

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
  const params = await props.params;

  const { ecosystem, name, version } = params;

  const token = process.env.SAFEDEP_API_KEY;
  const tenant = process.env.SAFEDEP_TENANT_ID;

  if (!token || !tenant) {
    throw new Error("Missing SAFEDEP env vars");
  }

  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenant)],
  });

  const client = createPromiseClient(InsightService, transport);

  const res = await client.getPackageVersionInsight({
    packageVersion: {
      package: {
        ecosystem: mapEcosystem(ecosystem),
        name,
      },
      version,
    },
  });

  const data = res.toJson();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">
        {name}@{version}
      </h1>

      <p className="text-gray-500 mb-6">Ecosystem: {ecosystem}</p>

      <pre className="bg-black text-green-400 p-4 rounded-xl text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
