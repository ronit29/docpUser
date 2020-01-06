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
          isFocused:false,
          months:null,
          inValidText:''
        }
    }

    componentDidMount(){
      var new_date = new Date();
      var currentYear = new_date.getFullYear();
      var currentExactDay = currentYear+'-'+(new_date.getMonth().toString().length == 1?'0' + (new_date.getMonth() == 0?1:new_date.getMonth()):new_date.getMonth())+'-'+(new_date.getDate().toString().length == 1?'0'+new_date.getDate():new_date.getDate())
      let self = this
      let isValidDob
      var output
      let inValidText=''
      let id = this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate';
        var year =''
        var day = ''
        var month = ''
        document.getElementById(id).addEventListener('input', function(e){
            this.type = 'text';
            var input = this.value;
            if(/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
            var values = input.split('/').map(function(v){return v.replace(/\D/g, '')});
            if(values[0]) values[0] = self.checkValue(values[0], 31);
            if(values[1]) values[1] = self.checkValue(values[1], 12);
            output = values.map(function(v, i){
              return v.length == 2 && i < 2 ?  (v + ' / ') : v;
            });
            this.value = output.join('').substr(0, 14);
            if(values.length ==3){
               if(values[2].length == 4){
                  if(values[2] <= (currentYear - 100)){
                    isValidDob = false
                    inValidText="*Patient's age is not applicable. We serve patients less than 100 years old."
                  }else if(values[2] > currentYear || values[2]+'-'+values[1]+'-'+values[0] > currentExactDay){
                      isValidDob = false
                      inValidText =''
                  }else{
                      inValidText= ''
                      isValidDob = self.isValidDate(values[0],values[1],values[2])
                      self.calculateAge(values[2]+'-'+values[1]+'-'+values[0])  
                  }
                  self.props.getNewDate('dob',values[2]+'-'+values[1]+'-'+values[0],isValidDob) 
                  self.setState({newDob:output.join('').substr(0, 14),isValidDob:isValidDob,inValidText:inValidText})
               }
            }
            if(values.length == 1 && values[0]== ""){
                self.setState({newDob:null,isValidDob:true,inValidText:'',calcualatedAge:null})
            }
        });

        document.getElementById(id).addEventListener('blur', function(e){
            this.type = 'tel';
            var input = this.value;
            var values = input.split('/').map(function(v){return v.replace(/\D/g, '')});
            var output = '';
            if(values.length == 3){
              year = values[2].length !== 4 ? parseInt(values[2]) + 1900 : parseInt(values[2]);
              day = parseInt(values[0]);
              month = parseInt(values[1]);            
              var d = new Date(year, month, day);           
              if(!isNaN(d)){
                var dates = [d.getDate(), d.getMonth(), d.getFullYear()];
                output = dates.map(function(v){
                  v = v.toString();
                  return v.length == 1 ? '0' + v : v;
                }).join(' / ');
              };
            };
            this.value = output;
            if(year.toString().length == 4){
                month = month.toString().length == 1? '0'+ month : month
                day = day.toString().length == 1? '0'+ day : day
                if(year <= (currentYear - 100)){
                  inValidText = "*Patient's age is not applicable. We serve patients less than 100 years old."
                  isValidDob = false
                }else if(year >currentYear || year+'-'+month+'-'+day > currentExactDay){
                  isValidDob = false
                  inValidText =''
                }else{
                  inValidText = ''
                  isValidDob = self.isValidDate(day,month,year)
                  self.calculateAge(year+'-'+month+'-'+day)
                }
                self.props.getNewDate('dob',year+'-'+month+'-'+day,isValidDob)
                self.setState({newDob:output,isValidDob:isValidDob,isFocused:false, inValidText:inValidText})
              }
        });
    }

    componentWillReceiveProps(nextProps){
      var d = new Date();
      var currentYear = d.getFullYear();
      var currentExactDay = currentYear+'-'+(d.getMonth().toString().length == 1?'0' + (d.getMonth() == 0?1:d.getMonth()):d.getMonth())+'-'+(d.getDate().toString().length == 1?'0'+d.getDate():d.getDate())
      let isValidDob
      let inValidText=''
      let FormattedYear
      let FormattedDay 
      let FormattedMnth
        if(nextProps.old_dob && nextProps.old_dob != ''){
            let oldDob = nextProps.old_dob.split('-')
            // if(this.state.toCalculateAge){
              if(oldDob.length ==3){
                if(oldDob[0].length ==4){
                  FormattedYear = oldDob[0]
                  FormattedDay = oldDob[2].length == 1 ? ('0'+oldDob[2]):  oldDob[2]
                  FormattedMnth =  oldDob[1].length == 1 ? ('0'+oldDob[1]):  oldDob[1]
                  if(FormattedYear <= (currentYear - 100)){
                    isValidDob = false
                    inValidText = "*Patient's age is not applicable. We serve patients less than 100 years old."
                  }else if(FormattedYear > currentYear || FormattedYear+'-'+FormattedMnth+'-'+FormattedDay > currentExactDay){
                    isValidDob = false
                    inValidText =''
                  }else{
                    inValidText =''
                    isValidDob = this.isValidDate(FormattedDay,FormattedMnth,FormattedYear)
                    this.calculateAge(FormattedYear+'-'+FormattedMnth+'-'+FormattedDay)
                  }
                }
                this.setState({newDob:FormattedDay+ ' / ' + FormattedMnth+ ' / ' + FormattedYear,isValidDob:isValidDob,toCalculateAge:false, inValidText:inValidText})
              }
            // }
        }
        if(nextProps.old_dob == ''){
            this.setState({newDob:null,isValidDob:true,toCalculateAge:false, inValidText:''})
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
        let dateFrom = new Date(birthDate.getFullYear() , birthDate.getMonth())
        let dateTo = new Date(today.getFullYear(),today.getMonth())
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        let mnth_val = this.monthDiff(dateFrom,dateTo)
        this.setState({calcualatedAge:age,months:mnth_val})
    }

    monthDiff(dateFrom, dateTo) {
     return dateTo.getMonth() - dateFrom.getMonth() + 
       (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    }
    render() {
      let borderStyle
      if((this.props.is_dob_error || this.state.inValidText) && this.props.is_summary){
        borderStyle = {borderBottom:'1px solid red'}
      }else if(this.props.is_dob_error || this.state.inValidText){
        borderStyle = {border:'1px solid red'}
      }

        return (
           <div className="labelWrap ddmminput">
                <input type="tel" id={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`} ref='dob' value={this.state.newDob?this.state.newDob:''} required name={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`} onFocus={()=>{this.setState({isFocused:true})}} maxLength="14" disabled={this.props.user_form_id && this.props.disableDob?'disabled':''} style={borderStyle} placeholder={`${this.props.is_summary?'DD/MM/YYYY':''}`}/> 
                {
                  this.state.calcualatedAge >0 && this.state.isValidDob?
                  <span className="input-year">{this.state.calcualatedAge} years</span>
                  :this.state.calcualatedAge ==0 && this.state.isValidDob?
                  <span className="input-year">{this.state.months} months</span>
                  : this.state.newDob && !this.state.isValidDob?
                  this.state.inValidText?''
                  :<span className="input-year dob-error">Invalid DOB</span>
                  :''
                }
                <label className= {`sumry-lbl ${this.state.newDob || this.state.isFocused?'is-inp-focused':''}`} htmlFor={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`}>Date of Birth (DD/MM/YYYY)</label>
               {this.state.inValidText? <p className="fw-500" style={{color:'red',fontSize:9}}>{this.state.inValidText}</p>:''}
        </div>
        );
    }
}


export default NewDateSelector
