/**
 * User Model
 *
 * Defines the User schema with email, password, name, role, and isActive fields.
 * Implements password hashing pre-save hook and indexes for performance.
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User role types
 */
export type UserRole = "admin" | "marketing";

/**
 * User document interface
 */
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User schema definition
 */
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Don't include password in queries by default
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "marketing"],
        message: "Role must be either admin or marketing",
      },
      required: [true, "Role is required"],
      default: "marketing",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/**
 * Pre-save hook to hash password before saving
 * Only hashes if password is modified
 */
UserSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return;
  }

  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Method to compare password for authentication
 *
 * @param candidatePassword - Plain text password to compare
 * @returns Promise resolving to true if passwords match
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

/**
 * Indexes for performance optimization
 */
// Compound index for role-based queries on active users
UserSchema.index({ role: 1, isActive: 1 });

// Index for login timestamp queries
UserSchema.index({ lastLogin: -1 });

/**
 * User model
 */
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
