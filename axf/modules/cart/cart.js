define(['text!./cart.html',
		'css!./cart.css'
],function(html){
	function render(){
		$('#container').html(html);
		goodsList();
	};
	//购物车商品
	function goodsList(){
		if(localStorage.CommoditysList == undefined ||localStorage.CommoditysList == "{}"){
			var empty = '<header id="shopCar_header"><h1>购物车</h1></header><div id="empty_img"><img src="img/empty_cart.png"/><p>亲，购物车空空的耶~</p><a href="#home">去逛逛</a></div>'
			$("#container").html(empty)
		}else{
			goodslist = {"goods":JSON.parse(localStorage.CommoditysList)};
			var cartMode = baidu.template("cartGoodslist",goodslist);
			$("#commoditys").html(cartMode);
			shopNum();
			Settlement();
			cartGoodsList();
			isChecked();
		}
	};
	//统计商品数量
	function shopNum(){
		var shopnum = 0;
		if(localStorage.CommoditysList != undefined){
			numList = JSON.parse(localStorage.CommoditysList)
			for(var m in numList){
				shopnum += parseInt(JSON.parse(numList[m].number));
			}
			if(shopnum >0){
				$("#shop_num").show().text(shopnum);							
			}else{
				$("#shop_num").hide().text(0);
			}
		}
	};
	//加减逻辑
	function cartGoodsList(){
		//解除所有事件绑定
		$(document).off();
		$(document).on("click",".cart_addCommoditys",function(e){
			var list = JSON.parse(localStorage.CommoditysList),
				clickParent = $(e.target).parents(".cart_commoditysBox"),
				goodsData = clickParent.find("textarea").text(),
				goodsInfo = md5(JSON.parse(goodsData).name); 
				list[goodsInfo].number = (list[goodsInfo].number)+1;
				clickParent.find(".car_numberCommoditys").text(list[goodsInfo].number);
				localStorage.CommoditysList = JSON.stringify(list);	
				shopNum();
				Settlement();
		});
		$(document).on("click",".car_reduceCommoditys",function(e){
			var list = JSON.parse(localStorage.CommoditysList),
				clickParent = $(e.target).parents(".cart_commoditysBox"),
				goodsData = clickParent.find("textarea").text(),
				goodsInfo = md5(JSON.parse(goodsData).name); 
				list[goodsInfo].number = (list[goodsInfo].number)-1;
				if(parseInt(list[goodsInfo].number) <1){
					delete list[goodsInfo];
					clickParent.remove();	
				}else{
					clickParent.find(".car_numberCommoditys").text(list[goodsInfo].number);
				};
				localStorage.CommoditysList = JSON.stringify(list);	
				if(localStorage.CommoditysList == "{}"){
					goodsList();					
				}
				shopNum();
				Settlement();
		});
	};
	//结算
	function isChecked(){
		$("#commoditys").on("click",".isChecked>span",function(e){
			var curSpan = $(e.target);
			if(curSpan.attr("class") == ""){
				$(curSpan).addClass("NOChecked");
				$(".settlement_checked").find("span").addClass("Noche");
			}else if(curSpan.attr("class") == "NOChecked"){
				$(curSpan).removeClass();
				$(".settlement_checked").find("span").removeClass();
			}	
			Settlement()
		});
		$(".settlement_checked").click(function(){
			if($(this).find("span").attr("class") == "Noche"){
				$(this).find("span").removeClass();
				$("#commoditys").find(".isChecked>span").each(function(){
					$(this).removeClass();
				})
			}else if($(this).find("span").attr("class") == ""){
				$(this).find("span").addClass("Noche");
				$("#commoditys").find(".isChecked>span").each(function(){
					$(this).addClass("NOChecked");
				})
			}
			Settlement();
		});
	};
	function Settlement(){
		var total = 0;
		$(".cart_commoditysBox").each(function(){
			if($(this).find(".isChecked").find("span").attr("class") == ""){
				var pre = parseFloat($(this).find(".comPrice").text().substring(1));
				var num = parseInt($(this).find(".car_numberCommoditys").text());
				total +=pre*num;
			}
		});
		var newTotal = total.toFixed(1);
		if(newTotal<=0){
			newTotal = 0;
		}
		$(".settlement_total").text("￥"+newTotal )
	};
	return {
		render:render
	}
})