import { useEffect, useState, useRef } from "react"
import "./animal.css"
import "./explore.css"

const AnimalCompo = ({currentZone}) =>{

    const [currentAnimal , setCurrentAnimal] = useState([]);
    const [animalList , setAnimalList] = useState([]);

    useEffect(()=>{
     
      if (Object.keys(currentZone).length>0)
        {
            if(currentZone.Animals.length<=0)
            {
                setAnimalList([])
                setCurrentAnimal([])
            }
            else
            {
                setAnimalList(currentZone.Animals);
                setCurrentAnimal(currentZone.Animals[0]);
            }
        }
    },[currentZone])

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
    }, [windowWidth,animalList]);

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

    const list = animalList.map((animals,index)=>(
        <div key={animals.AnimalID} className={currentAnimal.AnimalID===animalList[index].AnimalID? "card-selected":"card-unselected"} 
        onClick={()=>{setCurrentAnimal(animalList[index])}}>
            <div className="img-container">
                <img src={animals.imgURL} alt="" draggable="false"/>
            </div>
            <h1>{animals.AnimalName}</h1>

        </div>
    ))
    
    return(
        <>
            <div className="animals">
                <div className="top-contain">
                    <div className="scroll-button">
                    <button onClick={() => {
                            handleHorizantalScroll(elementRef.current, 25, 350, -20);
                            }}
                            disabled={leftDisable}><img src="https://cz-server-rungruch.azurewebsites.net/img/assets|main|back-arrow.png" alt="" draggable="false" className="btnL"/></button>
          
                    <button onClick={() => {
                             handleHorizantalScroll(elementRef.current, 25, 350, 20);
                             }}
                             disabled={rightDisable}><img src="https://cz-server-rungruch.azurewebsites.net/img/assets|main|forward-arrow.png" alt="" draggable="false" className="btnR" /></button>
                    </div>
                </div>
                <div className="animals-list" ref={elementRef}>{list}</div>
                <div className="animals-info">
                {currentAnimal.imgURL?(<img src={currentAnimal.imgURL} alt=""/>):""}
                    <div className="detail">
                        <h1>{currentAnimal.AnimalName}</h1>
                        <h2>{currentAnimal.Info}</h2>
                    </div>

                </div>
            </div>
        </>
    )
    

}

export default AnimalCompo