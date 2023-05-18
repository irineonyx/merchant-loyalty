import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import imgComplete from './images/icon-complete.png';
import moment from 'moment';

const RedeemComplete = () => {
    const {state} = useLocation();

  return (
    <>
      <div className="body-float-grey page-complete">
        <div className="body-float-inner">
          <img src={imgComplete} alt="Complete Icon" />
          <div className="bold mt-2">Completed!</div>
          <div>
            <span className='bold'>${state.completedata?.vouchers?.voucher_points?.point} voucher</span>
            <br></br> 
            has been redeemed
          </div>
          <div className='text-small'>
            {state.completedata?.vouchers?.description}
            <br></br>
            {moment().format('DD MMM YYYY h:mm a')}
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
