let static_cache = 'static-7'
let cache_dynamic_name = 'dynamic_caching_14'	
let API_TO_CACHED = ['api/v1/diagnostic/labsearch', 'api/v1/location/static-speciality-footer', 'api/v1/doctor/commonconditions?city=Delhi']


function trimCache(cacheName, maxSize){
	caches.open(cacheName).then((cache)=>{

		return cache.keys().then((keys)=>{
			if(keys.length>maxSize){
				cache.delete(keys[keys.length-1]).then(trimCache(cacheName, maxSize))
			}
		})

	})
}


self.addEventListener('install', function(event){
	console.log('Service Worker Installed.....');
	event.waitUntil(
		caches.open(static_cache).then((cache)=>{
			console.log('Precache APplication assets.....')
			cache.add('/offline.html');
			cache.add('api/v1/diagnostic/labsearch');
			cache.add('api/v1/location/static-speciality-footer');
			cache.add('api/v1/doctor/commonconditions?city=Delhi');
			//cache.addAll(['/offline.html', 'api/v1/diagnostic/labsearch', 'api/v1/location/static-speciality-footer', 'api/v1/doctor/commonconditions?city=Delhi'])
			//cache.addAll(['/','/dist/0.bundle.js', '/dist/1.bundle.js', '/dist/2.bundle.js', '/dist/3.bundle.js', '/dist/4.bundle.js', '/dist/5.bundle.js', '/dist/6.bundle.js', '/dist/7.bundle.js', '/dist/8.bundle.js', '/dist/main.bundle.js', '/dist/vendor~main.bundle.js', '/dist/style.bundle.css'])
		})
		)
})

self.addEventListener('activate', function(event){
	event.waitUntil(caches.keys().
		then((keylist)=>{
			return Promise.all(keylist.map((key)=>{
				if(key!= cache_dynamic_name && key!= static_cache){
					console.log('Deleting key from SW', key);
					return caches.delete(key);
				}
			}))
		})
	)
	console.log('Service Worker activated.....')
})

//Cache then network fallback
// self.addEventListener('fetch', function(event){
// 	console.log('Service Worker url.....', event.request);
// 	event.respondWith(
// 		caches.match(event.request).then((resp)=>{
// 			if(resp){
// 				console.log('resp from cache........................');
// 				return resp;
// 			}else{

// 				if((event.request.url).includes('api')){
// 					console.log('API request from Sevice Worker........................');
// 					return fetch(event.request)
// 				}else{
// 					return fetch(event.request).
// 					then((newResponse)=>{
// 						console.log('API request from Sevice Worker and Cache the request........................');
// 						return caches.open(static_cache)
// 						.then((cache)=>{
// 							console.log('Dynamic cache is ', event.request);
// 							cache.put(event.request, newResponse.clone());
// 							return newResponse;
// 						})
// 					}).catch((e)=>{
// 						console.log('Offline page returned from cache................................');
// 						return caches.open(static_cache)
// 							.then((cache)=>{
// 								return cache.match('/offline.html')
// 							})
// 						console.log('Error caught', e);
// 					})
// 				}
// 			}
// 		}).catch((e)=>{
// 			console.log('CATCH CATCH CATCH', e);
// 			return fetch(event.request);
// 		})
// 	)
// })

//network then cache

	// event.respondWith(
	// 	caches.open(cache_dynamic_name).then((cache)=>{
	// 		return fetch(event.request).then((resp)=>{
	// 			cache.put(event.request, resp.clone());
	// 			return resp;
	// 		}).catch((e)=>{
	// 			return caches.match(event.request).then((cacheResp)=>{
	// 				if(cacheResp){
	// 					return cacheResp;
	// 				}else{
	// 					return cache.match('/offline.html');
	// 				}
	// 			})
	// 		})
	// 	})
	// )

//Cache then network

	// event.respondWith(
	// 	caches.match(event.request).then((cacheResp)=>{
	// 		if(cacheResp){
	// 			return cacheResp;
	// 		}else{
	// 			return caches.open(cache_dynamic_name).then((cache)=>{
	// 				return fetch(event.request).then((resp)=>{
	// 					//trimCache(cache_dynamic_name, 50);
	// 					cache.put(event.request, resp.clone());	
	// 					return resp;
	// 				}).catch((e)=>{
	// 					if(event.request.headers.get('accept').includes('text/html')){
	// 						return caches.open(static_cache).then((cache)=>{
	// 							return cache.match('/offline.html');
	// 						})
	// 					}
	// 				})
	// 			}).catch((e)=>{
	// 				if(event.request.headers.get('accept').includes('text/html')){
	// 					return caches.open(static_cache).then((cache)=>{
	// 						return cache.match('/offline.html');
	// 					})
	// 				}
	// 			})
	// 		}
	// 	}).catch((e)=>{

	// 		if(event.request.headers.get('accept').includes('text/html')){
	// 			return caches.open(static_cache).then((cache)=>{
	// 				return cache.match('/offline.html');
	// 			})
	// 		}
	// 	})
	// )

self.addEventListener('fetch', function(event){
	//console.log('Service Worker url.....', event.request);

	if ( event.request.url.includes('api') || event.request.url.includes('/default') ||  event.request.url.includes('/io') ){
		//For API request
		if( ( (event.request.url).indexOf('api/v1/diagnostic/labsearch')>-1 ) || ( (event.request.url).indexOf('api/v1/location/static-speciality-footer')>-1 ) || ( (event.request.url).indexOf('api/v1/doctor/commonconditions?city=Delhi')>-1 ) ) {
			event.respondWith(
				caches.open(static_cache).then((cache)=>{
					return fetch(event.request).then((resp)=>{
						cache.put(event.request, resp.clone());
						//trimCache(cache_dynamic_name, 150);
						return resp;
					}).catch((e)=>{
						return caches.match(event.request).then((cacheResp)=>{
							if(cacheResp){
								return cacheResp;
							}else{
								return {}
							}
						})
					})
				}).catch((e)=>{
					//error in caches connection open
					return fetch(event.request)
				})
			)
		}else {
			event.respondWith(fetch(event.request).catch((e)=>{
				//console.log('Error in Fetch ',event.request);
				//console.log('Error is ', e);
			}))
		}
	} else {


		event.respondWith(
				caches.open(cache_dynamic_name).then((cache)=>{

					return fetch(event.request).then((resp)=>{
						
						cache.put(event.request, resp.clone()).then((respCache)=>{

						}).catch((cacheError)=>{
							console.log('ERROR in Cache',cacheError);
							trimCache(cache_dynamic_name, 80);
						});
						trimCache(cache_dynamic_name, 150);
						return resp;
					}).catch((e)=>{
						return caches.match(event.request).then((cacheResp)=>{
							if(cacheResp){
								return cacheResp;
							}else{

								if(event.request.headers.get('accept').includes('text/html')){
									return caches.open(static_cache).then((cache)=>{
										return cache.match('/offline.html');
									})
								}else {
									return {}
								}

							}
						})
					})
				}).catch((e)=>{
					//error in caches connection open
					return fetch(event.request)
				})
			)
	}
})