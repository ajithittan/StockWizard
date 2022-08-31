import { useEffect, useState } from 'react'

const ListingOfStocks = (props) => {

    const [stkList,setStkList] = useState(null)

    useEffect(() =>{
        if (!stkList && props.stocks){
            let arr = []
            for(let i=0;i<props.stocks.length;i++){
                let chkVals = {'stock':props.stocks[i],'value':checkStock(props.stocks[i])}
                arr.push(chkVals)
            }
            setStkList(arr)
        }
    },[props.stocks,props.checked])

    const checkStock = (stk) =>{
        let retval = true
        props.checked ? props.checked.filter(item => item === stk).length > 0 ? retval=true : retval=false : null
        return retval
    }

    const handleOnChange = (e,stk) =>{
        setStkList(stkList.map(x => (x.stock === stk) ? {'stock':stk,'value':e.target.checked ? true : false} : x))
        e.target.checked ? props.add(stk) : props.remove(stk)
    }

    return(
        <>
        {
            stkList ? stkList.sort((a,b) => a > b).map(
                (item,index) => <div style={{paddingTop:'10px',paddingLeft:'10px'}}>
                            <input
                            type="checkbox"
                            id={"chk" + index}
                            name={item.stock}
                            value={item.stock}
                            checked={item.value}
                            onChange={(e) => handleOnChange(e,item.stock)}
                            />
                            {item.stock}
                    </div>
            ) : null
        }
        </>
    )
}
export default ListingOfStocks