const Delay = (delayInms) =>{
        return new Promise(resolve => setTimeout(resolve, delayInms));
}

export default Delay