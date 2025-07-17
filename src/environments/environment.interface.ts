export interface Environment {
  API_URL: string;
  API_ENDPOINTS: {
    USERS: {
      AUTH: string;
      REFRESH: string;
      LIST: string;
    };
    APPLICATIONS: {
      LIST: string;
      VIEW: string;
      CREATE: string;
      UPDATE: string;
      DELETE: string;
    };
    PROFILES: {
      LIST: string;
      VIEW: string;
      CREATE: string;
      UPDATE: string;
      DELETE: string;
    };
    MOODLE: {
      LIST: string;
      VIEW: string;
      CREATE: string;
      UPDATE: string;
      DELETE: string;
    };
    logs: string
  };
}
