const loader = document.querySelector(".loader");
const loaderAfter = document.querySelector(".LoaderConatinerAfter");
const loaderBefore = document.querySelector(".LoaderConatinerBefore");
const navbar = document.querySelector("#myNav");


const alertBox = document.getElementById('auto-close-alert');
const hiddenInput = document.getElementById('userId-hidden');
const userId = hiddenInput ? hiddenInput.value : null;
var notificationsBox=[{}]
const socket = io();








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
        console.log("==>",data);
        
        
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

    localStorage.setItem("notification", "0");
    SetNotificationUI();

  
    await fetch('/UserNotifications/mark-as-read', { method: 'POST' });

    setTimeout(() => {
        addNotificationToList();
    }, 9000); 
});


























