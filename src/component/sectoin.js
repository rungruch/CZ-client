import { useState , useEffect , useContext } from "react";


const Section = ({currentZone})=>{

    const [section , setSection] = useState([]);
    const [sectionIndex , setSectionIndex] = useState(0);
    const [currentSection , setCurrentSection] = useState([]);
    

    useEffect(()=>{
        setSection(currentZone.Section)
        setSectionIndex(0)
        setCurrentSection(currentZone.Section[0])
        // console.log(currentZone);
    },[currentZone])

    useEffect(()=>{
        setCurrentSection(currentZone.Section[sectionIndex])
    },[sectionIndex])



    // useEffect(()=>{

    //     const loadData = async () =>{
    //         const sec= await loadSection();
    //         const combine = zones.map(zone=>{
    //             let match = sec.find(secc=>secc.zoneID===zone.id)
    //             return match? Object.assign(zone,match):zone;
    //         })
    //         if(combine.length>0)
    //         {
    //            setSection(combine)
               
    //         }
    //     }
    //     loadData();

    // },[zones])


    // useEffect(()=>{
    //     if(section.length>0){            
    //         setSectionZones(section[0].Section);
    //         setCurrentSection(section[0].Section[0])
    //     }
    // },[section])

    // useEffect(()=>{
    //     if (sectionsZone.length>0)
    //     {
    //         if(sectionIndex>sectionsZone.length-1)
    //         {
    //             setCurrentSection(sectionsZone[0])
    //             setSectionIndex(0)
    //         }
    //         else{
    //             setCurrentSection(sectionsZone[sectionIndex]);
    //         }
    //     }
        
    // },[sectionIndex,sectionsZone])

    // useEffect(()=>{
    //     if(section.length>0)
    //     {
    //         const result = section.find(zone => zone.id === currentZone.id)
    //         setSectionZones(result.Section)
            
    //     }
    // },[currentZone,section])

    // useEffect(()=>{
    //     setSectionIndex(0)

    // },[sectionsZone])

    


    const handleRightSectionChange = ()=>{
            if(sectionIndex + 1 >= currentZone.Section.length)
            {
                setSectionIndex(0);
            }
            else
            {
                setSectionIndex((currentSection)=>currentSection+1);
            }
        

    }
    const handleLeftSectionChange = ()=>{

        if(sectionIndex<=0)
        {
            setSectionIndex(currentZone.Section.length-1)
        }
        else
        {
            setSectionIndex((currentSection)=>currentSection-1)
        }
    }
    
        return(
        <div className="section">
            <div className="section-top">
                <h1 >section</h1>
                <div className="sector-button">
                    <button onClick={()=>{handleLeftSectionChange()}}><img src="/img/assets|main|back-arrow.png" alt="" draggable="false" className="btnL"/></button>
                    <button onClick={()=>{handleRightSectionChange()}}><img src="/img/assets|main|forward-arrow.png" alt="" draggable="false" className="btnR"/></button>
                </div>
            </div>                    
            <div className="section-details">
                <div className="card">
                    <h3>{currentZone.name} : {currentSection.Name}</h3>
                    <h4>{currentSection.Detail}</h4>
                </div>
                <div className="imgContainer">
                    
                    <img src={currentSection.imgURL} alt="" className="unselectable"/>
                </div>
                
            </div>
        </div>)
}

export default Section;


// const loadSection = async () => {
//     const res = await fetch('/api/sections');
//     if (!res.ok)
//     {
//         throw Error("Can't fetch section.");
//     }
//     else{
//         return res.json()
//     }
// }