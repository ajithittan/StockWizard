
const Duration = (props) => {

    return(
        <select className="Duration" id="Duration" onChange={e => props.changedval(e.target.value)} value={props.dur}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
            <option value="72">72</option>
            <option value="84">84</option>
            <option value="96">96</option>
            <option value="108">108</option>
            <option value="120">120</option>
        </select>
    )

}

export default Duration