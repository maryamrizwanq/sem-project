const env = process.env;

export const config = {
  db: {
    host: env.DB_HOST || '127.0.0.1',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'admin123',
    database: env.DB_NAME || 'ibteda_cms_db',
    port: env.DB_PORT || 3306,
    waitForConnections: env.DB_WAIT_FOR_CONN || true,
    connectionLimit: env.DB_CONN_LIMIT || 10,
    queueLimit: env.DB_QUEUE_LIMIT|| 0,
  }
};