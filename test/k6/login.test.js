import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 5 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  group('Health check API', () => {
    const res = http.get('http://localhost:3000/');

    check(res, {
      'status é 200': (r) => r.status === 200,
    });
  });
}
