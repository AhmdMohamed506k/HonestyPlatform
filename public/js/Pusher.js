const hiddenInput = document.getElementById('userId-hidden');
const PusherKeyInput = document.getElementById('PusherKey');
const PusherClusterInput = document.getElementById('PusherCluster');


const userId = hiddenInput ? hiddenInput.value : null;
const PusherKey = PusherKeyInput ? PusherKeyInput.value : null;
const PusherCluster = PusherClusterInput ? PusherClusterInput.value : null;











// === Pusher-Event ====
const pusher = new Pusher(PusherKey, {cluster: PusherCluster});
  

if (userId && userId !== "undefined") {
    
    const channel = pusher.subscribe(`user-${userId}`);
    console.log("✅ Subscribed to Pusher channel: user-" + userId);
     
 
    


    channel.bind('receiveRealTimeMessage', (data) => {
        console.log("📩 New Message via Pusher:", data);

     
        let count = JSON.parse(localStorage.getItem("notification")) || 0;
        count++;
        localStorage.setItem("notification", JSON.stringify(count));  


         new Audio('/sounds/notification.wav').play().catch(() => {});


        updateNotificationBadge(count);
        addNotificationToDropdown(data);

        if (document.querySelector("#messages-wrapper")) {
            AddNewSingleMessage(data);
            
            const countElem = document.querySelector("#messages-count");
            if(countElem && data.messageCount) {
                countElem.innerHTML = `Message: ${data.messageCount}`;
            }
        }

    
});
    
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
if(document.getElementById('notification-dropdown')){
   document.getElementById('notification-dropdown').addEventListener('click', async () => {
     
    
    localStorage.setItem("notification", "0");
    SetNotificationUI();

  
    await fetch('/UserNotifications/mark-as-read', { method: 'POST' });

    setTimeout(() => {
        addNotificationToDropdown();
    }, 9000); 
});
 
}



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



