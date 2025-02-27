// import mongoose, { Schema, Document, Model } from 'mongoose';

// interface IClickCount extends Document {
//   userId: mongoose.Types.ObjectId;
//   count: number;
//   updatedAt: Date;
// }

// const clickCountSchema: Schema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//   count: { type: Number, default: 0 },
//   updatedAt: { type: Date, default: Date.now }
// });

// clickCountSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

// const Click = mongoose.models.Click || mongoose.model<IClickCount>('Click', clickCountSchema);

// export default Click
import mongoose, { Schema, model, models } from "mongoose";

const clicksSchema = new Schema({
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

  dailyClicks: [
    {
      date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
      count: { type: Number, default: 0 }, // Number of visits for that day
    },
  ],
  weeklyClicks: [
    {
      week: { type: String, required: true }, // Format: 'YYYY-WW' (Year-Week)
      count: { type: Number, default: 0 }, // Number of visits for that week
    },
  ],
  monthlyClicks: [
    {
      month: { type: String, required: true }, // Format: 'YYYY-MM' (Year-Month)
      count: { type: Number, default: 0 }, // Number of visits for that month
    },
  ],
});

const Click = models.Click || model("Click", clicksSchema);
export default Click;