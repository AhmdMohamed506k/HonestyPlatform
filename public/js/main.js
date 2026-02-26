const loader = document.querySelector(".loader");
const loaderAfter = document.querySelector(".LoaderConatinerAfter");
const loaderBefore = document.querySelector(".LoaderConatinerBefore");
const PhoneBtn = document.querySelector("#PhoneBtn");
const navbar = document.querySelector("#myNav");
const MainBtnGroup = document.querySelector("#MainBtnGroup");
const RegisterForm = document.querySelector("#MyRegisterForm");
const MyRegister3DObject = document.querySelector("#MyRegisterObject");


//== Change User Image ==
const changeUserImgAvatar = document.querySelector("#changeUserImgAvatar"); //img Id
const changeUserImgAvatarPenIcon = document.querySelector("#changeUserImgAvatarPenIcon"); // PEN ID

const UploadImgTaP = document.querySelector("#UploadImgContainer");// Upload Img TaP
const UploadImgInnerContainer = document.querySelector("#UploadImgInnerContainer"); ///Upload Img TaP inner card
const ChangeUserProfileIMGCloseTapIcon = document.querySelector("#ChangeUserProfileIMGCloseTapIcon");

//== Change User Passwrod ==
const OpenChangePassTap = document.querySelector("#OpenChangePassTap");
const ChangeUserPasswordTap = document.querySelector("#ChangeUserPassword");
const ChangeUserPasswordContainer = document.querySelector("#ChangeUserPasswordContainer");
const ChangeUserPasswordCloseTapIcon = document.querySelector("#ChangeUserPasswordCloseTapIcon");
//-------------
const mySlashEyePass = document.querySelector("#mySlashEyePassInput1");
const oldPasswordInput = document.querySelector("#oldPasswordInput");
const mySlashEyePass2 = document.querySelector("#mySlashEyePassInput2");
const NewUSerPasswordInput = document.querySelector("#NewUSerPasswordInput");
const mySlashEyePass3 = document.querySelector("#mySlashEyePassInput3");
const PasswordConfirmationInput = document.querySelector("#PasswordConfirmationInput");
// ============//




// == Change user Informations ==
const OpenChangeInfoTap = document.querySelector("#OpenChangeInfoTap"); // to open the tab
const ChangeUserInformations = document.querySelector("#ChangeUserInformations") // the Tab
const ChangeUserInformationsContainer = document.querySelector("#ChangeUserInformationsContainer") //the card that inside the tap
const ChangeUserInfoCloseTapIcon = document.querySelector("#ChangeUserInfoCloseTapIcon") 
// ============//
// == Delete user Account ==
const OpenDeleteAccountTap = document.querySelector("#OpenDeleteAccountTap");
const DeleteUserAccountTap = document.querySelector("#DeleteUserAccountTap");
const DeleteUserAccountContainer = document.querySelector("#DeleteUserAccountContainer");
const closeTapIcon = document.querySelector("#closeTapIcon");
const GoBackBtn = document.querySelector("#GoBackBtn");


//alerts
const alertBox = document.getElementById('auto-close-alert');






var flag=true;

// Hero section animation generate 
async function AnimatedPages(params) {
   if(flag == false && MainBtnGroup != undefined && RegisterForm == undefined){
    setTimeout(() => {
      
    
    navbar.classList.add("animate__animated","animate__fadeInDown")
    MainBtnGroup.classList.add("animate__animated","animate__fadeIn")
    flag = true
    
    }, 500);
    
  }else if(flag == false && RegisterForm != undefined && MainBtnGroup == undefined){

    setTimeout(()=>{
   
    navbar.classList.add("animate__animated","animate__fadeInDown")
    RegisterForm.classList.add("animate__animated","animate__fadeInRight");

 
    flag =true
 

    },600)


  }
}
window.addEventListener("DOMContentLoaded", async function() {

  

  setTimeout(() => {
  
    loaderAfter.style.height = "0px";
    loaderBefore.style.height = "0px";
    document.body.style.overflow = "hidden";
    loader.style.opacity = "0";
    document.body.style.overflow = "auto";
    flag = false;
    console.log(flag);
     AnimatedPages()
  }, 530);


  if (alertBox) {
       
    setTimeout(() => {
     alertBox.classList.add('fade-out-effect');
            
       
    setTimeout(() => {
      alertBox.remove();
    }, 500);
            
    }, 3000); 
  }
  

});
//====





// Change User ProfileImage
changeUserImgAvatar.addEventListener("click",function OpenChangeProfileImgTap(){
  UploadImgInnerContainer.classList.replace("animate__fadeOutDown","animate__fadeInUp");
  UploadImgTaP.classList.replace("animate__fadeOut","animate__fadeIn");
})
changeUserImgAvatarPenIcon?.addEventListener("click",()=>{

  UploadImgContainer?.classList?.remove("hiddenUploadimg")
})
ChangeUserProfileIMGCloseTapIcon.addEventListener("click",(e)=>{

  
  if (e.target.id == "ChangeUserProfileIMGCloseTapIcon" && UploadImgTaP?.classList[6] == "animate__fadeIn") {
        
  UploadImgInnerContainer?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    UploadImgTaP?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
   OpenChangeProfileImgTap()
  }
})
//======






