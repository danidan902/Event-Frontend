 import express from "express";
 import {
    createEvent,
    getAllEvents,
    rsvpEvent,
    deleteEvent,
    getProfile,
    
 } from '../controllers/eventControler.js'
//  import authMiddleware from '../middleware/authMiddleware.js'

 const router = express.Router()

 router.post('/',  createEvent)
 router.get('/', getAllEvents)
 router.post('/:id/rsvp',  rsvpEvent)
 router.delete('/:id', deleteEvent)
 router.get('/profile', getProfile); 

 export default router;