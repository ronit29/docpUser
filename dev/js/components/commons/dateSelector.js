import React from 'react';
const queryString = require('query-string');


class DateSelector extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        this.state = {
            newDob:null
        }
    }

    componentDidMount(){
        let self = this
        document.getElementById('newDate').addEventListener('input', function(e){
          this.type = 'text';
          var input = this.value;
          if(/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
          var values = input.split('/').map(function(v){return v.replace(/\D/g, '')});
          if(values[0]) values[0] = self.checkValue(values[0], 31);
          if(values[1]) values[1] = self.checkValue(values[1], 12);
          var output = values.map(function(v, i){
            return v.length == 2 && i < 2 ?  v + ' / ' : v;
          });

          self.props.getNewDate(output)
          this.value = output.join('').substr(0, 14);
        });
        var year =''
        var day = ''
        var month = ''
        document.getElementById('newDate').addEventListener('blur', function(e){
          this.type = 'tel';
          var input = this.value;
          var values = input.split('/').map(function(v){return v.replace(/\D/g, '')});
          var output = '';
          document.getElementById('result').innerText = 'Enter date as   Day / Month / Year';
          if(values.length == 3){
            year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
            day = parseInt(values[0]);
            month = parseInt(values[1]);            
            output = input;
          };
          self.props.getNewDate(day+'-'+month+'-'+year)
          this.value = output;
        });
    }

    checkValue(str, max){
      if(str.charAt(0) !== '0' || str == '00'){
        var num = parseInt(str);
        if(isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
      };
      return str;
    }
    
    render() {
        return (
           <div className="labelWrap">
                <input type="tel" id="newDate"/>
                <p id="result">Enter date as Month / Day / Year</p>
        </div>
        );
    }
}


export default DateSelector
