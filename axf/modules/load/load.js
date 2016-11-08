define(['text!./load.html',
		'css!./load.css'
],function(html){
	function render(){
		$('#container').html(html);
		var h = document.documentElement.clientHeight;
		document.getElementById("load").style.height = h+"px";
		var t = setTimeout(function(){
			location.hash = "home";
		},3000)
	};
	return{
		render:render
	}
})