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
socket.on('new_message', (data) => {

    let count = JSON.parse(localStorage.getItem("notification")) || 0;
    count++;
    localStorage.setItem("notification", JSON.stringify(count));


    SetNotificationUI();
    addNotificationToList();


    new Audio('/sounds/notification.mp3').play().catch(() => {});
});

function SetNotificationUI() {
    const notificationNumIcon = document.querySelector("#notification-badge");
    const count = JSON.parse(localStorage.getItem("notification")) || 0;
    
    notificationNumIcon.innerHTML = count;
}
async function addNotificationToList() {
    const container = document.getElementById('notifications-container');
 
     
    try {
        const response = await fetch("/UserNotifications");
        const data = await response.json();
    
        
        if (data.status == "Success" ) {
   

            const display = data.notifications.map((notice) => {
                const time = new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
    
const relativeTime = timeAgo(notice.createdAt); 
const isRead = notice.isRead;
const badgeHtml = !isRead ? `<span class="badge bg-info p-1" style="font-size: 0.6rem;">New</span>` : '';

return `
    <li>
        <a class="dropdown-item d-flex align-items-center py-3 border-bottom" href="/massage" 
           style="white-space: normal; background-color: ${isRead ? '#ffffff' : '#f8f9fa'};">
            <div class="me-3">
                <div class="icon-circle ${isRead ? 'bg-secondary' : 'bg-primary'} text-white p-2 rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    <i class="fas fa-envelope"></i>
                </div>
            </div>
            <div class="w-100">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="small text-muted">${relativeTime}</span>
                    ${badgeHtml}
                </div>
                <p class="mb-0 text-dark" style="font-size: 0.9rem; font-weight: ${isRead ? '400' : '700'};">
                    ${notice.content}
                </p>
            </div>
        </a>
    </li>`;
            }).join(''); 
            
            container.innerHTML = display || '<li><p class="text-center p-2">Sorry there are no notifications /p></li>';
        }
    } catch (err) {
        console.error("Failed to fetch notifications:", err);
    }
}
addNotificationToList()
document.getElementById('navbarDropdown').addEventListener('click', async () => {
     
 
     console.log("start");

   if (toggle == false) {
        document.querySelector("#notification-list").classList.remove("animate__fadeOut")
    document.querySelector("#notification-list").classList.add("animate__fadeIn")
 
    
    toggle = true
    console.log(toggle,"1");
       
   }else {
    
    document.querySelector("#notification-list").classList.remove("animate__fadeIn")
    document.querySelector("#notification-list").classList.add("animate__fadeOut")
    toggle = false
      console.log(toggle,"2");

   }



    
    localStorage.setItem("notification", "0");
    SetNotificationUI();

  
    await fetch('/UserNotifications/mark-as-read', { method: 'POST' });

    setTimeout(() => {
        addNotificationToList();
    }, 9000); 
});


// === User-Messeges === //








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














