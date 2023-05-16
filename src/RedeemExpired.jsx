import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';

const RedeemExpired = () => {

  return (
    <>
      <div className="body-float-grey page-complete">
        <div className="body-float-inner">
          <div className="bold mt-2">Oh no! Redeem code expired</div>
          <div>
            The redemption code was expired already. Please scan a new QR code for redemption.
          </div>
        </div>
        <Link to={'/'}>
          <div className="btn-action-active back-home">Back To Home</div>
        </Link>
      </div>
    </>
  );
};
export default RedeemExpired;
