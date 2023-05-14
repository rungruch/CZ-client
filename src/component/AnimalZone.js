import { useState , useEffect , useRef, useContext } from "react";
import AnimalCompo from "./AnimalCompo.js";
import './explore.css'
import { dataContext } from "../page/Animal-Exhibits.js";

const AnimalExhibits= ()=>{

    const [zones , setZones] = useState(useContext(dataContext));
    const [currentZone , setCurentZone] = useState(zones[0]);


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   
   
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
      handleHorizantalScroll(elementRef.current,0,0,0);
    }, [windowWidth,zones]);

    const elementRef = useRef(null);
    const [leftDisable, setLeftDisable] = useState(true);
    const [rightDisable, setRightDisable] = useState(false);

    const handleHorizantalScroll = (element, speed, distance, step) => {

        
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
          element.scrollLeft += step;
          scrollAmount += Math.abs(step);
          if (scrollAmount >= distance ) {
            clearInterval(slideTimer);
          }
          if (element.scrollLeft === 0) {
            setLeftDisable(true);
          } else {
            setLeftDisable(false);
            
          }
          if(element.scrollLeft+step>=element.scrollWidth-element.clientWidth){
            setRightDisable(true);
          }
          else{
            setRightDisable(false);
          }
        }, speed);
      };

    const list = zones.map((e,index)=>(
        <div key={e.id} className={e.id===currentZone.id?"card-selected":"card"} onClick={()=>{setCurentZone(zones[index])}}>
            <img src = {e.imgURL} alt="" draggable="false"/>
            <h1>{e.name}</h1>
        </div>
    ))


    return (
        <>
        <div className="explore-top ">
                <h1>ANIMALS & EXHIBITS</h1>
                
                <div className="scroll-button">
                    <button onClick={() => {
                            handleHorizantalScroll(elementRef.current, 25, 350, -20);
                            }}
                            disabled={leftDisable}><img src="/img/assets|main|back-arrow.png" alt="" draggable="false" className="btnL"/></button>
          
                    <button onClick={() => {
                             handleHorizantalScroll(elementRef.current, 25, 350, 20);
                             }}
                             disabled={rightDisable}><img src="/img/assets|main|forward-arrow.png" alt="" draggable="false" className="btnR" /></button>
                </div>
            </div>

         
            <div className="zones ">
                <h3>Zones</h3> 
                <div className="zones-list"  ref={elementRef}>{list}</div>
                <h1>{currentZone.name}</h1>
                <h2>{currentZone.detail}</h2>     
                               
                
            </div>

            <AnimalCompo currentZone={currentZone}/>
        </>
    )

}

export default AnimalExhibits;
