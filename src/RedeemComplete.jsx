import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import imgComplete from './images/icon-complete.png';

const RedeemComplete = () => {
    const {state} = useLocation();
    console.log(state)
    console.log(state.completedata)

  return (
    <>
      <div className="body-float-grey page-complete">
        <div className="body-float-inner">
          <img src={imgComplete} alt="Complete Icon" />
          <div className="bold mt-2">Completed!</div>
          <div>
            ${state.completedata?.vouchers?.voucher_points?.point} voucher has been redeemed
          </div>
          <div>
            {state.completedata?.vouchers?.name} - {state.completedata?.vouchers?.description}<br></br>{state.completedata?.created_at}
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
