import { Task } from '@/types';

export function toCSV(tasks: ReadonlyArray<Task & { roi?: number | null }>): string {
  const headers = [
    'id',
    'title',
    'revenue',
    'timeTaken',
    'roi',
    'priority',
    'status',
    'notes',
  ];

  const rows = tasks.map(t => [
    t.id,
    escapeCsv(t.title),
    String(t.revenue),
    String(t.timeTaken),
    t.roi == null ? 0 : String(t.roi),
    t.priority,
    t.status,
    escapeCsv(t.notes ?? ''),
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}


function escapeCsv(v: string): string {
  if (v == null) return '';

  const needsQuotes = /[",\n\r]/.test(v);
  const escaped = v.replace(/"/g, '""');

  return needsQuotes ? `"${escaped}"` : escaped;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}


