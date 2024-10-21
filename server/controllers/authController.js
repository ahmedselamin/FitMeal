import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        
        res.status(201).json({ message : "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message : error })
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if(!user){
            res.status(401).json({ message : "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json({ message : "Invalid credentials" })   
        }
        const token = jwt.sign({ id:user._id, name:user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })        
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message : error })
    }
}