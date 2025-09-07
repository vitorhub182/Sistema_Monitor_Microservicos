export const sizeMinDefault = 0;
export const sizeMaxDefault = 10000;

export const queryListaRastroMustNot = [
  {
    exists: {
      field: 'ParentSpanId',
    },
  },
];

export const aggsListaRastro = {
  trace_buckets: {
    composite: {
      size: 10000,
      sources: [
        {
          trace_id: {
            terms: {
              field: 'TraceId.keyword',
            },
          },
        },
      ],
    },
    aggs: {
      top_trace_doc: {
        top_hits: {
          size: 1,
          _source: [
            '@timestamp',
            'EndTimestamp',
            'Name',
            'Resource.service.name',
          ],
        },
      },
    },
  },
};
