define(['text!./store.html',
		'css!./store.css'	
],function(html){
	function render(){
		$('#container').html(html);
		mainList();
		storeAjax();
	};
	function mainList(){
		$(".main_left").find("ul").on("click","li",function(e){
			$("#checked").removeAttr("id");
			$(e.target).attr("id","checked");
			categoryData = $(e.target).text();
			storeAjax(categoryData);
		});
	}
	function storeAjax(categoryData){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apicategory.php",
			data:{"category":categoryData || "热销榜"},
			success:function(storeData){
				var storeDataJson = JSON.parse(storeData);
				var stMode = baidu.template("mainConterMode",storeDataJson);
				$(".mainConter").html(stMode);
				$(".store_addCommoditys").css("visibility","initial");
				shopNum();
				AddGoodsFun();
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
			$("li.store_commoditysBox").each(function(){
				var curData = JSON.parse($(this).find("textarea").text()).name,
					curInfo = md5(curData);
				for(var m in curGoods){
					if(m == curInfo){
						$(this).find(".store_reduceCommoditys").show();
						var listNum = JSON.parse(localStorage.CommoditysList)[m].number;
						$(this).find(".store_numberCommoditys").text(listNum).show();
					}
				}
			})
		}
	}
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
		var selParent = $(sel).parents(".store_commoditysBox"),
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
	function AddGoodsFun(){
		//解除所有事件绑定
		$(document).off();
		//加
		$(document).on("click",".store_addCommoditys",function(e){
			//判断是否有商品数据 有则赋值给list，没有list为空对象
			if(localStorage.CommoditysList == undefined){
				list = {};
			}else{
				list = JSON.parse(localStorage.CommoditysList);
			};
			var clickParent = $(e.target).parents(".store_commoditysBox"),
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
			clickParent.find(".store_numberCommoditys").text(list[goodsInfo].number).show();
			clickParent.find(".store_reduceCommoditys").show();
			stringlist = JSON.stringify(list);
			localStorage.CommoditysList = stringlist;
			shopNum();
			ImgAnimation(e.target);
		});
		//减
		$(document).on("click",".store_reduceCommoditys",function(e){
			var	list = JSON.parse(localStorage.CommoditysList),
				clickParent = $(e.target).parents(".store_commoditysBox"),
				goodsData = clickParent.find("textarea").text(),
				goodsInfo = md5(JSON.parse(goodsData).name);
			list[goodsInfo] = {
				data:goodsData,
				number:(list[goodsInfo].number)-1
			};
			if(list[goodsInfo].number <=0){
				clickParent.find(".store_numberCommoditys").text(0).hide();
				clickParent.find(".store_reduceCommoditys").hide();
				delete list[goodsInfo];
			}else{
				clickParent.find(".store_numberCommoditys").text(list[goodsInfo].number)
			};
			stringlist = JSON.stringify(list);
			localStorage.CommoditysList = stringlist;
			shopNum();
		});	
	};
	return{
		render:render
	}
})