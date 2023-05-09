import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imgComplete from './images/icon-complete.png';

const RedeemComplete = () => {
  return (
    <>
      <div className="body-float-grey page-complete">
        <div className="body-float-inner">
          <img src={imgComplete} alt="Complete Icon" />
          <div className="bold mt-2">Completed!</div>
          <div>
            $ voucher has been redeemed
          </div>
          <div>
            Tampines Mall - Jollibean<br></br>24 Mar 2023 02:36 pm<br></br>ID:
            1009345938
          </div>
        </div>
        <Link to={'/'}>
          <div className="btn-action-active back-home">Back To Home</div>
        </Link>
      </div>
    </>
  );
};
export default RedeemComplete;
