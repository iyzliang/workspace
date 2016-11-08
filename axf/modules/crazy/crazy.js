define(['text!./crazy.html',
		'css!./crazy.css'
],function(html){
	function render(){
		$('#container').html(html);
		crazyAjax()
		shopNum();
		carGo();
	};
	
	function crazyAjax(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apimiaosha.php",
			success:function(crazyData){
				var crazyDataJson = JSON.parse(crazyData);
				var BSMode = baidu.template("crazyCommodityMode",crazyDataJson);
				$("#hot_crazy_commodity").html(BSMode);
				CommodityFun();
			}
		})
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
				$("#shopCarNum").show().text(shopnum);							
			}else{
				$("#shopCarNum").hide().text(0);
			}
		}
	};
	//购物车动画
	function PAnimation(num,x,y){
		var newP = document.createElement("span");
		$(newP).css({"position":"absolute","left":x,"top":y,"color":"#ffd600"});
		$(newP).text(num);
		$(newP).addClass("PAnimation");
		$("body").append(newP);
		$(newP).animate({left:(parseInt(x)+(400-x))+"px",top:(parseInt(y)+400)+"px"},1000,function(){
			$(newP).remove();
		})
	}
	//添加购物车函数
	function CommodityFun(){
		//解除所有事件绑定
		$(document).off();
		//加
		$(document).on("click",".addshopcar",function(e){
			//判断是否有商品数据 有则赋值给list，没有list为空对象
			if(localStorage.CommoditysList == undefined){
				list = {};
			}else{
				list = JSON.parse(localStorage.CommoditysList);
			};
			var clickParent = $(e.target).parents(".crazy_commodity_list"),
				goodsData = clickParent.find("textarea").text(),
				goodsInfo = md5(JSON.parse(goodsData).name);
			if(list[goodsInfo]){
				list[goodsInfo] = {
					data:goodsData,
					number:(list[goodsInfo].number)+1
				}
			}else{
				list[goodsInfo] = {
					data:goodsData,
					number:1
				}
			}
			clickParent.find(".order_numberCommoditys").text(list[goodsInfo].number).show();
			clickParent.find(".order_reduceCommoditys").show();
			stringlist = JSON.stringify(list);
			localStorage.CommoditysList = stringlist;
			shopNum();
			var pData = JSON.parse(list[goodsInfo].data).newPrice
			PAnimation(pData,e.pageX,e.pageY);
		});
	};
	function carGo(){
		$("#shopcar").click(function(){
			location.href = "#cart";
		})
	}
	return {
		render:render,
		crazyAjax:crazyAjax
	}
})