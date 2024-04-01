

const AddTicketShowinfo = ({date ,FamilyAmount, IndividualAmount, FamilyPrice, IndividualPrice})=>
{
    return (<>
    
        <h1>You want to add Ticket</h1>
        <h2>Date : {date==""?"-":date}</h2>
        <h2>Family Ticket :{FamilyAmount==""?"0":FamilyAmount}</h2>
        <h2>Price per Family Ticket : {FamilyPrice==""?"0":FamilyPrice}</h2>
        <h2>Individual Ticket : {IndividualAmount===""?0:IndividualAmount}</h2>
        <h2>Price per Individual Ticket : {IndividualPrice===""?"0":IndividualPrice}</h2>
    
    </>)
}
export default AddTicketShowinfo