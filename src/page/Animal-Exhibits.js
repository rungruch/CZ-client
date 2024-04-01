import "../component/explore.css";
import AnimalExhibits from "../component/AnimalZone";
import React from "react";
import { useLoaderData } from "react-router-dom";


const dataContext = React.createContext();
const About = () =>{
    const data = useLoaderData()
    // console.log(data)
    return ( 
        <dataContext.Provider value={data}>
            <>
            <div className ="explore">
                <AnimalExhibits/>
            </div>
            </>
        </dataContext.Provider>
    )

};
export {dataContext};
export default About;  

export const zoneanimalLoader = async()=>{
    const zones = await fetch('/api/zones')
    if(!zones.ok)
    {
        throw Error("could not fetch the zones.")
    }
    const zonesData = await zones.json()
    const animals = await fetch('/api/animals')
    if (!animals.ok)
    {
        throw Error('could not fetch the animals data.')
    }
    const animalsData = await animals.json()
    
    const combine = zonesData.map((zone)=>{
        let match = animalsData.find(animal=>animal.zoneID.id===zone.id)
        return match? Object.assign(zone,match):zone;
    })
    
    return combine

}