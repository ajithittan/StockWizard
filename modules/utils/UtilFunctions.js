const intToString = (value) => {
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}

const getConciseValuesForLargeNums = (inpVal) =>{
    if (Math.abs(inpVal) < 1000) { return inpVal}
    else if (Math.abs(inpVal/1000000) < 1000)
        { return parseFloat(inpVal/1000000).toFixed(2) + "M"}
    else if (Math.abs(inpVal/1000000) >= 1000){
        { return parseFloat(inpVal/1000000000).toFixed(2) + "B"}
    }    
}

const getColorFromPreDefinedSeq = (inpSeq) => {
    const colorList = [{"seq":0,"color":"red"},{"seq":1,"color":"black"},{"seq":2,"color":"#a7d129"},
        {"seq":3,"color":"brown"},{"seq":4,"color":"orange"},{"seq":5,"color":"purple"},{"seq":6,"color":"green"}]
        console.log("inpSeq",colorList.filter(item => item.seq === inpSeq))
    return colorList.filter(item => item.seq === inpSeq)[0].color || "gray"        
}

export {intToString,getConciseValuesForLargeNums,getColorFromPreDefinedSeq}