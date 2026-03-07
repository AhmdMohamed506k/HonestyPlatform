const loader = document.querySelector(".loader");
const loaderAfter = document.querySelector(".LoaderConatinerAfter");
const loaderBefore = document.querySelector(".LoaderConatinerBefore");
const navbar = document.querySelector("#myNav");
const alertBox = document.getElementById('auto-close-alert');

// ================================



var notificationsBox=[{}]
var toggle=false
var flag=true;
var displayMSg;






// Hero section animation generate 
async function AnimatedPages(params) {
   if(flag == false && document.querySelector("#MainBtnGroup") != undefined && document.querySelector("#MyRegisterForm") == undefined){
    setTimeout(() => {
      
    
    navbar.classList.add("animate__animated","animate__fadeInDown")
    document.querySelector("#MainBtnGroup").classList.add("animate__animated","animate__fadeIn")
    flag = true
    
    }, 500);
    
  }else if(flag == false && document.querySelector("#MyRegisterForm") != undefined && document.querySelector("#MainBtnGroup") == undefined){

    setTimeout(()=>{
   
    navbar.classList.add("animate__animated","animate__fadeInDown")
    document.querySelector("#MyRegisterForm").classList.add("animate__animated","animate__fadeInRight");

 
    flag =true
 

    },600)


  }
}
document.addEventListener("DOMContentLoaded", async function() {

  


    setTimeout(() => {
    loaderAfter.style.height = "0px";
    loaderBefore.style.height = "0px";
    document.body.style.overflow = "hidden";
    loader.style.opacity = "0";
    document.body.style.overflow = "auto";
    flag = false;
    
    AnimatedPages()
    },150);


   




  if (alertBox) {
       
    setTimeout(() => {
     alertBox.classList.add('fade-out-effect');
            
       
    setTimeout(() => {
      alertBox.remove();
    }, 500);
            
    }, 3000); 
  }
  

});
if(document.querySelector("#NewFogetpasswordEye")){

 
  
   document.querySelector("#NewFogetpasswordEye").addEventListener("click",()=>{
  
      
   
   if(document.querySelector("#NewFogetpasswordEye").classList[1] == "fa-eye-slash"){


   document.querySelector("#NewFogetpasswordEye").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#NewFogetpassword").type = "text"

   
   }else{
      document.querySelector("#NewFogetpasswordEye").classList.replace("fa-eye","fa-eye-slash" )
      document.querySelector("#NewFogetpassword").type = "password"

   }
  
   
   

})


  document.querySelector("#newForgetPassConfirmationEye").addEventListener("click",()=>{
  
      
   
   if(document.querySelector("#newForgetPassConfirmationEye").classList[1] == "fa-eye-slash"){


   document.querySelector("#newForgetPassConfirmationEye").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#newForgetPassConfirmation").type = "text"

   
   }else{
      document.querySelector("#newForgetPassConfirmationEye").classList.replace("fa-eye","fa-eye-slash" )
      document.querySelector("#newForgetPassConfirmation").type = "password"

   }
  
   
   

})

}
if(document.querySelector("#RegisterPassinput")){

 
  
   document.querySelector("#RegisterPassEye").addEventListener("click",()=>{
  
      
   
   if(document.querySelector("#RegisterPassEye").classList[1] == "fa-eye-slash"){


   document.querySelector("#RegisterPassEye").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#RegisterPassinput").type = "text"

   
   }else{
      document.querySelector("#RegisterPassEye").classList.replace("fa-eye","fa-eye-slash" )
      document.querySelector("#RegisterPassinput").type = "password"

   }
  
   
   

})


  document.querySelector("#RegisterPassConfirmationEye").addEventListener("click",()=>{
  
      
   
   if(document.querySelector("#RegisterPassConfirmationEye").classList[1] == "fa-eye-slash"){


   document.querySelector("#RegisterPassConfirmationEye").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#RegisterPassConfirmationInput").type = "text"

   
   }else{
      document.querySelector("#RegisterPassConfirmationEye").classList.replace("fa-eye","fa-eye-slash" )
      document.querySelector("#RegisterPassConfirmationInput").type = "password"

   }
  
   
   

})

}
if(document.querySelector("#LoginPassInput")){

 
  
   document.querySelector("#LoginPassInputEye").addEventListener("click",()=>{
  
      
   
   if(document.querySelector("#LoginPassInputEye").classList[1] == "fa-eye-slash"){


   document.querySelector("#LoginPassInputEye").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#LoginPassInput").type = "text"

   
   }else{
      document.querySelector("#LoginPassInputEye").classList.replace("fa-eye","fa-eye-slash" )
      document.querySelector("#LoginPassInput").type = "password"

   }
  
   
   

})



}
































