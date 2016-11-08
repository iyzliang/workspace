define(['text!./mine.html',
		'css!./mine.css'
],function(html){
	function render(){
		$("#container").html(html);
	}
	
	return{
		render:render
	}
})