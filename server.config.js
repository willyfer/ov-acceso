module.exports = {
  apps: [
    {
      name: 'app-oficina-js',
      script: 'server/index.js',
      instance_var: 'app-oficina-js',
      exec_mode: 'fork',
      watch: true,
      log_file: '~/.pm2/logs/app-oficina-outerr.log',
      out_file: 'NULL', // ~/.pm2/logs/app-oficina-out.log
      error_file: 'NULL', // ~/.pm2/logs/app-oficina-err.log
      combine_logs: true,
      merge_logs: true,
      env: {
        NODE_ENV: 'development'
      },
      env_staging: {
        NODE_ENV: 'staging'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
