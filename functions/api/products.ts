import { OnRequest } from "../types";

export const onRequest: OnRequest = async (context) => {
  // get some data from the database
  const query = context.env.DB.prepare(
    `SELECT product_id, product_name from products`
  );

  // get the first row
  const data = await query.all();

  if (data.error) {
    return Response.json(data.error, { status: 400 });
  }

  // return the data as json
  return Response.json(data.results);
};
