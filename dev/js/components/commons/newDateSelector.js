import React from 'react';
const queryString = require('query-string');


class NewDateSelector extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          newDob:null,
          calcualatedAge:null,
          toCalculateAge:true,
          isValidDob:true,
          isFocused:false
        }
    }


    onInpType(){
      let self = this
        let isValidDob
        var output
        let id = this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate';
        document.getElementById(id).addEventListener('input', function(e){
            this.type = 'text';
            var input = this.value;
            if(/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
            var values = input.split('/').map(function(v){return v.replace(/\D/g, '')});
            if(values[0]) values[0] = self.checkValue(values[0], 31);
            if(values[1]) values[1] = self.checkValue(values[1], 12);
            if(values.length ==3){
               isValidDob = self.isValidDate(values[0],values[1],values[2])
               if(values[2].length == 4){
                  self.calculateAge(values[2]+'-'+values[1]+'-'+values[0])
               }
               self.props.getNewDate('dob',values[2]+'-'+values[1]+'-'+values[0],isValidDob)  
            }
            output = values.map(function(v, i){
              return v.length == 2 && i < 2 ?  v + ' / ' : v;
            });
            this.value = output.join('').substr(0, 14);
        },()=>{
          if(output){
            self.setState({newDob:output,isValidDob:isValidDob})
          }
        });
    }

    onInpBlur(){
      let self = this
        let isValidDob
        var output
        let id = this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate';
        var year =''
        var day = ''
        var month = ''
        document.getElementById(id).addEventListener('blur', function(e){
            this.type = 'tel';
            var input = this.value;
            var values = input.split('/').map(function(v){return v.replace(/\D/g, '')});
            var output = '';
            if(values.length == 3){
              year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
              day = parseInt(values[0]);
              month = parseInt(values[1]);            
              output = input;
            };
            isValidDob = self.isValidDate(day,month,year)
            self.props.getNewDate('dob',year+'-'+month+'-'+day,isValidDob)
            if(year.length == 4){
              self.calculateAge(year+'-'+month+'-'+day)
            }
            this.value = output;
            self.setState({newDob:output,isValidDob:isValidDob,isFocused:false})
        });
    }

    componentWillReceiveProps(){
        if(this.props.old_dob){
            let oldDob = this.props.old_dob.split('-')
            if(this.state.toCalculateAge){
              this.calculateAge(this.props.old_dob)
              this.setState({toCalculateAge:false})
            }
            this.setState({newDob:oldDob[2]+ '/' + oldDob[1]+ '/' + oldDob[0]})
        }
    }

    checkValue(str, max){
      if(str.charAt(0) !== '0' || str == '00'){
        var num = parseInt(str);
        if(isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
      };
      return str;
    }

    isValidDate (d, m, y) {
       var m = parseInt(m, 10) - 1;
        return m >= 0 && m < 12 && d > 0 && d <= this.daysInMonth(m, y);
    }

    daysInMonth (m, y) {
      switch (m) {
          case 1 :
              return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
          case 8 : case 3 : case 5 : case 10 :
              return 30;
          default :
              return 31
      }
    }

    calculateAge(dateString) { // birthday is a date
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if(age >= 0){
          this.setState({calcualatedAge:age})
        }
    }
    
    render() {
        return (
           <div className="labelWrap ddmminput" style={{border:this.props.is_dob_error?'1px solid red':''}}>
                <input type="tel" id={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`} ref='dob' value={this.state.newDob} required name={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`} onChange={this.onInpType.bind(this)} onBlur = {this.onInpBlur.bind(this)} onFocus={()=>{this.setState({isFocused:true})}}/> 
                {
                  this.state.calcualatedAge && this.state.isValidDob?
                  <span className="input-year">{this.state.calcualatedAge?this.state.calcualatedAge:''} years</span>
                  : this.state.newDob && !this.state.isValidDob?
                  <span className="input-year dob-error">Invalid DOB</span>
                  :''
                }
                <label className= {`sumry-lbl ${this.state.newDob || this.state.isFocused?'is-inp-focused':''}`} for={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`}>Date of Birth (DD/MM/YYYY)</label>
               {/* <p id="result">{this.props.is_dob_error?'Enter Valid DOB':''}</p>*/}
        </div>
        );
    }
}


export default NewDateSelector
