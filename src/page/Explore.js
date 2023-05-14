import "../component/explore.css";
import React from "react";
import Explorecom from "../component/Explore";
import { useLoaderData } from "react-router-dom";

const dataContext = React.createContext();
const Explore = ()=>{
   
    const data=useLoaderData()
    // console.log(data)
    return ( 
        <dataContext.Provider value={data}>
        <>
        <div className ="explore">
            
                <Explorecom /> 
        </div>
        </>
        </dataContext.Provider>
    )

}
export {dataContext}

export default Explore

export const zonesectionloader = async() =>{
    const zones = await fetch('/api/zones')
    if(!zones.ok)
    {
        throw Error("could not fetch the zones.")
    }
    const zonesData = await zones.json()
    const section = await fetch ('/api/sections')
    if(!section.ok)
    {
        throw Error("coult not fetch the section")
    }
    
    const sectionData = await section.json();
    const combine = zonesData.map(zone=>{
        let match = sectionData.find(section=>section.zoneID.id===zone.id)
        return match? Object.assign(zone,match):zone;
    })
    return combine;
}