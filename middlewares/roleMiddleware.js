module.exports= (roles)=>{
    return (req,res,next)=>{
        let role = req.body.role;
      
       
        if(roles.includes(role)){
            next();
        }
        else{
            return res.status(401).send("YOU CANT DO IT");
        }

    }
}