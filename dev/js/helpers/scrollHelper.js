const SCROLL = {
	
	touchstartX : 0,
	touchstartY :0,
	touchendX : 0,
	touchendY : 0,

	addTouchStartEvent: (target) => {

		document.getElementById(target).addEventListener('touchstart', function(event) {
		    touchstartX = event.changedTouches[0].screenX
		    touchstartY = event.changedTouches[0].screenY
		}, false)
	},

	addTouchEndEvent: (target) => {
		
	},

	handleGesture: ()=> {

	},

	addEvents: (target)=> {
		console.log(target)
		if(document.getElementById(target)) {
			console.log(document.getElementById(target))
			SCROLL.addTouchEndEvent(target)
			SCROLL.addTouchStartEvent(target)	
		}
	}


}

export default SCROLL