
self.wsReady=false;
self.ws = new WebSocket("wss://ws-dev.idcapture.es");
self.ws.onopen = function() {
    console.log("Remote connection stablished.");
    postMessage({cmd:"ready"});
};
self.ws.onmessage = function(e) {
    console.log("socket message received: "+e.data);
    postMessage({cmd:"message",data:e.data});
};
self.ws.onerror = function(e) {
    console.log("socket error: "+e);
};

self.onmessage = function (oEvent) {

        if (oEvent.data.cmd == "addFrame") {

            //console.log(oEvent.data);
            
            //let offCanvas = new OffscreenCanvas(oEvent.data.data.width,oEvent.data.data.height);
            //offCanvas.getContext('2d').putImageData(oEvent.data.data, 0, 0);
            //let blob = offCanvas.convertToBlob();
            self.ws.send('{"type":"VIDEO_FRAME","dataURL":"'+oEvent.data.data+'"}');
            

        } else if (oEvent.data.cmd == "generateVideo") {

            //var toReturn = { cmd: "generateVideo" };
            //postMessage(toReturn);
            let command = '{"type":"MAKE_VIDEO","FR":'+oEvent.data.fr+'}';
            console.log(command);
            self.ws.send(command);

        } else {
            postMessage({ cmd: "unknownMessage" });
        }
}
