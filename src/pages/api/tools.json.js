import { tools, seed } from '../../lib/catalog';
export function GET() {
  return Response.json({ generated: seed.generated, total: tools.length, tools });
}
