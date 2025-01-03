const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://web100master:amit1234@cluster0.s2a3e.mongodb.net/')
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(`Unable to connect: ${err}`));

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function sampleQueries() {

  try {
    const newUser = await User.create({
    name: "rbin",
    email: "rob@gmail.com",
    age: "35",
    isActive: true,
    tags: ["developer"],
});
  console.log("Created new user", newUser);
  // const findUsers = await User.find({});
  // console.log("User Lists", findUsers);
  // const findInactiveUser = await User.find({ isActive: false });
  // console.log("In Active User Lists", findInactiveUser);
  // const findUsers = await User.find().select("name email -_id");
  // console.log("User Lists", findUsers);
  // const limitedUsers = await User.find().limit(5).skip(1);
  // console.log("User Lists Limit", findUsers);
  // const sortedUsers = await User.find().sort({ age: 1 });
  // console.log("Sorted Users", sortedUsers);

  // const countDocuments = await User.countDocuments({ isActive: true });
  // console.log(countDocuments);

  // const deleteUser = await User.findByIdAndDelete(newUser._id);
    // console.log(deleteUser);
    
    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 100, name: 'Rob' },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log("updated user", updateUser);
    
  } catch (err){
    console.log(err)
  } finally {
    mongoose.connection.close();
  }
}

sampleQueries();