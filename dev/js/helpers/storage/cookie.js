module.exports = {
	request: null,
	
	init:function(req){
		this.request = req;
	},

	getReq: function(){
		return this.request
	}
}

