import React from 'react'
import {useParams} from 'react-router-dom'
import Pokemon from './Pokemon.js'
import axios from 'axios'
import { useState } from 'react'

const Entry=()=>{
    //get the url paramaters
    const pokemon = useParams().pokemon

    //states 
    const [desc, setDesc]=useState('')
    const [abilities, setAbilities]= useState([])
    const [abilityDescription, setAbilityDescription]= useState([])
    const [isShiny, setShiny]= useState(false)
    const [diffFemale,setDiff] = useState(false)
    const [isFemale, setGender] = useState(false)

    //changes sprite to shiny
    const shinyHandle=()=>{
        setShiny(!isShiny)
    }
    //changes gender if there is gender difference 
    const changeGender=()=>{
        let gender=!isFemale
        setGender(gender)
    }
    // useEffect(()=>{
    //      setInfo(<Pokemon isShiny={isShiny} isFemale={isFemale} inMain={false}id={pokemon}/>)
    // },[isShiny])
    //gets information for the component
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
             .then(async response=>{
                 // get the description for the pokemon entry and if it has gender difference
                 await axios.get(response.data.species.url)
                 .then(res=>{
                     if(res.data.has_gender_differences)
                     {
                        setDiff(<button className='btn' onClick={()=>{changeGender()}}>change gender</button>)
                     }
                     setDesc(res.data.flavor_text_entries[1].flavor_text+'\n'+ res.data.flavor_text_entries[3].flavor_text)  
                 })
                 .catch(err=>{
                     setDesc('description not found')
                 })
                 let ablty = []
                 let dsc = []
                 let length = response.data.abilities.length

                 for(let i = 0;i<length;i++){
                     if(abilityDescription < length){
                         await axios.get(response.data.abilities[i].ability.url)
                         .then(res=>{
                             for(let x=0; x< res.data.effect_entries.length;x++)
                             {
                                 if(res.data.effect_entries[x].language.name === "en"){
                                     dsc.push(res.data.effect_entries[x].effect)
                                     setAbilityDescription(dsc)
                                 }
                             }
                         })
                         .catch(err=>console.log(err))
                     }

                     ablty.push(<p><b>{response.data.abilities[i].ability.name}</b>: {abilityDescription[i]}</p>)
                    
                 }
                 setAbilities(ablty)
             })
             .catch((err)=>{
                 setAbilities([<p>abilities not found</p>])
                 console.log('error for descriptions');
                 console.log(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                 console.log(err)
             })
    return(
            <div className='entry'>
                <Pokemon isShiny={isShiny} isFemale={isFemale} inMain={false}id={pokemon}/>
                <div className='pokemon-entry-big'>
                    <h1>{pokemon}</h1>
                    <h2>Description:</h2>
                    <p>{desc}</p>
                    <div className='ability-entry'>
                        <h2>Abilities :</h2>
                        {abilities}
                    </div>
                    <h2>Sprite settings:</h2>
                    <div className='sprite-setting'>
                        {diffFemale}
                        <br/>
                        <button className='shiny-btn' onClick={()=>{shinyHandle()}}>shiny</button>
                    </div>
                </div>
            </div>)
}
export default Entry