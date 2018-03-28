export type outputType = 'application/json' | 'application/pdf' | 'application/vnd.ms-excel';

export interface ExportMetadata {
  outputType?: outputType;
  outputPageSize?: string;
  exportConfigId: number;
}
