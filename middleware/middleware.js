import jwt from "jsonwebtoken"  //this will decode the req.cookies which we get 

export const authenticationMiddleware = async (req,res,next)=>{  //on registration page and login there is no middleware but after login sucessful the axios have the token in his header so
    //going to the next route after login this middle first check the token is valid or not then go to next route we simple now give this authentication to any middle ware to see that the user is authenticated

    try {
        
        const cookies=req.cookies;       //the brower later set the cookies also in the header by req through axios automatically
        const token= cookies.token;    
       
        if(!token){
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decodeduserobject=jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeduserobject){
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        req.user=decodeduserobject;
        next();

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
