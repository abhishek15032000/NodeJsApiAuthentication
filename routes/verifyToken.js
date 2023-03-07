import jwt from "jsonwebtoken";

// prvent a protected route from access by verifying the jwt tojen assigned to the user
// making a middle ware function to make this check 
 export function auth (req,res,next){
      const token=req.header('auth-token');
      if(!token){
        return res.status(401).send('Access Denied');
      }

      try{
        const verified= jwt.verify(token,process.env.TOKEN_SECRET);
        // we get the id and time of creation of token as an object.
        req.user=verified;
        // since we have request object access everywhere , we added an object user upon this to be accessible 
        next();
      }catch(err){
        return res.status(400).send('Invalid Token');
      }
      
}