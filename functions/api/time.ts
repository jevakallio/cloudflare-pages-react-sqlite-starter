import type { D1Database, PagesFunction } from "@cloudflare/workers-types";

type Env = {
  TEST_DB: D1Database;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  // get some data from the database
  const query = context.env.TEST_DB.prepare(`SELECT DATE('now') as time`);

  // get the first row
  const data = await query.first();

  // return the data as json
  return Response.json(data);
};
