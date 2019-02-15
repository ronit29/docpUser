
const CRITEO = {

	sendData(data ){
		try{

			if(window){
			
				window.criteo_q = window.criteo_q || []
				var deviceType = navigator?/iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d":'';

				window.criteo_q.push({ 'event': "setAccount", account: 57439}, // You should never update this line
				{'event': "setEmail", 'email': ''},
				{ 'event': "setSiteType", type: deviceType},
				data
				)
			}

		}catch(e){

		}
	}
}

export default CRITEO