const createAccount = (req,res)=>{
    try{
        res.status(200).json({
          success:true,
          message:"  youe  useer  print successfully at home user"
        })
      
       }catch(e){
        res.status(400).json({
           success:false,
           message:` your user not print at  user function${e.message}`
        })
       }
}
export{
    createAccount
}