import pg from 'pg'
import './dotenv.js'

const isLocalHost = ['localhost', '127.0.0.1'].includes(process.env.PGHOST)
const useSsl = process.env.PGSSL
    ? process.env.PGSSL === 'true'
    : !isLocalHost

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: useSsl ? { rejectUnauthorized: false } : false
}

export const pool = new pg.Pool(config)