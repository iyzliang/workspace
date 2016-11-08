define(['text!./home.html',
		'css!./home.css',
		'css!./swiper.min.css',
		'./swiper.min.js'
],function(html){
	function render(){
		$('#container').html(html);
		Hot_ajax();
		swiperAjax();
		navAjax();
		shopNum();
		
	};
	//请求热卖数据
	function Hot_ajax(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihomehot.php",
			success:function(bestSellersData){
				var bestSellersDataJson = JSON.parse(bestSellersData);
				var BSMode = baidu.template("bestSellers_mode",bestSellersDataJson);
				$(".bestSellers_list").html(BSMode);
				$(".addCommoditys").css("visibility","initial");
				CommodityFun();
				homeGoodsNumber();
			}
		})
	};
	//轮播数据
	function swiperAjax(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
			success:function(swiperData){
				var swiperDataJson = JSON.parse(swiperData).data;
				var swiperMode = baidu.template("swiperSlide",swiperDataJson);
				$(".swiper-wrapper").html(swiperMode);
				var mySwiper = new Swiper(".swiper-container",{
					autoplay:"2000",
					loop:true,
					pagination:".swiper-pagination",
					autoplayDisableOnInteraction:false
				});
			}
		});
	};
	//导航数据
	function navAjax(){
		$.ajax({
			type:"get",
			url:"http://www.vrserver.applinzi.com/aixianfeng/apihome.php",
			success:function(navData){
				var navDataJson = JSON.parse(navData).data;
				var swiperMode = baidu.template("navListMode",navDataJson);
				$("#nav_list").html(swiperMode);
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
			$("li.commoditysBox").each(function(){
				var curData = JSON.parse($(this).find("textarea").text()).name,
					curInfo = md5(curData);
				for(var m in curGoods){
					if(m == curInfo){
						$(this).find(".reduceCommoditys").show();
						var listNum = JSON.parse(localStorage.CommoditysList)[m].number;
						$(this).find(".numberCommoditys").text(listNum).show();
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
		var selParent = $(sel).parents(".commoditysBox"),
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
		$(document).on("click",".addCommoditys",function(e){
			//判断是否有商品数据 有则赋值给list，没有list为空对象
			if(localStorage.CommoditysList == undefined){
				list = {};
			}else{
				list = JSON.parse(localStorage.CommoditysList);
			};
			var clickParent = $(e.target).parents(".commoditysBox"),
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
			clickParent.find(".numberCommoditys").text(list[goodsInfo].number).show();
			clickParent.find(".reduceCommoditys").show();
			stringlist = JSON.stringify(list);
			localStorage.CommoditysList = stringlist;
			shopNum();
			ImgAnimation(e.target);

		});
		//减
		$(document).on("click",".reduceCommoditys",function(e){
			var	list = JSON.parse(localStorage.CommoditysList),
				clickParent = $(e.target).parents(".commoditysBox"),
				goodsData = clickParent.find("textarea").text(),
				goodsInfo = md5(JSON.parse(goodsData).name);
			list[goodsInfo] = {
				data:goodsData,
				number:(list[goodsInfo].number)-1
			};
			if(list[goodsInfo].number <=0){
				clickParent.find(".numberCommoditys").text(0).hide();
				clickParent.find(".reduceCommoditys").hide();
				delete list[goodsInfo];
			}else{
				clickParent.find(".numberCommoditys").text(list[goodsInfo].number)
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