import { createFileRoute, redirect } from "@tanstack/react-router";
import localforage from "localforage";
import { buildAuthorizationUrl, generatePKCEPair } from "@/api/aqsnv/auth";
import Layout from "@/components/Layout";
import { authToken } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (!authToken.isAvailable()) {
      const pkce = await generatePKCEPair();
      await localforage.setItem("pkce", pkce.verifier);
      const authorizationUrl = await buildAuthorizationUrl(
        location.pathname,
        pkce,
      );
      throw redirect({ href: authorizationUrl.toString(), replace: true });
    }
  },
  component: Layout,
});
