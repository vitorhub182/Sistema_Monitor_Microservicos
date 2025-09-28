import { NextResponse } from "next/server";

export async function GET() {
  const esUrl = "http://localhost:9200";          // https://seu-es:9200
  const esAuth = "elastic:31ESN3RZ";        // "user:pass" ou Bearer

  const body = {
    "size": 0,
    "query": {
      "bool": {
        "filter": [
          { "term": { "service.name": "web-service-relatorio" } },
          { "exists": { "field": "jvm.cpu.recent_utilization" } },
          { "range": { "@timestamp": { "gte": "now-6h" } } }
        ]
      }
    },
    "aggs": {
      "ts": {
        "date_histogram": { "field": "@timestamp", "fixed_interval": "1m" },
        "aggs": {
          "cpu": { "avg": { "field": "jvm.cpu.recent_utilization" } }
        }
      }
    }
  }
  

  const res = await fetch(`${esUrl}/*metrics-generic-default*/_search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": esAuth.includes("Bearer")
        ? esAuth
        : "Basic " + Buffer.from(esAuth).toString("base64"),
    },
    body: JSON.stringify(body),
    // importante em ambiente server:
    cache: "no-store",
  });

  const json = await res.json();
  console.log( JSON.stringify(json))
// Compacta para [{ t, cpu }]
const out = json.aggregations.ts.buckets.map((b: any) => ({
  t: b.key_as_string,
  cpu: b.cpu.value !== null ? Math.round(b.cpu.value * 100000) : null // 0–1 → 0–100%
}));


  return NextResponse.json(out);
}


