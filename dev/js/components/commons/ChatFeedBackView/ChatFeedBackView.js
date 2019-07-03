import React from 'react'
import ChatFeedBack from './ChatFeedBack.js'
import ChatQuestion1 from './ChatQuestion1.js'
import ChatQuestion2 from './ChatQuestion2.js'
import ChatQuestion3 from './ChatQuestion3.js'
import ChatQuestion4 from './ChatQuestion4.js'
import ChatQuestion5 from './ChatQuestion5.js'
import ChatThanksPage from './ChatThanksPage.js'
import { Route } from 'react-router-dom'


class ChatFeedBackView extends React.Component {

	render(){

		return(
			<div>

				<Route exact path={`${this.props.match.url}/`} render={(props) => {
                    return <ChatQuestion1 {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}/ques1`} render={(props) => {
                    return <ChatQuestion1 {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}/ques2`} render={(props) => {
                    return <ChatQuestion2 {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}/ques3`} render={(props) => {
                    return <ChatQuestion3 {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}/ques4`} render={(props) => {
                    return <ChatQuestion4 {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}/ques5`} render={(props) => {
                    return <ChatQuestion5 {...this.props} {...props} />
                }} />

                <Route exact path={`${this.props.match.url}/thanks`} render={(props) => {
                    return <ChatThanksPage {...this.props} {...props} />
                }} />
            </div>
			)
	}
}

export default ChatFeedBackView