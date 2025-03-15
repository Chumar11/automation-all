import mongoose, { Schema } from 'mongoose';

const youtubeSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ip: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUsed: {
    type: Date,
    default: Date.now
  }
});

export const YoutubeSession = mongoose.models.YoutubeSession || mongoose.model('YoutubeSession', youtubeSessionSchema);