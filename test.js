const axios = require('axios');


axios.get('https://pokeapi.co/api/v2/pokemon').then(res=>{
    console.log(res)
})