import { walk } from "./deps.ts";

for await (const entry of walk(".", { includeDirs: false })) {
  console.log(entry.path);
}
