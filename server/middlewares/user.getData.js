const checkParameters=(req,res,next)=>{
    const { page } = req.query;
    
    //Checking for page parameter
    if( !page ){
        return res.status(400).send({"message":"Page parameters not found!"});
    }else{
        next();
    }
}

module.exports = checkParameters;