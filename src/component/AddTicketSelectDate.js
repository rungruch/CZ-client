import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker,StaticDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const AddTicketSelectDate = ({date , setDate})=>{

    
    const handleDateSelection = (event) => {
        let formattedDate = moment(event.toString()).format('YYYY-MM-DD');
        // console.log(formattedDate);
        setDate(formattedDate);
    }

    return (
        <>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
              
                <StaticDatePicker  selected={date} onChange={handleDateSelection}  orientation='portrait' 
                slotProps={{
                    actionBar: {
                      actions: ['today'],
                    },
                  }}
                />
            
         </LocalizationProvider>
       
        </>
    )
}

export default AddTicketSelectDate;