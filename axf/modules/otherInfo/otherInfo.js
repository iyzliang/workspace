define(['text!./otherInfo.html',
		'css!./otherInfo.css'
],function(html){
	function render(){
		$('#container').html(html);
	};
	
	return{
		render:render
	}
})