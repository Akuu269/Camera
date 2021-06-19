let videoElem = document.querySelector("video");
        let audioElem = document.querySelector("audio");

        let recordBtn = document.querySelector(".record");
        let pauseBtn = document.querySelector(".pause")

        let isRecording = false;
        let ispause = false;

        // user requirement send 
        let constraint = {
            audio : true , video:true
        }
        // Represent future recording

        let recording = [];
        let mediarecordingObjectForCurrStream;

        // promise
        let usermediaPromise = navigator.mediaDevices.getUserMedia(constraint);
        // stream coming from required
        usermediaPromise.
        then(function(stream){
            // UI stream 
            // It is Api
            videoElem.srcObject = stream;
            audioElem.srcObject = stream;
            // Browser

            mediarecordingObjectForCurrStream = new MediaRecorder(stream);
            // camera recoding add >- in recording array 
            mediarecordingObjectForCurrStream.ondataavailable = function(e){
                
                    recording.push(e.data);
            }
            
            // start download recording
            mediarecordingObjectForCurrStream.addEventListener("stop" , function(){
                 // recording >- url convert
                // type >- MIME type >- here  Extension of mp4 
                // it's tells machine which type of data availabel
                const blob = new Blob(recording , {type : 'video/mp4'});
                const url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.download = "file.mp4";
                a.href = url;
                a.click();
                recording = [];
            })
            

            }).catch(function(err){
                console.log(err)
            alert("please allow both microphone and camera");
           
        });
        
        recordBtn.addEventListener("click" , function(){
            if(mediarecordingObjectForCurrStream == undefined){
                alert("First Select the devices");
                return;
            }
            if(isRecording == false){
                mediarecordingObjectForCurrStream.start();
                recordBtn.innereText = "Recording...";
            }else{
                mediarecordingObjectForCurrStream.stop();
                recordBtn.innerText = "Record";
            }
            isRecording = !isRecording
        })
        captureImgBtn.addEventListener("click" , function(){

            // canvas create
            let canvas = document.createElement("canvas");
            canvas.height = videoElem.videoHeight;
            canvas.width = videoElem.videoWidth;
            let tool = canvas.getContext("2d");
            tool.drawImage(videoElem , 0 , 0);
            let url = canvas.toDataURL();
            let a = document.createElement("a");
            a.download = "file.png";
            a.href = url;
            a.click();
            a.remove();
            
            // video Element 
        })