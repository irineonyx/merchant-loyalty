import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from "jsqr";
import { fetchToken, onMessageListener } from './firebase';
import './App.css';

function QRScanner() {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(true);
  const [renderOnce, setRenderOnce] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* notification related function */
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  //Notification.requestPermission()
  onMessageListener().then(payload => {
    setNotification({title: payload.notification.title, body: payload.notification.body})
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  function onShowNotificationClicked(){
    console.log("test notification")
    setNotification({title: "Notification", body: "QR code has been redeemed."})
    setShow(true);
  }
  useEffect(() => {
    if (renderOnce) {
    //   if (Notification.permission === 'granted') {
    //     new Notification('Redemption Status', {
    //       body: 'Coupon has been redeemed.'
    //     });
    //   } else {
    //     Notification.requestPermission().then(permission => {
    //       if (permission === 'granted') {
    //         new Notification('Redemption Status', {
    //           body: 'Coupon has been redeemed.'
    //         });
    //       }
    //     });
    //   }

      onShowNotificationClicked()
      setRenderOnce(false);
    }
  }, [renderOnce])
  /* notification related function */

  // Capture a frame from the video stream
  const video = webcamRef.current.video;
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

  // Scan for the QR code
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  useEffect(() => {
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
  }, [])

  function captureFrame(){
    setShowWebcam(true)
    
    
    
    
  }

  return (
    <div className='main'>
      <div>
        Scan QR code to proceed with redemption.
      </div>
      <div className='output'>{scannedData && <p>{scannedData}</p>}</div>
      {
      
       isMobile? (
        <Webcam
        ref={webcamRef}
        videoConstraints={{ facingMode: 'environment' }} className={showWebcam? '' : ''} />
      ) : (
        <Webcam ref={webcamRef} className={showWebcam? '' : ''} />
      ) 
      
      }
      
      
    </div>
  );
}

export default QRScanner;
