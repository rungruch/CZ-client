import  { useState , useEffect , useRef } from "react";
import Section from "./sectoin";
import './explore.css'


const Explorecom =()=>
{   
    
    const [zones , setzones] = useState([]);
    const [index , setIndex] = useState(0);
    const [currentZone , setCurrentZone] = useState([]);

    useEffect(()=>{

        async function fetchdata(){
            const zone = await zoneLoader();
            //console.log(zone)
            setzones(zone);
            setCurrentZone(zone[0])
        }

        fetchdata();

    }, [])

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


    
   
    
        const list = zones.map((e)=>(
        <div key={e.id} className={e.id-1===index?"card-selected":"card"} onClick={()=>{setIndex(e.id-1); setCurrentZone(e)}}>
            <img src = {e.imgURL} alt="" draggable="false"/>
            <h1>{e.name}</h1>
            

        </div>
        ))
        
        return(

        <>
         <div className="explore-top ">
                <h1>Explore</h1>
                
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
                  <div className="zones-list" ref={elementRef} >{list}</div>
                <h1>{currentZone.name}</h1>
                <h2>{currentZone.detail}</h2>     
                        
                
            </div>
            <Section zones={zones} index={index} currentZone={currentZone}/>
            
        </>
        )
    }

    

export default Explorecom;



const zoneLoader = async ()=> {
    const res = await fetch('/api/zones')
    if(!res.ok)
    {
        throw Error("could not fetch the zones.")
    }
    else
    return res.json();
}

