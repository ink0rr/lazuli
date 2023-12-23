export function startCase(str: string) {
  const parts = str
    .replace(/[a-z][A-Z]/g, ([c1, c2]) => `${c1} ${c2}`)
    .split(/[^a-z0-9']/i);

  let result = "";
  for (const p of parts) {
    if (p.length === 0) {
      continue;
    }
    if (result.length > 0) {
      result += " ";
    }
    result += p[0].toUpperCase() + p.substring(1);
  }
  return result;
}
