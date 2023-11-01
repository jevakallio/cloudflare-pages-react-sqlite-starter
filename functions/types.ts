import type { D1Database, PagesFunction } from "@cloudflare/workers-types";
type Env = { DB: D1Database };

export type OnRequest = PagesFunction<Env>;
