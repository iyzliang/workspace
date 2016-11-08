require.config({
	paths:{
		'jquery':'lib/jquery',
		'backbone':'lib/backbone',
		'css':'lib/css',
		'text':'lib/text',
		'underscore':'lib/underscore',
		'baidu':'lib/baiduTemplate',
		'md5':'lib/md5'
	}
});


require([
	'jquery',
	'backbone',
	'./router.js',
	'baidu',
	'md5'
],
function($,backbone){	
	Backbone.history.start();
})
