import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';

const RedeemExpired = () => {

  return (
    <>
      <div className="body-float-grey page-complete">
        <div className="body-float-inner">
          <div className="bold mt-2">Redemption code has expired</div>
          <div>
          Sorry, the redemption code has expired. Please return to My Rewards to claim the active rewards.
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
