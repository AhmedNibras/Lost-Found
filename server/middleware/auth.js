import jwt from "jsonwebtoken"
// import UserModal from "../models/user.js";

const secret = "test"

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
        }
        else {
            decodedData = decodedData?.sub.toString();
            // const googleId = decodedData?.sub.toString();
            // const user = await UserModal.findOne({decodedData});
            // req.userId = user._id;
        }
        next();
    } catch(error) {
        console.log(error)
    }
}

export default auth;