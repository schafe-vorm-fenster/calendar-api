import packageJson from '../../../../package.json' assert { type: 'json' };

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Returns a health check.
 *     description: Provides a health check.
 *     tags:
 *       - Health
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: API is healthy.
 */
export async function GET() {
  return Response.json({
    status: 200,
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,
  });
}
