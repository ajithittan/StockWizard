import LineChart from '../Charts/LineChart'

const index = () =>{
    var margin = {top: 20, right: 20, bottom: 30, left: 50}
    return (
        <div id="outer-grid">
          <div><LineChart width={1300} height={800} margin={margin} stock="AAPL"/>?</div>
        <div id="inner-grid">
          <div><LineChart width={300} height={200} margin={margin} stock="AAPL"/></div>
          <div><LineChart width={300} height={200} margin={margin} stock="AAPL"/></div>
        </div>
      </div>
    )
}
export default index