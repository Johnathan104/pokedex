function Type(props){
    let src;
                // change the css class based on type
                switch(props.type)
                {
                    default:
                        src='none'
                        break;
                    case 'bug':
                        src ='bug-type type'
                        break;
                    case 'dark':
                        src ='dark-type type'
                        break;
                    case 'dragon':
                        src ='dragon-type type'
                        break;
                    case 'electric':
                        src ='electric-type type'
                        break;
                    case 'fairy':
                        src ='fairy-type type'
                        break;
                    case 'fighting':
                        src ='fighting-type type'
                        break;
                    case 'fire':
                        src ='fire-type type'
                        break;
                    case 'flying':
                        src ='flying-type type'
                        break;
                    case 'ghost':
                        src ='ghost-type type'
                        break;
                    case 'grass':
                        src ='grass-type type'
                        break;
                    case 'ground':
                        src ='ground-type type'
                        break;
                    case 'ice':
                        src ='ice-type type'
                        break;
                    case 'normal':
                        src ='normal-type type'
                        break;
                    case 'poison':
                        src ='poison-type type'
                        break;
                    case 'psychic':
                        src ='psychic-type type'
                        break;
                    case 'rock':
                        src ='rock-type type'
                        break;
                    case 'steel':
                        src ='steel-type type'
                        break;
                    case 'water':
                        src ='water-type type'
                        break;
                }
    return(
        <div key={props.key} className={src}>
                    <p className='type-text'>{props.type.toUpperCase()}</p>
                </div>
    )
}


export default Type;