const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/password_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(-1);
});

const UserSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user: { type: String, required: true },
  pass: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is Working");
});

app.post("/register", async (req, res) => {
  try {
    const { url, user, pass } = req.body;
    const existingUser = await User.findOne({ url, user });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new User({ url, user, pass });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
