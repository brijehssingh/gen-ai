import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken"

export async function register(req, res) {

 try {
     const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "This email already exists" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newuser = await userModel.create({
    name,
    email,
    password: hashedpassword
  });

  const token = jwt.sign(
    { id: newuser._id },
    process.env.SECRET_KEY
    
  );

  // cookies send
res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // ✅ required for HTTPS
  sameSite: "None"     // ✅ required for cross-origin
});
  res.cookie("userId", newuser._id.toString());
  

  res.status(201).json({
    message: "User created",
    user:newuser
  });
 } catch (error) {
    
console.log(error.message);
res.status(500).json({
  message: error.message
});

 }
}

export async function login(req,res) {

try {

const { email, password } = req.body;

const user = await userModel.findOne({ email });

if (!user) {
  return res.status(401).json({
    message: "user not exist"
  });
}

const hashpass = await bcrypt.compare(password, user.password);

if (!hashpass) {
  return res.status(401).json({
    message: "wrong password"
  });
}

const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // ✅ required for HTTPS
  sameSite: "None"     // ✅ required for cross-origin
});
res.cookie("userId", user._id.toString());


res.status(200).json({
  message: "user logged in",
  token: token,
  user: user
});

} catch (error) {

console.log(error.message);
res.send(error.message);

}

}

export async function logout(req, res) {

  res.clearCookie("token");
  res.clearCookie("userId");
  res.clearCookie("name");
  res.clearCookie("email");

  res.status(200).json({
    message: "Logged out successfully"
  });

}

export async function getuser(req, res, next) {

  const id = req.user.id;

  try {

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      name: user.name,
      email: user.email
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

}


