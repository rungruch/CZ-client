

const MenuEditTicket  = ({stage, setStage})=>{

    return (<>

        <button className={stage==1?"selected-button":"select-button"} onClick={()=>{setStage(1)}}> Add Ticket</button>
        <button className={stage>=2?"selected-button":"select-button"} onClick={()=>{setStage(2)}}> Edit Ticket</button>
    
    </>)
}

export default MenuEditTicket