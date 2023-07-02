function Sector({time}) {
    console.log("time",time)
	// Render the fetched time
    return(
        <div><p>time?</p></div>
    )
}
// Triggered on each request
export async function getServerSideProps() {
	// Fetching data from an API
	const res = await fetch('https://worldtimeapi.org/api/ip');
	const time = await res.json();
	// Pass the data to the page via props
	return {props: {time}};
}
export default Sector;