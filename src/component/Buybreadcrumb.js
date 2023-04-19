import React from 'react';
import '../component/bread.css'

import moment from 'moment';
const BuyContainerBread = ({ step, setStep, selectedDate,setselectedDate, selectedTickets,setselectedTickets }) => {
  const handleStepClick = (clickedStep) => {
    if (clickedStep < step) {
      setStep(clickedStep);
    }
  };

  return (
    <div className="buy-container-bread">
      <ul>
        <li
          className={`step ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
          onClick={() => handleStepClick(1)}
        >
          <span className="step-number">1</span>
          
          <span className='stepdisc'>{`${step === 1 ? 'Select Date' : step > 1 ? (moment(selectedDate.toString()).format("LL")) : ''}`}</span>
          
        </li>
        <li
          className={`step ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}
          onClick={() => handleStepClick(2)}
        >
          <span className="step-number">2</span>
          <span className='stepdisc'>Select Tickets</span>
        </li>
        <li
          className={`step ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}
          onClick={() => handleStepClick(3)}
        >
          <span className="step-number">3</span>
          <span className='stepdisc'>Summary</span>
        </li>
      </ul>
    </div>
  );
};

export default BuyContainerBread;
