import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from "jsqr";
import './App.css';

function QRScanner() {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [renderOnce, setRenderOnce] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function captureFrame(){
    setShowWebcam(true)
    
  }

  useEffect(() => {
    if (showWebcam) {
      console.log("inside show webcam")
      // Capture a frame from the video stream
      const video = webcamRef.current.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

      // Scan for the QR code
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        console.log(code.data)
        if(code.data.includes('pmicustid')){
          setShowWebcam(false)
          setRenderOnce(true);
          const scannedTextArr = code.data.split('-')
          setScannedData('Customer found, ID: ' + scannedTextArr[1]);
        }
        else{
          // Request the next frame
          requestAnimationFrame(captureFrame);
        }
      }
      else{
        // Request the next frame
        requestAnimationFrame(captureFrame);
      }
    }
  }, [showWebcam])

  useEffect(() => {
    if (renderOnce) {
      if (Notification.permission === 'granted') {
        new Notification('Redemption Status', {
          body: 'Coupon has been redeemed.'
        });
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Redemption Status', {
              body: 'Coupon has been redeemed.'
            });
          }
        });
      }
      setRenderOnce(false);
    }
  }, [renderOnce])

  return (
    <div className='main'>
      <div className='action'><button onClick={captureFrame} className={showWebcam? 'disabled' : ''}>Scan Customer's QR</button></div>
      
      {
      
       isMobile? (
        <Webcam
        ref={webcamRef}
        videoConstraints={{ facingMode: 'environment' }} className={showWebcam? '' : ''} />
      ) : (
        <Webcam ref={webcamRef} className={showWebcam? '' : ''} />
      ) 
      
      }
      <div className='center'>{showWebcam? 'Scan: Active' : 'Scan: Inactive'}</div>
      <div className='output'>{scannedData && <p>{scannedData}</p>}</div>
      
    </div>
  );
}

export default QRScanner;
