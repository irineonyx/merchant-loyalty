import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsQR from "jsqr";
import { isMobile } from "react-device-detect";
import './App.css';
import imgQRBorder from './images/qr-border.png';
import moment from 'moment';

const Home = () => {
  const [qrResult, setQrResult] = useState("");
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: "environment"
  });
  const navigate = useNavigate();
  

  const scanQRCode = () => {
    const canvas = document.getElementById("qr-canvas");
    const context = canvas.getContext("2d");
    const video = document.getElementById("qr-video");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert"
    });
    if (code) {
      drawLine(context, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      drawLine(context, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      drawLine(context, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      drawLine(context, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
      setQrResult(code.data);
      console.log(code.data)
    }
    else{
      console.log("not getting qr")
      requestAnimationFrame(scanQRCode)
    }
  };

  useEffect(() => {
    isMobile?
    setVideoConstraints({ facingMode: { exact: "environment" } }) : setVideoConstraints({ facingMode: { exact: "user" } });
  }, [])
  useEffect(() => {
    const video = document.getElementById("qr-video");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints })
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
      })
      .catch((error) => {
        console.error(error);
      });

    video.addEventListener("playing", scanQRCode);
  }, [videoConstraints]);

  useEffect(() => {
    if(qrResult.length > 1 && qrResult.includes('HPKQR-')){
        if(qrResult.indexOf('-TIME') > 0){
            const redemptionCode = qrResult.substring(0, qrResult.indexOf('-TIME'))
            const timestampUser = qrResult.substring(qrResult.indexOf('-TIME')+5, qrResult.length)
            const timestampCurrent = moment()
            const timestampDiff = timestampCurrent.diff(timestampUser, 'seconds', true)
            console.log("time diff: " + timestampDiff)
            if(timestampDiff > 60){
              navigate('/expired');
            }
            else{
              createTransaction(redemptionCode)
            }
            
        }
        else{
            console.log(qrResult)
            createTransaction(qrResult)
        }
        
    }
    else{
      alert("Invalid QR Code, please try again.")
      scanQRCode()
    }
  }, [qrResult])

  function drawLine(canvas, begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  function createTransaction(qrCode){
    //navigate('/complete');
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'X-System-Language': 'en-EN' },
      body: JSON.stringify({
        "redemption_code" : qrCode,
        "used_for" : "Claim Discount",
        "user_id" : 1
    })
    };
    fetch(`${process.env.REACT_APP_HOST}/api-transaction/v1/transaction/create`, requestOptions)
        .then(response => response.json())
        .then(data => processTransactionResponse(data));
  }

  function processTransactionResponse(data){
    if(data.success){
        navigate('/complete', {
            state: {
              completedata: data.result?.redemptions
            }
          });
    }
    else{
        alert("Please try again. " + data.message)
        scanQRCode()
    }
    
  }

  return (
    <div className='main'>
      <video id="qr-video" width="100%" height="100%" autoPlay></video>
      <canvas id="qr-canvas" style={{ display: "none" }}></canvas>
      <p className="center"><strong>Scan QR code to proceed with redemption.</strong></p>
      <div>
        <img src={imgQRBorder} />
      </div>
      <p className="center">Place the QR code within the borders. Focus on the code to scan.</p>
    </div>
  );
};
export default Home;
