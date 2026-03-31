// for table creation

import { pool } from './database.js'

import './dotenv.js'

const resetTables = async () => {
    const resetQuery = `

        DROP TABLE IF EXISTS cars;


        CREATE TABLE IF NOT EXISTS  cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL,
            image TEXT
        )
    `

    try {
        await pool.query(resetQuery)
        console.log('table reset and created successfully')
    } catch (err){
        console.log('error resetting tables', err)
    } finally {
        await pool.end()
    }
}

resetTables()