// Change User Password
OpenChangePassTap.addEventListener("click",function OpenChangePassTab(){
    
  ChangeUserPasswordContainer.classList.replace("animate__fadeOutDown","animate__fadeInUp");
  ChangeUserPasswordTap.classList.replace("animate__fadeOut","animate__fadeIn");
})
ChangeUserPasswordCloseTapIcon.addEventListener("click",(e)=>{


  if (e.target.id == "ChangeUserPasswordCloseTapIcon" && ChangeUserPasswordTap?.classList[6] == "animate__fadeIn") {
        

    
  ChangeUserPasswordContainer?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    ChangeUserPasswordTap?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
   ChangeUserPasswordContainer()
  }
})
mySlashEyePass.addEventListener("click",()=>{
   
   
   if(mySlashEyePass.classList[1] == "fa-eye-slash"){
   mySlashEyePass.classList.replace("fa-eye-slash","fa-eye" );
   oldPasswordInput.type = "text"

   
   }else{
      mySlashEyePass.classList.replace("fa-eye","fa-eye-slash" )
      oldPasswordInput.type = "password"

   }
  
   
   

})
mySlashEyePass2.addEventListener("click",()=>{
   
   
  if(mySlashEyePass2.classList[1] == "fa-eye-slash"){
   mySlashEyePass2.classList.replace("fa-eye-slash","fa-eye" );
   NewUSerPasswordInput.type = "text"

   
  }else{
    mySlashEyePass2.classList.replace("fa-eye","fa-eye-slash" )
    NewUSerPasswordInput.type = "password"

  }
  
   
   

})
mySlashEyePass3.addEventListener("click",()=>{
   
   
  if(mySlashEyePass3.classList[1] == "fa-eye-slash"){
   mySlashEyePass3.classList.replace("fa-eye-slash","fa-eye" );
   PasswordConfirmationInput.type = "text"

   
  }else{
    mySlashEyePass3.classList.replace("fa-eye","fa-eye-slash" )
    PasswordConfirmationInput.type = "password"

  }
  
   
   

})
//Change user Informations
OpenChangeInfoTap.addEventListener("click" ,function openUserInfoTap(){

  ChangeUserInformationsContainer.classList.replace("animate__fadeOutDown","animate__fadeInUp");
  ChangeUserInformations.classList.replace("animate__fadeOut","animate__fadeIn");

})
ChangeUserInfoCloseTapIcon.addEventListener("click",function closeUserInfoTap(e){


     
  if (e.target.id == "ChangeUserInfoCloseTapIcon" && ChangeUserInformations?.classList[6] == "animate__fadeIn") {
        

    
  ChangeUserInformationsContainer?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    ChangeUserInformations?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
   openUserInfoTap()
  }
})
//Delete user Account
OpenDeleteAccountTap.addEventListener("click" ,function OpenDeleteTap() {
  
  DeleteUserAccountContainer.classList.replace("animate__fadeOutDown","animate__fadeInUp");
  DeleteUserAccountTap.classList.replace("animate__fadeOut","animate__fadeIn");
  
})
closeTapIcon.addEventListener("click",(e)=>{
         
 
  

  if (e.target.id == "closeTapIcon"  && DeleteUserAccountTap?.classList[6] == "animate__fadeIn") {
      

    DeleteUserAccountContainer.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    DeleteUserAccountTap.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
    OpenDeleteTap()
  }


   
  

})
GoBackBtn.addEventListener("click",(e)=>{
         
 
  

  if (e.target.id == "GoBackBtn"  && DeleteUserAccountTap?.classList[6] == "animate__fadeIn") {
      

    DeleteUserAccountContainer.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    DeleteUserAccountTap.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }else{
    OpenDeleteTap()
  }


   
  

})


// ============================================================
// to close popup taps
document?.addEventListener("click",(e)=>{


  
  if(e.target.id == "DeleteUserAccountTap"){
   

  DeleteUserAccountContainer.classList.replace("animate__fadeInUp","animate__fadeOutDown");
  setTimeout(() => {
    DeleteUserAccountTap.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);


  }else if(e.target.id == "ChangeUserInformations"){


  ChangeUserInformationsContainer?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
  setTimeout(() => {
    ChangeUserInformations?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);

  
  }else if(e.target.id === "ChangeUserPassword"){
        
  ChangeUserPasswordContainer?.classList.replace("animate__fadeInUp","animate__fadeOutDown");
     
  setTimeout(() => {
    ChangeUserPasswordTap?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
  }else if(e.target.id === "UploadImgContainer"){     
  UploadImgInnerContainer?.classList.replace("animate__fadeInUp","animate__fadeOutDown"); 
  setTimeout(() => {
    UploadImgTaP?.classList.replace("animate__fadeIn" ,"animate__fadeOut");
  }, 800);
 
  }
   

})