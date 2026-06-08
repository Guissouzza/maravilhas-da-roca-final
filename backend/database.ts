import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'mysql-1e69ce51-alinevitoriagomescosta28-d72e.l.aivencloud.com',
  port: 25080,
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: 'defaultdb',
  // Essa linha abaixo resolve o problema do SSL que travou a extensão!
  ssl: { rejectUnauthorized: false } 
});

export default pool.promise();
