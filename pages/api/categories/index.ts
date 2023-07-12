import { NextApiRequest, NextApiResponse } from "next";

// define response type
export type CategoriesResponse = ReadonlyArray<any>;

/**
 * @swagger
 * /api/something/:
 *   get:
 *     summary: TODO.
 *     description: TODO.
 *     tags:
 *       - Constants
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: TODO.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return res.status(200).json({ hello: "jan" });
}
