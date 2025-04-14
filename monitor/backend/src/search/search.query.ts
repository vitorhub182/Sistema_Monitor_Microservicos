
export const sizelistaRastro = 0
export const querylistaRastro = {
  "bool": {
    "must_not": [
      {
        "exists": {
          "field": "ParentSpanId"
        }
      }
    ]
  }
}

export const aggslistaRastro = {
  "trace_buckets": {
    "composite": {
      "size": 10000,
      "sources": [
        {
          "trace_id": {
            "terms": {
              "field": "TraceId.keyword"
            }
          }
        }
      ]
    },
    "aggs": {
      "top_trace_doc": {
        "top_hits": {
          "size": 1,
          "_source": ["@timestamp", "Name", "Resource.service.name"]
        }
      }
    }
  }
}

