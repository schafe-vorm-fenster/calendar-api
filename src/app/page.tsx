import SwaggerUI from 'swagger-ui-react';
import { createSwaggerSpec } from 'next-swagger-doc';
import packageJson from '../../package.json' assert { type: 'json' };
import { Metadata } from 'next';

async function getSwaggerSpec() {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: packageJson.name,
        description: packageJson?.description,
        version: packageJson.version,
        contact: {
          name: 'Schafe vorm Fenster UG',
          email: 'jan@schafe-vorm-fenster.de',
        },
      },
    },
  });

  return spec;
}

export const metadata: Metadata = {
  title: packageJson.name + ' - Swagger',
  description: packageJson.description,
  authors: [
    {
      name: 'Schafe vorm Fenster UG',
      url: 'https://github.com/schafe-vorm-fenster',
    },
  ],
};

export default async function Page() {
  const swaggerSpec = await getSwaggerSpec();

  return <SwaggerUI spec={swaggerSpec} />;
}
