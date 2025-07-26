import mongoose from 'mongoose';  
 
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,  
  date: Date,  
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attendees: [String],
});
  Event = mongoose.model('Event', eventSchema);
export default Event;   