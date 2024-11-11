import { createNextHandler } from '@ts-rest/serverless/next';
import { HealthContract } from './health.contract';
import packageJson from '../../../../package.json' assert { type: 'json' };
import {
  HealthyApiStatusSchema,
  ServiceStatusSchema,
  UnhealthyApiStatusSchema,
} from '@/rest/health.schema';

const handler = createNextHandler(
  HealthContract,
  {
    health: async () => {
      const crmApiHealth: ServiceStatusSchema = {
        status: 200,
        name: 'crm-api-dummy',
      };

      // evaluate overall status code
      let status: number = 200;
      if (crmApiHealth.status !== 200) {
        status = 503;
      }

      if (status === 200) {
        const apiStatus: HealthyApiStatusSchema = {
          status: status,
          version: packageJson.version,
          name: packageJson.name,
          description: packageJson.description,
          services: [crmApiHealth],
        };
        return { status: 200, body: apiStatus };
      }

      const apiStatus: UnhealthyApiStatusSchema = {
        status: 503,
        error:
          'error' in crmApiHealth
            ? (crmApiHealth.error as string)
            : 'Unknown error',
        version: packageJson.version,
        name: packageJson.name,
        description: packageJson.description,
        services: [crmApiHealth],
      };
      return { status: 503, body: apiStatus };
    },
  },

  {
    handlerType: 'app-router',
  },
);

export { handler as GET };
