const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://satyaxcode_db_user:oXJkvi1teWGoZ5zm@tianyin-db.qvsj6a5.mongodb.net/?appName=tianyin-db';

// User schema (simplified version)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'marketing'], required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

async function createTestUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminUser = new User({
      email: 'admin@test.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });

    // Create marketing user
    const marketingUser = new User({
      email: 'marketing@test.com',
      password: 'marketing123',
      name: 'Marketing User',
      role: 'marketing'
    });

    await adminUser.save();
    console.log('Admin user created: admin@test.com / admin123');

    await marketingUser.save();
    console.log('Marketing user created: marketing@test.com / marketing123');

    console.log('Test users created successfully!');
  } catch (error) {
    if (error.code === 11000) {
      console.log('Users already exist');
    } else {
      console.error('Error creating users:', error);
    }
  } finally {
    await mongoose.disconnect();
  }
}

createTestUsers();