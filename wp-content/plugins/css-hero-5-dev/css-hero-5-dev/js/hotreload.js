const isReceiver = (window.location.href).indexOf('csshero_hotreload') > -1;
const receiverID = 'hero-peer-'+peerID+'-receiver';
const senderID = 'hero-peer-'+peerID+'-sender';

let connection = false;

const peer = isReceiver ? new Peer(receiverID,{debug:1}) : new Peer(senderID,{debug:1});




const placeHRStyle = () => {
    // DISABLE DEFAULT CSS RENDERING
    const el = document.getElementById('csshero-main-stylesheet-css')
    if (el) el.setAttribute('disabled',true)

    // CREATE CSS HOT RELOAD RENDERING STYLESHEET
    let e = document.createElement('style');
    e.id = 'heroStyleHotReload'
    document.getElementsByTagName('head')[0].appendChild(e);
}


document.addEventListener('peerSend',e=>{
    if (connection) connection.send(e.detail)
})

window.addEventListener('beforeunload', () => {
    if (isReceiver){
        peer.destroy()
        const peerEvent = new CustomEvent('peerStatusChange', {'detail':false});
        document.dispatchEvent(peerEvent);
    }
}, false);
document.addEventListener('DOMContentLoaded', () => {
    if (isReceiver){
        setTimeout(()=>{
            const conn = peer.connect(senderID)
            if (conn){
                conn.on('open',()=>{
                    placeHRStyle();
                })
                conn.on('data', data => {
                    document.getElementById('heroStyleHotReload').innerHTML = data
                })
            }
		},1000)
    } else {
        peer.on('open', id => {
            console.log('PEER ID is: ' + id);
        });

        peer.on('error',err=>{
            console.log(err)
        })
    
        peer.on('connection', conn => { 
           const peerEvent = new CustomEvent('peerStatusChange', {'detail':true});
           document.dispatchEvent(peerEvent);
           console.log('CONNECTION RECEIVED')
            connection = conn;
        });
		
    }
    
    
   
});