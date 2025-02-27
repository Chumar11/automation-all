// import mongoose, { Schema, Document } from 'mongoose';
// interface IVisitorCount extends Document {
//   userId: mongoose.Types.ObjectId; // User associated with the visitor count
//   count: number; // Number of visitors tracked
//   updatedAt: Date; // Timestamp of the last visitor update
// }

// // Define the schema for VisitorCount
// const visitorCountSchema: Schema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//   count: { type: Number, default: 0 }, // Tracks the total number of visitors
//   updatedAt: { type: Date, default: Date.now }, // Automatically updated on each visitor count increment
// });

// // Middleware to update `updatedAt` on every `save`
// visitorCountSchema.pre('save', function (next) {
//   this.updatedAt = new Date();
//   next();
// });

// // Create the model
// const Visitor = mongoose.models.Visitor || mongoose.model<IVisitorCount>('Visitor', visitorCountSchema);

// export default Visitor
import mongoose, { Schema, model, models } from "mongoose";

const visitorSchema = new Schema({
  userId: { type: String, required: true },
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "domain",
    required: true,
  },
  mobile: [
    {
      date: { type: String, required: true },
      count: { type: Number, default: 0 },
    },
  ],
  dailyVisits: [
    {
      date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
      count: { type: Number, default: 0 }, // Number of visits for that day
    },
  ],
  weeklyVisits: [
    {
      week: { type: String, required: true }, // Format: 'YYYY-WW' (Year-Week)
      count: { type: Number, default: 0 }, // Number of visits for that week
    },
  ],
  monthlyVisits: [
    {
      month: { type: String, required: true }, // Format: 'YYYY-MM' (Year-Month)
      count: { type: Number, default: 0 }, // Number of visits for that month
    },
  ],
});

const Visitor = models.Visitor || model("Visitor", visitorSchema);
export default Visitor;