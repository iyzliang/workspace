define(['text!./searchResult.html',
		'css!./searchResult.css'
],function(html){
	function render(){
		$('#container').html(html);
		ajax();
	};
	
	function ajax(){
		$.ajax({
			type:"get",
			url:"data/searchResult.json",
			success:function(searchResultData){
				var BDMode = baidu.template("bestSellers_mode_search",searchResultData.data);
				$(".bestSellers_list_search").html(BDMode);
			}
		})
	};
	return {
		render:render,
		ajax:ajax
	}
})