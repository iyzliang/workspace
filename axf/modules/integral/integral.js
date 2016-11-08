define(['text!./integral.html',
		'css!./integral.css'
],function(html){
	function render(){
		$('#container').html(html);
		yuan();
	};
	
	function yuan(){
		var l = $(".available_circle_external1")[0],
			r = $(".available_circle_external2")[0],
			n = -360,
			m = 0,
			t = setInterval(function(){
				n +=5;
				l.style.transform = "rotate("+n+"deg)";
				if(n >= -180){
					clearInterval(t);
					var t2 = setInterval(function(){
						r.style.display = "block";
						m +=5;
						r.style.transform = "rotate("+m+"deg)";
						if(m >= 180){
							clearInterval(t2);
						}
					},10)
				}
			},10)
	}
	return {
		render:render,
		yuan:yuan
	}
})