define(['backbone'],function(){
	var Router = Backbone.Router.extend({

	routes: {
    	"home":			"homeFun", 
		"store":		"storeFun",
		"order":		"orderFun",
		"cart":			"cartFun",
		"mine":			"mineFun",
		"search":		"searchFun",
		"searchResult":	"searchResultFun",
		"疯狂秒杀":		"crazyFun",
		"other_type":   "other_typeFun",
		"integral":		"integralFun",
		'load':			"loadFun",
		"*actions":		"defaultAction"
	},
	
	homeFun: function() {
		$("#footer").show();
		$(".footer_img").find("img").each(function(index){
			$(this).attr("src","img/footer"+(index+1)+".png");
			$(this).removeClass();
		})
		$(".footer_page .footer_img").find("img").attr("src","img/footer6.png");
		$(".footer_page .footer_img").find("img").attr("class","checked_img");
		require(['./modules/home/home.js'],function(home){
			home.render();
		})
	},
	
	storeFun: function() {
		$("#footer").show();
		$(".footer_img").find("img").each(function(index){
			$(this).attr("src","img/footer"+(index+1)+".png");
			$(this).removeClass();
		})
		$(".footer_shop .footer_img").find("img").attr("src","img/footer7.png");
		$(".footer_shop .footer_img").find("img").attr("class","checked_img");
		require(['./modules/store/store.js'],function(store){
			store.render();
		})
	},
	  
	orderFun : function() {
		$("#footer").show();
		$(".footer_img").find("img").each(function(index){
			$(this).attr("src","img/footer"+(index+1)+".png");
			$(this).removeClass();
		})
		$(".footer_reserved .footer_img").find("img").attr("src","img/footer8.png");
		$(".footer_reserved .footer_img").find("img").attr("class","checked_img");
		require(['./modules/order/order.js'],function(order){
			order.render();
		})
	},
	  
	cartFun: function() {
		$("#footer").show();
		$(".footer_img").find("img").each(function(index){
			$(this).attr("src","img/footer"+(index+1)+".png");
			$(this).removeClass();
		})
		$(".footer_settlement .footer_img").find("img").attr("src","img/footer9.png");
		$(".footer_settlement .footer_img").find("img").attr("class","checked_img");
		require(['./modules/cart/cart.js'],function(cart){
			cart.render();
		})
	},
	  
	mineFun: function() {
		$("#footer").show();
		$(".footer_img").find("img").each(function(index){
			$(this).attr("src","img/footer"+(index+1)+".png");
			$(this).removeClass();
		})
		$(".footer_home .footer_img").find("img").attr("src","img/footer10.png");
		$(".footer_home .footer_img").find("img").attr("class","checked_img");
		require(['./modules/mine/mine.js'],function(mine){
			mine.render();
		})
	},
	
	searchFun: function(){
		$("#footer").hide();
		require(['./modules/search/search.js'],function(search){
			search.render();
		})
	},
	
	searchResultFun: function(){
		$("#footer").hide();
		require(['./modules/searchResult/searchResult.js'],function(searchResult){
			searchResult.render();
		})
	},
	crazyFun:function(){
		$("#footer").hide();
		require(['./modules/crazy/crazy.js'],function(crazy){
			crazy.render();
		})
	},
	other_typeFun:function(){
		$("#footer").hide();
		require(['./modules/otherInfo/otherInfo.js'],function(otherInfo){
			otherInfo.render();
		})
	},
	integralFun: function(){
		$("#footer").hide();
		require(['./modules/integral/integral.js'],function(integral){
			integral.render();
		})
	},
	loadFun: function(){
		$("#footer").hide();
		require(['./modules/load/load.js'],function(load){
			load.render();
		})
	},
	defaultAction: function() {
		location.hash = "load"
	}
	
});

	var router = new Router();
	
})
