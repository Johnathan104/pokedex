import React from 'react'
import Pokemon from './Pokemon'
import axios from 'axios';
import {Link} from 'react-router-dom'

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
            search:'',
            entries:[],
        } 
    }
    componentDidMount(){
        //call the function to get pokemons when the app starts
        this.getPokes()
    }
    searchHandle(event){
        this.setState({search:event.target.value})
        console.log(this.state.search)
    }

    render(){
        return(
                <div className='main'>
                    <div className='search'>
                        <input placeholder='search for the exact pokemon name and then click' className='search-bar' type='text' onChange={(event)=>this.searchHandle(event)}/>
                        {this.state.search.length!==0?
                            <Link to={this.state.search.toLowerCase()}>
                                <button className='search-btn'>
                                    Find
                                </button>
                            </Link>
                            :
                            <button className='search-btn'>Find</button>}
                    </div>
                    <div className='pokemons'>
                        {this.state.entries}
                    </div>
                </div>
        )
    }
}

export default Main;