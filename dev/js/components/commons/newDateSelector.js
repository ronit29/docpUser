import React from 'react';
const queryString = require('query-string');


class NewDateSelector extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          newDob:'',
          calcualatedAge:null,
          toCalculateAge:true,
          isValidDob:true,
          isFocused:false,
          months:null,
          inValidText:''
        }
    }

    componentDidMount(){
        this.initialDobToState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.initialDobToState(nextProps)        
    }

    initialDobToState(nextProps){
      var d = new Date();
      var currentYear = d.getFullYear();
      var currentExactDay = currentYear+'-'+(d.getMonth().toString().length == 1?'0' + (d.getMonth() == 0?1:d.getMonth() + 1):d.getMonth())+'-'+(d.getDate().toString().length == 1?'0'+d.getDate():d.getDate())
      let isValidDob
      let inValidText=''
      let FormattedYear
      let FormattedDay 
      let FormattedMnth
      if(nextProps.old_dob && nextProps.old_dob != ''){
        let oldDob = nextProps.old_dob.split('-')
         if(this.state.toCalculateAge ||  nextProps.isForceUpdateDob){
          if(oldDob.length ==3){
            if(oldDob[0].length ==4){
              FormattedYear = oldDob[0]
              FormattedDay = oldDob[2].length == 2 && oldDob[2] >31?'0'+oldDob[2].charAt(0):oldDob[2]
              FormattedMnth = oldDob[1].length == 2 && oldDob[1] >12?'0'+oldDob[1].charAt(0):oldDob[1]
              if(FormattedYear <= (currentYear - 100)){
                isValidDob = false
                inValidText = "*Patient's age is not applicable. We serve patients less than 100 years old."
                this.props.getNewDate('dob',FormattedYear+'-'+FormattedMnth+'-'+FormattedDay,isValidDob) 
              }else if(FormattedYear > currentYear || FormattedYear+'-'+FormattedMnth+'-'+FormattedDay > currentExactDay){
                isValidDob = false
                inValidText =''
                this.props.getNewDate('dob',FormattedYear+'-'+FormattedMnth+'-'+FormattedDay,isValidDob) 
              }else{
                inValidText =''
                isValidDob = this.isValidDate(FormattedDay,FormattedMnth,FormattedYear,this.props.is_gold?true:false)
                this.calculateAge(FormattedYear+'-'+FormattedMnth+'-'+FormattedDay)
              }
              if(FormattedDay && FormattedMnth && FormattedYear){
                if(this.props.is_gold){
                  this.props.unSetForceUpdateDob()
                }
                this.setState({newDob:FormattedDay+ '/' + FormattedMnth+ '/' + FormattedYear,isValidDob:isValidDob,toCalculateAge:false, inValidText:inValidText})
              }
            }
          }
        }
      }

      if(nextProps.old_dob == ''){
          this.setState({newDob:null,isValidDob:true, inValidText:'',calcualatedAge:null,months:null})
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

    isValidDate (d, m, y,is_forced) {
      let initial_month = m; // to store initial month value 
      var m = parseInt(m, 10) - 1;
      let is_valid= m >= 0 && m < 12 && d > 0 && d <= this.daysInMonth(m, y)
      if(is_forced && is_valid){
        this.props.getNewDate('dob',y+'-'+initial_month+'-'+d,is_valid) 
      }
      return is_valid;
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

    keyPressFunc(e) {
      let isValidDob = true
      let inValidText = ''
      if(e.which === 8) {
        var val = this.state.newDob;
        if(val && val.length == 0){
            this.setState({newDob:null},()=>{
              this.props.getNewDate('dob',null,false) 
            })
        }
        if(val.length){
          if(val.length == 3 || val.length == 6 || val.length == 4 || val.length == 1) {
              val = val.slice(0, val.length-1);
              this.setState({newDob:val,isValidDob:isValidDob,inValidText:inValidText,calcualatedAge:null,months:null})
          }else{
              this.setState({isValidDob:isValidDob,inValidText:inValidText,calcualatedAge:null,months:null})
          }
        }
      }
    }

    handleChange(e) {
      var new_date = new Date();
      var currentYear = new_date.getFullYear();
      var currentExactDay = currentYear+'-'+(new_date.getMonth().toString().length == 1?'0' + (new_date.getMonth() == 0?1:new_date.getMonth()+ 1):new_date.getMonth())+'-'+(new_date.getDate().toString().length == 1?'0'+new_date.getDate():new_date.getDate())
      let self = this
      let isValidDob = true
      let inValidText=''
      let id = this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate';
      var val = e.target.value;
      let staticDay = ['1','2','3','0']
      let staticMnth = ['11','12','0','1']
      let checkValidMonthThirtyOne = ['00','2','02','4','04','6','06','9','09']
      let checkValidMonthThirty = ['00','2','02']

        if(val.length == 1){
          if(isNaN(val)){
            val = null
          }else{
            if(staticDay.indexOf(val) == -1){
              val = '0'+val + '/'
            }
          }
          this.setState({newDob:val})
        }else if (val.length === 2) {
          if(val != "00" && val <=31){
            val += '/'
          }else if(val.includes('/')){
            val = '0'+val
          }else{
            val  = val.charAt(0)
          }
          this.setState({newDob:val,isValidDob:isValidDob,inValidText:inValidText})
        }else if(val.length === 4){
          val = val.split('/').map(function(v){return v.replace(/\D/g, '')})
            if(val[1] ==""){
              val = val[0] + '/'
            }else{
              if(val[0] == '31' && checkValidMonthThirtyOne.indexOf(val[1]) != -1){
                val = val[0]+'/'
              }else if(val[0] == '30' && val[1] == '2'){
                val = val[0]+'/'
              }else{
                if(staticMnth.indexOf(val[1]) == -1){
                  val = val[0] + '/' + '0'+val[1] + '/'
                }else{
                  val = val[0] + '/' +val[1]
                }
              }
            }
            this.setState({newDob:val,isValidDob:isValidDob,inValidText:inValidText})
        }else if (val.length === 5) {
           val = val.split('/')
           if(isNaN(val[1])){
              val = val[0]+'/'+ val[1].charAt(0)
           }else{
            if(val[1] > 12){
              val = val[0]+'/'+ val[1].charAt(0)
            }else{
              if(val[0] == '31'){
                  if(checkValidMonthThirtyOne.indexOf(val[1]) != -1 || val[1] ==11){
                    val = val[0]+'/'+ val[1].charAt(0)
                  }else{
                    val = val[0]+'/'+ val[1] +'/'  
                  }
              }else if(val[0] == '30' && checkValidMonthThirty.indexOf(val[1]) != -1){
                val = val[0]+'/'+ val[1].charAt(0)
              }
              else{
                  val = val[0]+'/'+ val[1] +'/'
              }
            }
          }
          this.setState({newDob:val,isValidDob:isValidDob,inValidText:inValidText})
        }else if(val.length > 5){
          val = val.split('/').map(function(v){return v.replace(/\D/g, '')})
          if(val.length ==3){
                var FormattedDay = val[0].length == 2 && val[0] >31?'0'+val[0].charAt(0):val[0]
                var FormattedMonth = val[1].length == 2 && val[1] >12?'0'+val[1].charAt(0):val[1]
                var FormattedYear = val[2]
               if(FormattedYear.length == 4){
                  if(FormattedYear <= (currentYear - 100)){
                    isValidDob = false
                    inValidText="*Patient's age is not applicable. We serve patients less than 100 years old."
                  }else if(FormattedYear > currentYear || FormattedYear+'-'+FormattedMonth+'-'+FormattedDay > currentExactDay){
                      isValidDob = false
                      inValidText =''
                  }else{
                      inValidText= ''
                      isValidDob = this.isValidDate(FormattedDay,FormattedMonth,FormattedYear,false)
                      this.calculateAge(FormattedYear+'-'+FormattedMonth+'-'+FormattedDay)  
                  }
                  this.props.getNewDate('dob',FormattedYear+'-'+FormattedMonth+'-'+FormattedDay,isValidDob) 
                  this.setState({newDob:FormattedDay + '/' +FormattedMonth + '/' + FormattedYear,isValidDob:isValidDob,inValidText:inValidText})
               }else{
                  val = FormattedDay + '/' +FormattedMonth + '/' + FormattedYear
                  this.setState({newDob:val,isValidDob:isValidDob,inValidText:inValidText})
                }
            }
        }
    }

    isBlured(){
      var new_date = new Date();
      let isValidDob
      let inValidText = ''
      var dateOfBirth = this.state.newDob
      var currentYear = new_date.getFullYear();
      var currentExactDay = currentYear+'-'+(new_date.getMonth().toString().length == 1?'0' + (new_date.getMonth() == 0?1:new_date.getMonth()+ 1):new_date.getMonth())+'-'+(new_date.getDate().toString().length == 1?'0'+new_date.getDate():new_date.getDate())
      if(dateOfBirth){
        dateOfBirth = dateOfBirth.split('/')
          if(dateOfBirth.length ==3){
              dateOfBirth[2] = dateOfBirth[2].length !== 4 && dateOfBirth[2].length ==2  ? (dateOfBirth[2] >='20'?('19'+ dateOfBirth[2]):('20' + dateOfBirth[2]))  : dateOfBirth[2]
              dateOfBirth[1] = dateOfBirth[1].length != 2? '0'+dateOfBirth[1]:dateOfBirth[1]
               if(dateOfBirth[2].length == 4){
                  if(dateOfBirth[2] <= (currentYear - 100)){
                    isValidDob = false
                    inValidText="*Patient's age is not applicable. We serve patients less than 100 years old."
                  }else if(dateOfBirth[2] > currentYear || dateOfBirth[2]+'-'+dateOfBirth[1]+'-'+dateOfBirth[0] > currentExactDay){
                      isValidDob = false
                      inValidText =''
                  }else{
                      inValidText= ''
                      isValidDob = this.isValidDate(dateOfBirth[0],dateOfBirth[1],dateOfBirth[2],false)
                      this.calculateAge(dateOfBirth[2]+'-'+dateOfBirth[1]+'-'+dateOfBirth[0])  
                  }
                  this.props.getNewDate('dob',dateOfBirth[2]+'-'+dateOfBirth[1]+'-'+dateOfBirth[0],isValidDob) 
                  this.setState({newDob:dateOfBirth[0] + '/' +dateOfBirth[1] + '/' + dateOfBirth[2],isValidDob:isValidDob,inValidText:inValidText})
               }else{
                  dateOfBirth = dateOfBirth[0] + '/' +dateOfBirth[1] + '/' + dateOfBirth[2]
                  this.setState({newDob:dateOfBirth,isValidDob:isValidDob,inValidText:inValidText})
                }
            }
      }
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
                <input type="tel" id={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`} ref='dob' value={this.state.newDob?this.state.newDob:''} required name={`${this.props.is_gold?'newDate_'+this.props.user_form_id:'newDate'}`} onFocus={()=>{this.setState({isFocused:true})}} maxLength="10" disabled={this.props.user_form_id && this.props.disableDob?'disabled':''} style={borderStyle} placeholder={`${this.props.is_summary?'DD/MM/YYYY':''}`} onChange={this.handleChange.bind(this)} onKeyDown={this.keyPressFunc.bind(this)} onBlur={this.isBlured.bind(this)}/> 
                {
                  this.state.calcualatedAge >0 && this.state.isValidDob?
                  <span className="input-year">{this.state.calcualatedAge} {this.state.calcualatedAge ==1?'year':'years'}</span>
                  :this.state.calcualatedAge ==0 && this.state.isValidDob?
                  <span className="input-year">{this.state.months} {this.state.months ==1?'month':'months'}</span>
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
