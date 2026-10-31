/** Shared, runtime-independent catalog filtering for browser and server. */
export function matchesTool(tool, filters) {
  const query = String(filters.q || '').trim().toLocaleLowerCase();
  const searchText = [tool.name, tool.description, tool.category, tool.license, tool.pricing, ...tool.platforms].join(' ').toLocaleLowerCase();
  return (!query || searchText.includes(query)) &&
    (!filters.category || tool.category === filters.category) &&
    (!filters.platform || tool.platforms.includes(filters.platform)) &&
    (!filters.pricing || tool.pricing === filters.pricing) &&
    (!filters.license || tool.license === filters.license);
}
