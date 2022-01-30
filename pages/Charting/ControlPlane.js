const ControlPlane = (props) =>{

    return(
        <select className="Duration" id="Duration" onChange={e => props.onChangeDuration(e.target.value)}>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
        </select>
    )

}
export default ControlPlane