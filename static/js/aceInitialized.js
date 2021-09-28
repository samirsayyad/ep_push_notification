const publicVapidKey = 'BJt9dOJ-RHbwXmqsobj6wLvigHgiOhzhpoV0bLrDu_OICACUmOFBwu22UE7y1oJ7K6YsMvS3E9J439QSqRFHYrM';

exports.aceInitialized = async function aceInitialized(){
    if ('serviceWorker' in navigator) {
        console.log('Registering service worker');
      
        await run()
    }
      

    async function run() {
        console.log('Registering service worker',navigator.serviceWorker);
        const registration = await navigator.serviceWorker.
            register('../static/plugins/ep_push_notification/static/js/worker.js' );
        console.log('Registered service worker');
    
        // try{
        //     await (await registration.pushManager.getSubscription()).unsubscribe
        // }catch(e){
        //     console.log("e",e)
        // }
        
    
        const applicationServerKey= await urlBase64ToUint8Array(publicVapidKey)
        console.log('Registering push') ;  
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        // registration.pushManager.subscribe({
        //     userVisibleOnly: true,
        //     applicationServerKey: applicationServerKey
        // }).then((d)=>{
        //     console.log("d",d)
        // })
        // .catch(e=>{
        //     console.log("e",e)
        // })
        //console.log('Registering push',await registration.pushManager.subscribe() );
        // const subscription = await registration.pushManager.subscribe({
        //     userVisibleOnly: true,
        //     applicationServerKey: await urlBase64ToUint8Array(publicVapidKey)
        // });
        // console.log(subscription,"sub");
        
        
        // const subscription = await registration.pushManager.
        //   subscribe({
        //     userVisibleOnly: true,
        //     applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        //   });
        console.log('Registered push');
    
        console.log('Sending push');
        //   await fetch('/subscribe', {
        //     method: 'POST',
        //     body: JSON.stringify(subscription),
        //     headers: {
        //       'content-type': 'application/json'
        //     }
        //   });
        const message = {
            type: 'ep_push_notification',
            action: 'sendPushNotification',
            userId : pad.getUserId(),
            padId: pad.getPadId(),
            data:subscription,
        };
        pad.collabClient.sendMessage(message);
        console.log('Sent push');
    }

   

    async function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
  
}
 