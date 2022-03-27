const authorise = (permittedRoles)=>{
    console.log(permittedRoles)
    return (req,res,next)=>{
        const user = req.user
        console.log(user)
        let isPermitted=false
        permittedRoles.map(role=>{
            if(user.role.includes(role)){
                isPermitted=true
            }
        })
        if(isPermitted){
            return next()
        }
        else{
            return res.status(401).send({message:"you are not authorise to perform the action"})
        }
        
    }
}
module.exports= authorise