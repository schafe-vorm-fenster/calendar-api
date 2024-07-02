import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
  console.log('Outgoing:', request.method, request.url);
});

beforeAll(async () => {
  server.listen({
    onUnhandledRequest(req) {
      console.error(`No handler for ${req.method} ${req.url}`);
    },
  });
});
