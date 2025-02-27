import { model, models } from "mongoose";
import { Schema } from "mongoose";

const DomainSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  domainName: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: false,
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
const Domain = models.Domain || model("Domain", DomainSchema);
export default Domain;
