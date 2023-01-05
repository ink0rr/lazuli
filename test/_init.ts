await Deno.remove("temp", { recursive: true }).catch(() => {});

await Deno.mkdir("temp/BP", { recursive: true });
await Deno.mkdir("temp/RP", { recursive: true });
