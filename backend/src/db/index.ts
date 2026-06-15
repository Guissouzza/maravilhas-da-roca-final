import mysql, { Pool } from 'mysql2/promise'

let pool: Pool

export const initPool = () => {
  if (!pool) {
    const url = new URL(process.env.DATABASE_URL!)

    pool = mysql.createPool({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.replace('/', ''),
    })
  }

  return pool
}

export default initPool()