import { OnRequest } from "../types";

export const onRequest: OnRequest = async (context) => {
  // get some data from the database
  const query = context.env.DB.prepare(`SELECT DATETIME('now') as time`);

  // get the first row
  const data = await query.first();

  // return the data as json
  return Response.json(data);
};
