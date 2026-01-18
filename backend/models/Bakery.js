import mongoose from 'mongoose';

const bakerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instagramHandle: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  hasSemlor: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bakerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Bakery', bakerySchema);
