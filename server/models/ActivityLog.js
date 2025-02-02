import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      action: {
        type: String,
        required: true,
        enum: ['login_success', 'login_failed', 'login_blocked', 'account_locked']
      },
      description: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      ipAddress: { type: String },
      userAgent: { type: String }
    },
    { timestamps: true }
  );
const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
