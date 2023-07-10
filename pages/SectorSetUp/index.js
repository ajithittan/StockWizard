import { getSession } from 'next-auth/react';
import { dbConnect } from '../../modules/DbConnect'
import SectorMaint from './SectorMaint'

function Sector({sectors}) {
    return(
        <SectorMaint sectors={sectors}></SectorMaint>
    )
}
// Triggered on each request
export async function getServerSideProps(context) {
	// Fetching data from an API
	//console.log("in function getServerSideProps",context)
	var session = await getSession(context);
	// Pass the data to the page via props
	var initModels = require("../../models/init-models"); 
	var models = initModels(dbConnect);
	const { Op } = require("sequelize");
	var stocksector = models.stocksector
	let dbresponse
	try {
		  await stocksector.findAll({  
		  attributes: ['sector','stocks','idstocksector'],
		  where: {
			iduserprofile: {
				  [Op.eq] : session.sessionUserId
		  }
		  }
		}).then(data => dbresponse=(data))
	  } catch (error) {
		console.log("getStockSectorsfromDB - Error",error)
	  }
	return {props: {sectors:JSON.parse(JSON.stringify(dbresponse))}};
}
export default Sector;