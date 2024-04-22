import toast from "react-hot-toast";

export const validateName = (name)=>{
    if(name!== ""){
        return true;
    }else{
        toast.error("Enter valid username")
    }
}
export const validateEmail = (email)=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(emailPattern.test(email)){
        return true
    }
    else {
        toast.error("Enter Valid mail")
    }
}
export const validateMnumber = (mnumber)=>{
    const phonePattern = /^[0-9]{10}$/;
    if(phonePattern.test(mnumber)){
        return true
    }else{
        toast.error("Enter valid mobile number")
    }
}
export const validatePassword=(password)=>{
   if(password?.length >= 8){
      return true
   }else{
      toast.error("Password must be at least 8 characters")
   }
}
export const validateCpassword =(Cpassword, password)=>{
     if(Cpassword===password){
        return true
     }else{
       toast.error("Passwords do not match")
     }
}
