import React from 'react'
import Pokemon from './Pokemon'
import axios from 'axios';


class Main extends React.Component{
    constructor(){
        super()
        this.getPokes = async ()=>{
            var total=
            axios.get('https://pokeapi.co/api/v2/pokemon').then(res=>{
                total=1
                return res.data.count
            })
            // render all pokemons for the page
            total.then(async (res)=>{
                for(let i = 0; i<res;i++)
                {
                    // get the pokemon at id i+1
                    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
                        .then(()=>{
                            this.setState({
                            entries:[
                                ...this.state.entries,
                                <Pokemon isShiny={false} isFemale={false} inMain={true} key ={i} id={i+1}/>
                            ]})
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                }
            })
            .catch(error=>{

            })
        }
        this.state ={
            entries:[],
        } 
    }
    componentDidMount(){
        //call the function to get pokemons when the app starts
        this.getPokes()
    }
    render(){
        return(
                <div className='pokemons'>
                    {this.state.entries}
                </div>
        )
    }
}

export default Main;