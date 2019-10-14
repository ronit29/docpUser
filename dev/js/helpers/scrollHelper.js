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
			let target = this.props.target
			target.addEventListener('touchstart', (e)=>this.addTouchStartEvent(e), false)
			target.addEventListener('touchmove',  (e)=>this.addTouchMoveEvent(e), false)
			target.addEventListener('touchmove', (e)=>this.addTouchEndEvent(e), false)
			this.setState({setTarget: true})
		}
		
	}

	componentWillReceiveProps(nextProps) {
		if(!this.state.setTarget && nextProps.target) {
			let target = nextProps.target
			target.addEventListener('touchstart', (e)=>this.addTouchStartEvent(e), false)
			target.addEventListener('touchmove',  (e)=>this.addTouchMoveEvent(e), false)
			target.addEventListener('touchmove', (e)=>this.addTouchEndEvent(e), false)
			this.setState({setTarget: true})
		}
	}

	addTouchStartEvent(event){
		let touch = event.touches[0] || event.changedTouches[0]
		this.setState({touchstartX : touch.screenX, touchstartY : touch.screenY})
	}

	addTouchMoveEvent = (event)=>{
		let touch = event.touches[0] || event.changedTouches[0]
		this.setState({
			touchmoveX :  touch.screenX, touchmoveY : touch.screenY
		},()=>{
			this.handleGesture()	
		})
	}

	addTouchEndEvent(event){
		let touch = event.touches[0] || event.changedTouches[0]
		this.setState({
			touchendX : touch.screenX, touchendY : touch.screenY
		},()=>{
			this.handleGesture()	
		})
	}

	componentWillUnmount(){
		if(this.state.setTarget) {
			let target = this.props.target
			target.removeEventListener('touchstart', this.addTouchStartEvent)
			target.removeEventListener('touchmove',  this.addTouchMoveEvent)
			target.removeEventListener('touchmove', this.addTouchEndEvent)
		}
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
	    }

	    this.props.getScrollView({...this.state, swipe})

	}

	render(){
		return ''
	}
}
export default ScrollView