import LineChart from '../Charts/LineChart'

const index = () =>{
    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    return (
        <div id="outer-grid">
          <div><LineChart width={1400} height={800} margin={margin}/>?</div>
        <div id="inner-grid">
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
        </div>
      </div>
    )
}
export default index