import Event from '../models/Event.js';
import User from '../models/User.js';

export const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const event = new Event({ title, description, date, location });
  await event.save();
  res.status(201).json(event);
};

export const getAllEvents = async (req, res) => {
  const events = await Event.find(); 
  res.json(events);
};

export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const attendee = req.body.attendee;

    if (!attendee) {
      return res.status(400).json({ message: 'Attendee information required' });
    }

    if (!event.attendees.includes(attendee)) {
      event.attendees.push(attendee);
      await event.save();
    }

    res.json({ message: 'RSVP successful' });

  } catch (error) {
    console.error("RSVP Error:", error); // log error to your console
    res.status(500).json({ message: 'Server error during RSVP' });
  }
};


export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });


  await event.deleteOne();
  res.json({ message: 'Event deleted' });
};


export const getProfile = async (req, res) => {
  try {
    const userId = req.query.id; // e.g. /api/events/profile?id=64e7...

    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    const user = await User.findById(userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

