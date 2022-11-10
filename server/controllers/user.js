import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try{
        // Find user by email
        const oldUser = await UserModal.findOne({email});
        // If user does not exist
        if(!oldUser){
            return res.status(404).json({message: "User doesn't exist"});
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        // if password is incorrect
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Token is valid
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "1h"});

        // Send response
        res.status(200).json({result: oldUser, token});

    } catch {

        // Send response
        res.status(500).json({message: "Something went wrong"});
    }

}




export const signup = async (req, res) => {
    const { firstName, lastName, email, password  } = req.body;
    try {
        const oldUser = await UserModal.findOne({ email });

        if(oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ name: `${firstName} ${lastName}` , email, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id, name: result.name}, secret, { expiresIn : "1h" });
        res.status(201).json({ result, token });

    } catch(error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}