import { connect } from '../../utils/db';
import Prayer from '../../utils/model';

export default async function handler(req, res) {
  await connect(); // MongoDB connection

  const { method } = req;

  if (method === 'GET') {
    const { date, name } = req.query;
    const prayers = await Prayer.find(name ? { date, name } : { date });
    return res.status(200).json(prayers);
  }

  if (method === 'POST') {
    const { date, name, status } = req.body;
    const existing = await Prayer.findOne({ date, name });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: 'Updated', data: existing });
    } else {
      const newPrayer = new Prayer({ date, name, status });
      await newPrayer.save();
      return res.json({ message: 'Created', data: newPrayer });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
