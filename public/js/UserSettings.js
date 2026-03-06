const alertBox = document.getElementById('auto-close-alert');
const loader = document.querySelector(".loader");
const loaderAfter = document.querySelector(".LoaderConatinerAfter");
const loaderBefore = document.querySelector(".LoaderConatinerBefore");
var flag=true;


window.addEventListener("DOMContentLoaded", async function() {

  

  setTimeout(() => {
  
    loaderAfter.style.height = "0px";
    loaderBefore.style.height = "0px";
    document.body.style.overflow = "hidden";
    loader.style.opacity = "0";
    document.body.style.overflow = "auto";
    flag = false;

  
  }, 1530);


  if (alertBox) {
       
    setTimeout(() => {
     alertBox.classList.add('fade-out-effect');
            
       
    setTimeout(() => {
      alertBox.remove();
    }, 500);
            
    }, 3000); 
  }
  

});






// Change User ProfileImage
if(document.querySelector("#changeUserImgAvatar")){
document.querySelector("#changeUserImgAvatar").addEventListener("click",function OpenChangeProfileImgTap(){
   document.querySelector("#UploadImgInnerContainer").classList.replace("animate__fadeOutDown","animate__fadeInUp");
  document.querySelector("#UploadImgContainer").classList.replace("animate__fadeOut","animate__fadeIn");
})
document.querySelector("#ChangeUserProfileIMGCloseTapIcon").addEventListener("click",(e)=>{

  
  if (e.target.id == "ChangeUserProfileIMGCloseTapIcon" && document.querySelector("#UploadImgContainer")?.classList[6] == "animate__fadeIn") {
        
   document.querySelector("#UploadImgInnerContainer")?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    document.querySelector("#UploadImgContainer")?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
   OpenChangeProfileImgTap()
  }
})
}
// Change User Password
if(document.querySelector("#OpenChangePassTap")){
document.querySelector("#OpenChangePassTap").addEventListener("click",function OpenChangePassTab(){
    
  document.querySelector("#ChangeUserPasswordContainer").classList.replace("animate__fadeOutDown","animate__fadeInUp");
  document.querySelector("#ChangeUserPassword").classList.replace("animate__fadeOut","animate__fadeIn");

})
document.querySelector("#ChangeUserPasswordCloseTapIcon").addEventListener("click",(e)=>{


  if (e.target.id == "ChangeUserPasswordCloseTapIcon" && document.querySelector("#ChangeUserPassword")?.classList[6] == "animate__fadeIn") {
        

    
  document.querySelector("#ChangeUserPasswordContainer")?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    document.querySelector("#ChangeUserPassword")?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
   OpenChangePassTab()
  }
})
document.querySelector("#mySlashEyePassInput1").addEventListener("click",()=>{
   
   
   if(document.querySelector("#mySlashEyePassInput1").classList[1] == "fa-eye-slash"){
   document.querySelector("#mySlashEyePassInput1").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#oldPasswordInput").type = "text"

   
   }else{
      document.querySelector("#mySlashEyePassInput1").classList.replace("fa-eye","fa-eye-slash" )
      document.querySelector("#oldPasswordInput").type = "password"

   }
  
   
   

})
document.querySelector("#mySlashEyePassInput2").addEventListener("click",()=>{
   
   
  if(document.querySelector("#mySlashEyePassInput2").classList[1] == "fa-eye-slash"){
   document.querySelector("#mySlashEyePassInput2").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#NewUSerPasswordInput").type = "text"

   
  }else{
    document.querySelector("#mySlashEyePassInput2").classList.replace("fa-eye","fa-eye-slash" )
    document.querySelector("#NewUSerPasswordInput").type = "password"

  }
  
   
   

})
document.querySelector("#mySlashEyePassInput3").addEventListener("click",()=>{
   
   
  if(document.querySelector("#mySlashEyePassInput3").classList[1] == "fa-eye-slash"){
   document.querySelector("#mySlashEyePassInput3").classList.replace("fa-eye-slash","fa-eye" );
   document.querySelector("#PasswordConfirmationInput").type = "text"

   
  }else{
    document.querySelector("#mySlashEyePassInput3").classList.replace("fa-eye","fa-eye-slash" )
    document.querySelector("#PasswordConfirmationInput").type = "password"

  }
  
   
   

})
}
//Change user Informations
if(document.querySelector("#OpenChangeInfoTap")){
document.querySelector("#OpenChangeInfoTap").addEventListener("click" ,function openUserInfoTap(){

  document.querySelector("#ChangeUserInformationsContainer").classList.replace("animate__fadeOutDown","animate__fadeInUp");
  document.querySelector("#ChangeUserInformations").classList.replace("animate__fadeOut","animate__fadeIn");

})
document.querySelector("#ChangeUserInfoCloseTapIcon").addEventListener("click",function closeUserInfoTap(e){


     
  if (e.target.id == "ChangeUserInfoCloseTapIcon" && document.querySelector("#ChangeUserInformations")?.classList[6] == "animate__fadeIn") {
        

    
  document.querySelector("#ChangeUserInformationsContainer")?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    document.querySelector("#ChangeUserInformations")?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
   openUserInfoTap()
  }
})
}
//Delete user Account
if(document.querySelector("#OpenDeleteAccountTap")){
document.querySelector("#OpenDeleteAccountTap").addEventListener("click" ,function OpenDeleteTap() {
  
  document.querySelector("#DeleteUserAccountContainer").classList.replace("animate__fadeOutDown","animate__fadeInUp");
  document.querySelector("#DeleteUserAccountTap").classList.replace("animate__fadeOut","animate__fadeIn");
  
})
document.querySelector("#closeTapIcon").addEventListener("click",(e)=>{
         
 
  

  if (e.target.id == "closeTapIcon"  && document.querySelector("#DeleteUserAccountTap")?.classList[6] == "animate__fadeIn") {
      

    document.querySelector("#DeleteUserAccountContainer").classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    document.querySelector("#DeleteUserAccountTap").classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
    OpenDeleteTap()
  }


   
  

})
document.querySelector("#GoBackBtn").addEventListener("click",(e)=>{
         
 
  

  if (e.target.id == "GoBackBtn"  && document.querySelector("#DeleteUserAccountTap")?.classList[6] == "animate__fadeIn") {
      

    document.querySelector("#DeleteUserAccountContainer").classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    document.querySelector("#DeleteUserAccountTap").classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
    OpenDeleteTap()
  }


   
  

})

}
// ===========================================================

// to close popup taps
document?.addEventListener("click",(e)=>{


  
  if(e.target.id == "DeleteUserAccountTap"){
   

  document.querySelector("#DeleteUserAccountContainer").classList.replace("animate__fadeInUp","animate__fadeOutDown");
  setTimeout(() => {
    document.querySelector("#DeleteUserAccountTap").classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);


  }else if(e.target.id == "ChangeUserInformations"){


  document.querySelector("#ChangeUserInformationsContainer")?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
  setTimeout(() => {
    document.querySelector("#ChangeUserInformations")?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);

  
  }else if(e.target.id === "ChangeUserPassword"){
        
  document.querySelector("#ChangeUserPasswordContainer")?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    document.querySelector("#ChangeUserPassword")?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
  }else if(e.target.id === "UploadImgContainer"){     
   document.querySelector("#UploadImgInnerContainer")?.classList.replace("animate__fadeInUp","animate__fadeOutDown"); 
  setTimeout(() => {
    document.querySelector("#UploadImgContainer")?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }
   

})

