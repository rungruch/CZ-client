import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker,StaticDatePicker } from '@mui/x-date-pickers';

import moment from 'moment';

const BuySelectDate = ({ selectedDate, setSelectedDate,intensive,setIntensive,setStep,step }) => {

    const handleDateSelection = (event) => {

        let formattedDate = moment(event.toString()).format('YYYY-MM-DD');
        // console.log(formattedDate);
        setSelectedDate(event);
 
    if (moment(event.toString()).format('dddd') === 'Saturday'|| moment(event.toString()).format('dddd') === 'Sunday' ){
        setIntensive('High');
    }else{
        setIntensive('Normal');
    }
  };    
    return (
       <>
            <div className='BuyContentMain'>
                <h2>Select a date:</h2>
                <div className='datePicker'>
                  
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='datepicker-element'>
                <StaticDatePicker value={selectedDate} onChange={handleDateSelection}orientation='portrait' 
                slotProps={{
                    actionBar: {
                      actions: ['today'],
                    },
                  }}
                /></div>
                <div className='mini-datepicker-element'>
                <DatePicker label="Select Ticket Date" value={selectedDate} onChange={handleDateSelection} />
                </div>
                </LocalizationProvider>
                
                
                <div className='dateSummary'>
                    {selectedDate && <h4>You Picked: {moment(selectedDate.toString()).format("LL")}</h4>}
                    {selectedDate && <p>{"We expect " + intensive +" attendance on this date."}</p>}
                    {selectedDate &&<p>Open 9AM to 5AM </p>}<br/>
                    {selectedDate && <button onClick={() => setStep(2)}>{"Select "+moment(selectedDate.toString()).format("LL") }</button>}
                </div>
                </div>
              </div>
       </>
    );
}
export default BuySelectDate;