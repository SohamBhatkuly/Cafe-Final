const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const paymentRoutes = require('./paymentRoute.jsx');
const Payment = require('./Payment.jsx');
const Donation = require('./Donation.jsx');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/payments', paymentRoutes);

const mongoUrl = "mongodb+srv://sakshi:pikachu02@cluster0.068g2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

mongoose.connect(mongoUrl)
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });

require('./UserDetails.jsx'); // Ensure this file correctly exports your User model
const User = mongoose.model("UserInfo");
// const User = require('./user.jsx'); 

// If Review model is used, import it
// const Review = require('./ReviewModel');

app.get("/", (req, res) => {
  res.send({ status: "started" });
});

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.status(409).send({ error: "User already exists!!" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ name, email, password: encryptedPassword });
    res.status(201).send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

// Login route
app.post('/login-user', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.status(404).send({ error: "User doesn't exist!!" });
  }
  
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
    return res.status(200).send({ status: "ok", data: token });
  } else {
    return res.status(401).send({ error: "Invalid credentials" });
  }
});


// // Reviews endpoint (ensure Review model is defined)
// app.get('/reviews', async (req, res) => {
//   try {
//     const reviews = await Review.find().populate('userId', 'name'); // Populate userId with user details
//     res.status(200).send(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Failed to fetch reviews' });
//   }
// });

const CartItem = require('./Cart.jsx');

app.post('/cart/add', async (req, res) => {
  // Destructure the request body to extract itemId, itemName, itemPrice, itemQuantity, and userId
  const {  userId, itemId, itemName, itemPrice, itemQuantity} = req.body; 
  console.log(req.body); // Log request body to ensure it's being received

  // Check if required fields are provided
  if (userId === undefined  ||
    itemId === undefined || 
    itemName === undefined || 
    itemPrice === undefined || 
    itemQuantity === undefined
    // Ensure userId is also checked
  ) {
    return res.status(400).send({ error: 'Item ID, name, price, quantity, and user ID are required' }); // Send a 400 status if any field is missing
  }

  try {
    // Create a new CartItem with the provided details
    await CartItem.create({userId,itemId, itemName, itemPrice, itemQuantity }); // Include userId in the create method
    res.status(201).send({ status: 'ok', data: 'Item added to cart successfully' }); // Send a 201 status on success
  } catch (error) {
    res.status(500).send({ status: 'error', data: error.message }); // Include error message for any internal server error
  }
});

app.get('/cart/:userId', async (req, res) => {
  const userId = req.params.userId; // Get userId from the request parameters

  try {
    // Find all cart items associated with the provided userId
    const cartItems = await CartItem.find({ userId: userId }); // Query for items with the specified userId

    // Check if any cart items are found
    if (cartItems.length === 0) {
      return res.status(404).send({ status: 'error', data: 'No items found in cart for this user.' });
    }

    // Format the response to include only the required fields
    const formattedItems = cartItems.map(item => ({
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemQuantity: item.itemQuantity // Include quantity if needed
    }));

    res.status(200).send({ status: 'ok', data: formattedItems }); // Send the items as response
  } catch (error) {
    res.status(500).send({ status: 'error', data: error.message }); // Handle any internal server error
  }
});


// shervin's part
const u= require('./UserDetails.jsx');
app.post("/reg", async (req, res) => {
  const { name, username, email, mobile, profileImage } = req.body;

  try {
      const newUser = new u({ name, username, email, mobile, profileImage });
      await newUser.save();
      res.json({ status: "ok", userId: newUser._id });
  } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(400).json({ status: "error", data: error.message });
  }
});

// Endpoint to check if a username exists
app.post("/check-username", async (req, res) => {
  const { username } = req.body;

  console.log("Checking username:", username);

  try {
      const exists = await User.exists({ username });
      console.log('Username exists:', exists);
      res.json({ exists });
  } catch (error) {
      console.error('Error checking username:', error.message);
      res.status(400).json({ status: "error", data: error.message });
  }
});

// Endpoint to upload a Base64 image
app.post("/upload-image", async (req, res) => {
  console.log("Received image upload request:", req.body);

  const { userId, image } = req.body;

  try {
      if (!userId || !image) {
          return res.status(400).json({ status: "error", data: "User ID and image are required." });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ status: "error", data: "User not found." });
      }

      if (!/^data:image\/[a-zA-Z]+;base64,/.test(image)) {
          return res.status(400).json({ status: "error", data: "Invalid image format." });
      }

      user.profileImage = image; // Save image to profileImage field
      await user.save();
      console.log('Image uploaded for user:', userId);

      res.json({ status: "ok", data: "Image uploaded successfully." });
  } catch (error) {
      console.error('Error uploading image:', error.message);
      res.status(400).json({ status: "error", data: error.message });
  }
});

// donation 
app.post('/donate', async (req, res) => {
  const { name, amount, message } = req.body;
  try {
    const newDonation = new Donation({ name, amount, message });
    await newDonation.save();
    res.status(201).json({ message: 'Donation saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save donation' });
  }
});

// Payment endpoint
app.post('/payment', async (req, res) => {
  const { userId, amount, paymentMode, address } = req.body;

  // Validate input
  if (!userId || !amount  || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new payment document
    const newPayment = new Payment({
      userId,
      amount,
      address,
    });

    // Save payment to the database
    await newPayment.save();

    // Respond with success message
    res.status(201).json({ message: 'Payment saved successfully' });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ error: 'Failed to save payment details' });
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});

// app.post("/forgot-password", async(req,res)=>{
//   const {email} = req.body;
//   try{
//     const oldUser = await User.findOne({email});
//     if(!oldUser){
//       return res.send("User Doesn't Exists!!");
//     }
//     const secret = JWT_SECRET + oldUser.password;
//     const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn:'5m'});
//     const link = `http://192.168.0.106:5001/reset-password/${oldUser._id}/${token}`;
//     console.log(link);
//   }catch(error){

//   }
// });

// app.get('/reset-password', async (req,res)=>{
//   const {id, token} = req.params;
//   console.log(req.params);
// })