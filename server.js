// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');



const app = express();

// Connect to MongoDB


mongoose.connect("mongodb://127.0.0.1:27017/react_mongodb_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Data_baseSchema = mongoose.Schema({
  drug_name: String,
  medical_condition: String,
  side_effects: String,
  generic_name: String,
  drug_classes: String,
  brand_names: String,
  activity: String,
  rx_otc: String,
  pregnancy_category: String,
  csa: String,
  related_drugs: String,
  medical_condition_description: String,
  rating: String,
  no_of_reviews: String,
  drug_link: String,
  medical_condition_url: String,
}, {
    collection: "Data_base"
}
);

const Data_base = mongoose.model("Data_base", Data_baseSchema);

// Create mongoose models for User
const UserSchema = mongoose.Schema({
  username: String,
  password: String,
}, {
    collection: "User"
});

const User = mongoose.model("User", UserSchema);

app.use(express.json());
app.use(cors());

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).send('User created successfully');
  } catch {
    res.status(500).send('Error creating user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).send('User not found');
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'secret_key');
    return res.status(200).send({ token });
  }
  res.status(401).send('Invalid password');
});
app.post('/NLPComponent', async (req, res) => {
  try {
    // Extract input fields from request body
    // console.log(req.body);
    const { Drug_name, Medical_condition } = req.body;
    // console.log(Drug_name, Medical_condition);

    // Query the database to find a data based on Drug_name and Medical_condition
    const data = await Data_base.find({ 
      drug_name: Drug_name,
      medical_condition: Medical_condition
    });

    if (!data) {
      return res.status(404).send('Data not found');
    }

    let sideEffects = []
    for (let i = 0; i < data.length; i++){
      sideEffects.push(data[i].side_effects);
    }

    // console.log(sideEffects);

    // If data is found, send the side_effects data in the response
    return res.status(200).send(sideEffects);
  } catch (error) {
    // Handle any server errors
    console.error('Error:', error);
    return res.status(500).send('Internal Server Error');
  }
});



app.listen(3001, () => console.log('Server is running on http://localhost:3001'));
