// server.js
const mongoose = require("mongoose");

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


const x = async () => {
    console.log(await Data_base.find());
}


x()

// mongoose.connection.close()