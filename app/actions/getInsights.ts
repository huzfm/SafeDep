"use server";

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

export async function getInsights() {
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
      package: { ecosystem: Ecosystem.NPM, name: "react" },
      version: "18.2.0",
    },
  });

  return res.toJson();
}
