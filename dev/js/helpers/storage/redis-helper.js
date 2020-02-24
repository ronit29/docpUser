const redis = require('redis');
import { API_GET } from '../../api/api.js';
import CONFIG from '../../config'

let client = null;
try{
	client = redis.createClient({
	    port      : 6379,               // replace with your port
	    host      : CONFIG.REDIS_HOST,  // replace with your hostanme or IP address
	    password  : undefined,    // replace with your password
	  });

	if(client) {
		client.on("error", function (err) {
		    console.log("Error " + err);
		});
	}
}catch(e){

}


var RedisHelper = {

	setData:(key, data)=>{
		if(client){
			client.set(key, JSON.stringify(data))
			client.expire(key, 30 * 86400);
		}	
	},
	getData:(key, cb)=>{
		if(client){
			client.get(key, function(err, resp){
				if(err || !resp){
					cb(null)
				}else{
					try{
						cb(JSON.parse(resp));
					}catch(e){
						client.del(key);
						cb(null);
					}
				}
			})
		}else{
			cb(null)
		}

	},
	getArticle:(dataParams)=>{
		return new Promise((resolve, reject)=>{
			RedisHelper.getData(dataParams.article_url, (resp)=>{

				if(resp){
					console.log('Data from redis');
					resolve(resp);
				}else{
					console.log('Data Fetch from API send to redis');
					let url = `/api/v1/article/detail?url=${dataParams.article_url}`
					return API_GET(url).then(function (response) {
						if(response){
							let dataClone = {...response}
							RedisHelper.setData(dataParams.article_url, response);
							resolve(dataClone);
						}
					}).catch(function (error) {
						reject(null);
					})
				}
			})
		})
	}

}

export default RedisHelper