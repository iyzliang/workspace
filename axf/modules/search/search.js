define(['text!./search.html',
		 'css!./search.css'
],function(html){
	function render(){
		$('#container').html(html);
		searchBack();
		historyText();
		historyRecord();
	};
	function searchBack(){
		$("#searchBack").click(function(e){
			location.href = history.go(-1);
		})
	};
	function historyText(){
		if(localStorage.searchHistory != undefined){
			var History = JSON.parse(localStorage.searchHistory),
				strHtml = "";
			for(var n in History){
				strHtml += "<li>"+History[n]+"</li>"
			}
			$(".old_search").html(strHtml);
		};
	};
	function historyRecord(){
		$(".btn_search").click(function(){
			var inputVal = $("#search").find("input").val();
			if(localStorage.searchHistory == undefined){
				var History = {};
			}else{
				var History = JSON.parse(localStorage.searchHistory);
			}
			if(inputVal != false){
				History[inputVal] = inputVal;
			}
			localStorage.searchHistory = JSON.stringify(History);
			historyText();
		});
	};
	return {
		render:render
	}
})