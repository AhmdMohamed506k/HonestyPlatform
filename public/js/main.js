const loader = document.querySelector(".loader");
const loaderAfter = document.querySelector(".LoaderConatinerAfter");
const loaderBefore = document.querySelector(".LoaderConatinerBefore");
const navbar = document.querySelector("#myNav");
const alertBox = document.getElementById('auto-close-alert');
const hiddenInput = document.getElementById('userId-hidden');
const userId = hiddenInput ? hiddenInput.value : null;
var notificationsBox=[{}]
const socket = io();
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


// === Socket-Event
if (userId && userId !== "undefined") {
    socket.emit('join', userId);
    console.log("✅ Joined room:", userId);
}
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
   
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

 
    for (let unit in intervals) {
        const value = Math.floor(seconds / intervals[unit]);
        if (value >= 1) { 
            return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
        }
    }
    
    return "Just now";
}
socket.on('receiveRealTimeMessage', (data) => {
    console.log("New message received:", data); // للتأكد من البيانات في الـ Console

    // 1. تحديث الـ LocalStorage (للحفاظ على العدد عبر الصفحات)
    let count = JSON.parse(localStorage.getItem("notification")) || 0;
    count++;
    localStorage.setItem("notification", JSON.stringify(count));  

    // 2. تحديث الـ UI الخاص بالإشعارات (الجرس والرقم الأحمر)
    updateNotificationBadge(count);
    
    // 3. إضافة الإشعار الجديد للقائمة المنسدلة (Dropdown) فوراً
    addNotificationToDropdown(data);

    // 4. إذا كان المستخدم في صفحة الرسائل، أضف الرسالة للقائمة
    if (document.querySelector("#messages-wrapper")) {
        AddNewSingleMessage(data);
        
        // تحديث عداد الرسائل في الصفحة (لو موجود)
        const countElem = document.querySelector("#messages-count");
        if(countElem && data.messagesCount) {
            countElem.innerHTML = `Message: ${data.messagesCount}`;
        }
    }

    // 5. تنبيه صوتي
    new Audio('/sounds/notification.wav').play().catch(() => {});
});



document.getElementById('notification-dropdown').addEventListener('click', async () => {
     
 
     

  


    
    localStorage.setItem("notification", "0");
    SetNotificationUI();

  
    await fetch('/UserNotifications/mark-as-read', { method: 'POST' });

    setTimeout(() => {
        addNotificationToDropdown();
    }, 9000); 
});


// === User-Messeges === //
function updateNotificationBadge(count) {
    const badge = document.querySelector("#notification-badge");
    if (badge) {
        badge.innerText = count;
        badge.classList.remove('d-none'); 
        badge.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => badge.classList.remove('animate__rubberBand'), 1000);
    }
}
function SetNotificationUI() {
    const notificationNumIcon = document.querySelector("#notification-badge");
    const count = JSON.parse(localStorage.getItem("notification")) || 0;
    
    notificationNumIcon.innerHTML = count;
}
function addNotificationToDropdown(data) {
    const container = document.querySelector("#real-time-notifications");
    if (container) {
   
        const noNoti = document.querySelector("#no-notifications");
        if (noNoti) noNoti.remove();

        const newNotiHTML = `
            <li class="dropdown-item border-bottom animate__animated animate__fadeInDown" style="background-color: #f8f9fa;">
                <p class="mb-0">${data.notification}</p>
                <small class="text-muted">Just now</small>
            </li>
        `;
        // وضع الإشعار في الأول (Top)
        container.insertAdjacentHTML('afterbegin', newNotiHTML);
    }
}
function AddNewSingleMessage(data) {
    const wrapper = document.querySelector("#messages-wrapper");
    
    const emptyMsg = document.querySelector("#empty-msg-p");
    if(emptyMsg) emptyMsg.remove();

    const newMessageHTML = `
        <div style="width: 100%;" class="MessageBodyWrapper mb-3 d-flex flex-row justify-content-center animate__animated animate__backInDown">
            <div id="MessageCard" style="width: 90%; background-color: #f5f5f6; border-radius:10px; border: 1px solid rgba(0,0,0,.125); margin-left: 12px;" class="MassegeHolder">
                <div id="MessageCardbody" style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%;" class="py-4">
                    <div id="MessageContaint" style="width: 65%; border-top: 1px solid #80808041; border-bottom: 1px solid #80808041;" class="text-center">
                        <p class="mt-3">${data.message}</p>
                    </div>
                </div>
            </div>
        </div>`;

    
    wrapper.insertAdjacentHTML('afterbegin', newMessageHTML);
}
AddNewSingleMessage()
addNotificationToDropdown()











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














