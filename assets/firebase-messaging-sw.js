importScripts('https://www.gstatic.com/firebasejs/5.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "247429343742"
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    console.log('NEW PUSH NOTIFICATION RECEIVED')
    event.waitUntil(
        clients.matchAll({includeUncontrolled: true, type: 'window'}).then((clientsArr) => {
            let found = false
            for (let cli of clientsArr) {
                if (cli.url && cli.url.includes(event.notification.data.FCM_MSG.notification.click_action)) {
                    found = true
                    cli.focus()
                    cli.navigate(event.notification.data.FCM_MSG.notification.click_action)
                    break
                }
            }

            if(!found){
                clients.openWindow(event.notification.data.FCM_MSG.notification.click_action).then((windowCLient) => {
                })
            }
        })
    )
})

const messaging = firebase.messaging();
