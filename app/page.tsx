
"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  success: boolean;
  message: string;
  timestamp: string;
};

export default function Home() {
  const [status, setStatus] = useState<
    "checking" | "connected" | "disconnected"
  >("checking");

  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch("/api/backend/health", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const data: HealthResponse = await response.json();

        setHealth(data);
        setStatus(data.success ? "connected" : "disconnected");
      } catch {
        setStatus("disconnected");
        setHealth(null);
      }
    }

    void checkBackend();
  }, []);

  return (
    <main className="min-h-screen bg-[#080b14] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-12">
          <p className="text-sm font-semibold tracking-[0.3em] text-blue-400">
            LEDGERGUARD
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            System Overview
          </h1>

          <p className="mt-3 text-zinc-400">
            Your billing infrastructure, monitored in one place.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-[#111827] p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Backend API</h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                status === "connected"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : status === "disconnected"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {status === "connected"
                ? "CONNECTED"
                : status === "disconnected"
                  ? "DISCONNECTED"
                  : "CHECKING..."}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span className="text-zinc-400">Service</span>
              <span>Express API</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span className="text-zinc-400">Endpoint</span>
              <span className="text-sm">/api/backend/health</span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span className="text-zinc-400">Response</span>
              <span className="text-sm">
                {health?.message ?? "Waiting for response..."}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Database connection</span>
              <span className="text-sm text-zinc-300">
                {status === "connected" ? "API responding" : "Unverified"}
              </span>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-zinc-500">
          LedgerGuard • Development Environment
        </p>
      </div>
    </main>
  );
}
