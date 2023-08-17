module.exports = {
  apps : [{
    name: 'epac-app',
    script: 'app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'debug',
      HTTP_PORT: 3000,
      ACCOUNT_SID: '...',
      API_KEY: '...',
      REST_API_BASE_URL: '...',
      WEBHOOK_SECRET: '...',
      CALL_ID: '...',
      WS_RECORD_PATH: 'none'
    }
  }]
};
