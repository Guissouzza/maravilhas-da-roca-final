import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export function getPool() {
  if (!pool) {
    const url = new URL(process.env.DATABASE_URL!);

    pool = mysql.createPool({
      host: url.hostname,
      port: Number(url.port),
      user: url.username,
      password: url.password,
      database: url.pathname.replace('/', ''),
    });
  }

  return pool;
}