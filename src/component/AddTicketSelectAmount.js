import { useState } from "react";

const AddTicketSelectAmount = ({FamilyAmount,IndividualAmount,FamilyPrice,IndividualPrice,setFamilyAmount,setIndividualAmount,setFamilyPrice, setIndividualPrice})=>{
    
    

 
    //these function use to solve we type the input while default value is set zero . the input that we type will concat with zero
    const FamAmountType =(e)=>{
        let newval = e.currentTarget.value;
        if (newval === "")        
        {
            setFamilyAmount(0)
        }
        else if (newval.length>1 && newval.startsWith("0"))
        {
            setFamilyAmount(newval.slice(1))
        }
        else
        {
            setFamilyAmount(newval)
        }
    }
    const FamPriceType = (e)=>{

        let newval = e.currentTarget.value;
        if (newval === "")        
        {
            setFamilyPrice(0)
        }
        else if (newval.length>1 && newval.startsWith("0"))
        {
            setFamilyPrice(newval.slice(1))
        }
        else
        {
            setFamilyPrice(newval)
        }
        
      
    }
    const IndiviAmountType = (e)=>
    {
        let newval = e.currentTarget.value;
        if (newval === "")        
        {
            setIndividualAmount(0)
        }
        else if (newval.length>1 && newval.startsWith("0"))
        {
            setIndividualAmount(newval.slice(1))
        }
        else
        {
            setIndividualAmount(newval)
        }
        
    }
    const IndiviPriceType = (e)=>{
        let newval = e.currentTarget.value;
        if (newval === "")        
        {
            setIndividualPrice(0)
        }
        else if (newval.length>1 && newval.startsWith("0"))
        {
            setIndividualPrice(newval.slice(1))
        }
        else
        {
            setIndividualPrice(newval)
        }
        
      
    }

   

    
    return (
        <>
            
                <div className="box">
                <h2>Family</h2>
                <div className="card-container">
                    <div className="card">
                            <h2>Quantity</h2>
                    <form>                       
                            <input type="number" id="Family-quantity" name="quantity" value={FamilyAmount} onChange={FamAmountType}  min="0" />
                                                    
                    </form>
                    </div>
                    <div className="card">
                        <h2>Price</h2>
                    <form>
                        <input type="number" id="Family-Price" name="price"  min="0"  value={FamilyPrice} onChange={FamPriceType}  />
                    </form>
                    </div>
                </div>
                </div>

            <div className="box">
            <h2>Individual</h2>
            <div className="card-container">
            <div className="card">
                <h2>Quantity</h2>
                
                    <form>                       
                            <input type="number" id="Individual-quantity" name="quantity"  min="0" value={IndividualAmount}   onChange={IndiviAmountType}  />
                                                    
                    </form>
                </div>
                <div className="card">
                        <h2>Price</h2>
                    <form>
                        <input type="number" id="Individual-Price" name="price"  min="0"  value={IndividualPrice}  onChange={IndiviPriceType} />
                    </form>
                </div>
                </div>
            </div>
            
        </>
    )
}

export default AddTicketSelectAmount