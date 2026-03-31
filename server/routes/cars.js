import express from 'express'

// import controller for custom items
import CarsController from '../controllers/cars.js'

const router = express.Router()

// define routes to get, create, edit, and delete items

router.get('/', CarsController.getCars)
router.get('/:id', CarsController.getCarById)
router.post('/', CarsController.createCar)
router.delete('/:id', CarsController.deleteCar)
router.put('/:id', CarsController.updateCar)

export default router