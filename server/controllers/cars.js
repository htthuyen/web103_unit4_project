import {pool} from '../config/database.js'


// get a car
const getCarById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Car not found'})
        }
        
        res.status(200).json(result.rows[0])
    } catch (err){
        res.status(500).json({err: 'Failed to fetch the car'})
    }
}
// get all cars
const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars')
        res.status(200).json(results.rows)
    } catch (err){
        res.status(500).json()
    }
}
// create a car
const createCar = async (req, res) => {
    try{
        const { name, price, exterior, roof, interior, image} = req.body

        const results = await pool.query(
            `
            INSERT INTO cars (name, price, exterior, roof, interior, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [name, price, exterior, roof,  interior, image]
        )
        res.status(201).json(results.rows[0])
    } catch(err){
        res.status(409).json({error: err.message})
    }
}
// edit a car
const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, price, exterior, roof, interior, image} = req.body
        const results = await pool.query(
            `
            UPDATE cars
            SET name = $1, price = $2, exterior = $3, roof = $4, interior = $5, image = $6
            WHERE id = $7
            RETURNING *
            `,
            [name, price, exterior, roof, interior, image, id]
            
        )

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}
// delete a car
const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const results = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( {error: error.message})
    }
}

export default { getCarById, getCars, createCar, updateCar, deleteCar }