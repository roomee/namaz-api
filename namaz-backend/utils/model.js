import mongoose from 'mongoose';

const PrayerSchema = new mongoose.Schema({
  date: String,
  name: String,
  status: String,
});

export default mongoose.models.Prayer || mongoose.model('Prayer', PrayerSchema);
