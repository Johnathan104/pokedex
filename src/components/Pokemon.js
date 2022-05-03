import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom'

import Type from './Type.js'
class Pokemon extends React.Component{
    constructor(props){
        super(props)
        this.setInfo = async () =>{
             //get info for the pokemon
        await  axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
        .then(async response=>{

            let [name,height, typess, weight, sprites, abilities, isShiny,isFemale] =  
                                                                    [this.makeFirstLetterCap(response.data.name),
                                                                    response.data.height,
                                                                    response.data.types, 
                                                                    response.data.weight,
                                                                    response.data.sprites,
                                                                    response.data.abilities,
                                                                    this.props.isShiny,
                                                                    this.props.isFemale] 
            // add the types
            let types=[]
            for(let i = 0; i <typess.length;i++){
                types.push(<Type key={i} type={typess[i].type.name}/>)
            }

            // handles sprite loading
            let sprite=''
            if(isShiny&& isFemale){
                sprite = sprites.front_shiny_female
            }
            else if(!isShiny && isFemale){
                sprite = sprites.front_female
            }else if(isShiny && !isFemale){
                sprite = sprites.front_shiny
            }
            else if(!isShiny && !isFemale){
                console.log(`shiny:${this.props.isShiny}`)
                sprite = sprites.front_default
            }
               
            // set the abilities
            let ability=[]
            for(let i = 0; i< abilities.length; i++){
                // checks if ability is hidden or not
                if (abilities[i].is_hidden === true){
                    ability.push(<p key={i}>{abilities[i].ability.name} (hidden);</p>)
                }
                else{
                    ability.push(<p key={i}>{abilities[i].ability.name};</p>)
                }
            }
            this.setState({
                name:name,
                sprite:sprite,
                height:height,
                weight:weight,
                types:types,
                abilities:ability,
            })
            this.setState({link:name})
        })
        .catch(error=>{
            console.log('error')
        })
        }
        this.state = {
            id:this.props.id,
            name:'',
            types:[null,null],
            sprite:[],
            height:'',
            weight:'',
            abilities:[],
            link:'',
        }
    } 
    // x stores the first letter and capitalizes it
    //the for loop adds the rest of the letter to the word
    makeFirstLetterCap(word){
        let x=word[0].toUpperCase()
        for(let i=1;i<word.length;i++){
            x+= word[i]
        }
        return x
    }
    componentDidMount(){
        this.setInfo()
    }
    componentDidUpdate(prevProps,prevState)
    {
        if(prevProps.isShiny !== this.props.isShiny || prevProps.isFemale !== this.props.isFemale){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
                .then(response=>{
                    let [isShiny,isFemale,sprites]= [this.props.isShiny, this.props.isFemale,response.data.sprites]
                    // handles sprite loading
                    let sprite=''
                    if(isShiny&& isFemale){
                        sprite = sprites.front_shiny_female
                    }
                    else if(!isShiny && isFemale){
                        sprite = sprites.front_female
                    }else if(isShiny && !isFemale){
                        sprite = sprites.front_shiny
                    }
                    else{
                        console.log(`shiny:${this.props.isShiny}`)
                        sprite = sprites.front_default
                    }
                    this.setState({
                        sprite:sprite
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
                
        }
    }
    render(){
        return(
            this.props.inMain?
            <Link style={{ textDecoration: 'none', color:'black'}} to={this.state.name.toLowerCase()}>
                <div className="pokemon">
                
                    <h2>{this.state.name}</h2>
                    <div className='topPart'>
                        {this.state.types}
                    </div>
                    <img alt='not loaded'src={this.state.sprite}/>
                    <p>height: {this.state.height}0 cm </p>
                    <p>weight: {this.state.weight}00 g</p>
                    <div className='abilities'>
                        <p>abilities :</p>
                        <div>
                            {this.state.abilities}
                        </div>
                    </div>
                </div>
            </Link> : 
            <div className="pokemon-entry">
                <h2>{this.state.name}</h2>
                <div className='topPart'>
                    {this.state.types}
                </div>
                {this.state.sprite?<img alt='not loaded'src={this.state.sprite}/>:<h2>not found</h2>}
                <p>height: {this.state.height}0 cm </p>
                <p>weight: {this.state.weight}00 g</p>
            </div>

        )
        
            
            
    }
}


export default Pokemon;