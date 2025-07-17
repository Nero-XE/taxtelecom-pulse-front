import { Environment } from './environment.interface';

export const environment: Readonly<Environment> = {
  API_URL: 'https://nero-9900.pockethost.io/api/collections',
  API_ENDPOINTS: {
    USERS: {
      AUTH: '_superusers/auth-with-password',
      REFRESH: '_superusers/auth-refresh',
      LIST: '_superusers/records'
    },
    APPLICATIONS: {
      LIST: 'applications/records',
      VIEW: 'applications/records/',
      CREATE: 'applications/records',
      UPDATE: '',
      DELETE: '',
    },
    PROFILES: {
      LIST: 'profiles/records',
      VIEW: 'profiles/records/',
      CREATE: '',
      UPDATE: '',
      DELETE: '',
    },
    MOODLE: {
      LIST: 'moodle/records',
      VIEW: 'moodle/records/',
      CREATE: '',
      UPDATE: '',
      DELETE: '',
    },
    logs: 'logs/records'
  },
};
