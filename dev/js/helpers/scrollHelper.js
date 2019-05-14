import React from 'react'

class ScrollView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			setTarget: false,
			touchstartX : 0,
			touchstartY :0,
			touchendX : 0,
			touchendY : 0,
			touchmoveX: 0,
			touchmoveY: 0			
		}
	}

	componentDidMount() {
		if(this.props.target && !this.state.setTarget) {
			
			this.addTouchStartEvent(this.props.target)
			this.addTouchMoveEvent(this.props.target)
			this.addTouchEndEvent(target)	
			this.setState({setTarget: true})
		}
		
	}

	componentWillReceiveProps(nextProps) {
		if(!this.state.setTarget && nextProps.target) {
			
			this.addTouchStartEvent(nextProps.target)
			this.addTouchEndEvent(nextProps.target)	
			this.addTouchMoveEvent(nextProps.target)
			this.setState({setTarget: true})
		}
	}

	addTouchStartEvent(target){
		let self = this
		target.addEventListener('touchstart', function(event) {
			let touch = event.touches[0] || event.changedTouches[0]

			self.setState({touchstartX : touch.screenX, touchstartY : touch.screenY})
		}, false)
	}

	addTouchMoveEvent(target){
		let self = this
		target.addEventListener('touchmove', function(event) {
			let touch = event.touches[0] || event.changedTouches[0]
			self.setState({
				touchmoveX :  touch.screenX, touchmoveY : touch.screenY
			},()=>{
				self.handleGesture()	
			})
		}, false);
		
	}

	addTouchEndEvent(target){
		let self = this
		target.addEventListener('touchend', function(event) {
			let touch = event.touches[0] || event.changedTouches[0]

			self.setState({
				touchendX : touch.screenX, touchendY : touch.screenY
			},()=>{
				self.handleGesture()	
			})
		    
		}, false);
		
	}

	handleGesture(){
	    let swipe = ''
	    /*if (SCROLL.touchendX < SCROLL.touchstartX) {
	        return (swiped + 'left!');
	    }
	    if (SCROLL.touchendX > SCROLL.touchstartX) {
	        return (swiped + 'right!');
	    }*/
	    if (this.state.touchendY < this.state.touchstartY || this.state.touchmoveY< this.state.touchstartY) {
	        swipe = 'down'
	    }
	    if (this.state.touchendY > this.state.touchstartY || this.state.touchmoveY > this.state.touchstartY) {
	        swipe = 'up'
	    }console.log(this.state)

	    this.props.getScrollView({...this.state, swipe})

	}

	render(){
		return ''
	}
}
export default ScrollView