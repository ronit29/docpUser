
const CRITEO = {

	sendData(data ){
		try{

			if(window){
			
				window.criteo_q = []
				var deviceType = navigator?/iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d":'';

				let criteo_data = [{ event: "setAccount", account: 57439}, // You should never update this line
				 { event: "setSiteType", type: deviceType}]
				
				criteo_data = criteo_data.concat(data)
				window.criteo_q = window.criteo_q.concat(criteo_data)
			}

		}catch(e){

		}
	}
}

export default CRITEO