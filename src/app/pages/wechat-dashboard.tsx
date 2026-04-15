import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type StatusPayload = {
  online: boolean;
  token_configured: boolean;
  app_id_configured: boolean;
};

type MetricsPayload = {
  active_users_24h: number;
  active_users_7d: number;
  total_messages: number;
  latency_p50_ms: number | null;
  latency_p95_ms: number | null;
};

type LogRecord = {
  id: number;
  openid: string;
  role: string;
  content: string;
  message_type: string;
  latency_ms: number | null;
  error_code: string | null;
  created_at: string;
};

export function WechatDashboardPage() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [metrics, setMetrics] = useState<MetricsPayload | null>(null);
  const [logs, setLogs] = useState<LogRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statusRes, metricsRes, logsRes] = await Promise.all([
          fetch(`${API_BASE}/wechat/admin/status`),
          fetch(`${API_BASE}/wechat/admin/metrics`),
          fetch(`${API_BASE}/wechat/admin/logs?limit=50`),
        ]);
        if (!statusRes.ok || !metricsRes.ok || !logsRes.ok) {
          throw new Error("Unable to load WeChat dashboard data.");
        }
        const statusData = (await statusRes.json()) as StatusPayload;
        const metricsData = (await metricsRes.json()) as MetricsPayload;
        const logsData = (await logsRes.json()) as { logs: LogRecord[] };
        setStatus(statusData);
        setMetrics(metricsData);
        setLogs(logsData.logs ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unexpected dashboard error.");
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  const latencyChartData = useMemo(
    () => [
      { name: "p50", value: metrics?.latency_p50_ms ?? 0 },
      { name: "p95", value: metrics?.latency_p95_ms ?? 0 },
    ],
    [metrics],
  );

  const activityChartData = useMemo(
    () => [
      { window: "24h", users: metrics?.active_users_24h ?? 0 },
      { window: "7d", users: metrics?.active_users_7d ?? 0 },
    ],
    [metrics],
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-lg shadow-[#FF8C42]/20">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TransUs</h1>
              <p className="text-xs text-muted-foreground">WeChat Integration Dashboard</p>
            </div>
          </Link>
          <Link
            to="/app"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to app
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-6">
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="grid md:grid-cols-3 gap-4">
          <StatCard
            label="Webhook status"
            value={loading ? "Loading..." : status?.online ? "Online" : "Offline"}
          />
          <StatCard
            label="Active users (24h)"
            value={loading ? "Loading..." : String(metrics?.active_users_24h ?? 0)}
          />
          <StatCard
            label="Messages total"
            value={loading ? "Loading..." : String(metrics?.total_messages ?? 0)}
          />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-border p-4">
            <h2 className="text-sm font-semibold mb-3">Latency Metrics (ms)</h2>
            <ChartContainer
              className="h-[240px]"
              config={{ value: { label: "Latency", color: "#FF8C42" } }}
            >
              <BarChart data={latencyChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={8} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4">
            <h2 className="text-sm font-semibold mb-3">Active WeChat Users</h2>
            <ChartContainer
              className="h-[240px]"
              config={{ users: { label: "Users", color: "#7FC7AF" } }}
            >
              <LineChart data={activityChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="window" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border p-4">
          <h2 className="text-sm font-semibold mb-3">Message Logs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>OpenID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  <TableCell>{log.openid.slice(0, 12)}...</TableCell>
                  <TableCell>{log.role}</TableCell>
                  <TableCell>{log.message_type}</TableCell>
                  <TableCell>{log.latency_ms ?? "-"}</TableCell>
                  <TableCell>{log.content}</TableCell>
                </TableRow>
              ))}
              {!logs.length && !loading && (
                <TableRow>
                  <TableCell colSpan={6}>No message logs yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        <section className="bg-white rounded-2xl border border-border p-4 text-sm text-muted-foreground">
          <div>Token configured: {status?.token_configured ? "Yes" : "No"}</div>
          <div>App ID configured: {status?.app_id_configured ? "Yes" : "No"}</div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
    </div>
  );
}

