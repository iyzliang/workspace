define(['text!./order.html',
		'css!./order.css'
],function(html){
	function render(){
		$('#container').html(html);
		ajax();
		shopNum();
	};
	
	function ajax(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apiyuding.php",
			success:function(reservedData){
				var reservedDataJson = JSON.parse(reservedData);
				var BDMode = baidu.template("reserved_li",reservedDataJson);
				$(".select_fruits_list").html(BDMode);
				$(".order_addCommoditys").css("visibility","initial");
				CommodityFun();
				homeGoodsNumber();
			}
		})
	};
	//初始化商品个数
	function homeGoodsNumber(){
		var curGoods = {};
		if(localStorage.CommoditysList != undefined){
			var list = JSON.parse(localStorage.CommoditysList);
			for(var n in list){
				curGoods[n] = list[n].number
			}
			$("li.order_commoditysBox").each(function(){
				var curData = JSON.parse($(this).find("textarea").text()).name,
					curInfo = md5(curData);
				for(var m in curGoods){
					if(m == curInfo){
						$(this).find(".order_reduceCommoditys").show();
						var listNum = JSON.parse(localStorage.CommoditysList)[m].number;
						$(this).find(".order_numberCommoditys").text(listNum).show();
					}
				}
			})
		}
	}
	
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
	//购物车动画
	function ImgAnimation(sel){
		var selParent = $(sel).parents(".order_commoditysBox"),
			selDiv = selParent.find("img").parent("div"),
			selImg = selParent.find("img").clone();
		selDiv.css("position","relative");
		selImg.addClass("ImgAnimation");
		selDiv.append(selImg);
		var t = setInterval(function(){
			if(selImg.css("opacity") ==0){
				selParent.find(".ImgAnimation").remove();
				setInterval(t)
			}
		},1000)
	}
	//添加购物车函数
	function CommodityFun(){
		//解除所有事件绑定
		$(document).off();
		//加
		$(document).on("click",".order_addCommoditys",function(e){
			//判断是否有商品数据 有则赋值给list，没有list为空对象
			if(localStorage.CommoditysList == undefined){
				list = {};
			}else{
				list = JSON.parse(localStorage.CommoditysList);
			};
			var clickParent = $(e.target).parents(".order_commoditysBox"),
				goodsData = clickParent.find("textarea").text(), //string
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
			ImgAnimation(e.target);

		});
		//减
		$(document).on("click",".order_reduceCommoditys",function(e){
			var	list = JSON.parse(localStorage.CommoditysList),
				clickParent = $(e.target).parents(".order_commoditysBox"),
				goodsData = clickParent.find("textarea").text(),
				goodsInfo = md5(JSON.parse(goodsData).name);
			list[goodsInfo] = {
				data:goodsData,
				number:(list[goodsInfo].number)-1
			};
			if(list[goodsInfo].number <=0){
				clickParent.find(".order_numberCommoditys").text(0).hide();
				clickParent.find(".order_reduceCommoditys").hide();
				delete list[goodsInfo];
			}else{
				clickParent.find(".order_numberCommoditys").text(list[goodsInfo].number)
			};
			stringlist = JSON.stringify(list);
			localStorage.CommoditysList = stringlist;
			shopNum();
		});	
		
	};
	return {
		render:render,
		ajax:ajax
	}
})