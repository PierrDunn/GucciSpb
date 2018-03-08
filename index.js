function repeat(){
	$('.bg:not(.wraptextinner)').animate({'opacity':'0'},1000,function(){
	console.log($(this).css('background-image'));
	if($(this).css('background-image') == 'url("http://guccispb.mcdir.ru/bg1.png")'){
		$(this).css('background-image', 'url(bg2.png)');
	}
	else{
		$(this).css('background-image', 'url(bg1.png)');
	}
	
	$(this).animate({'opacity':'1'},1000);
	});
}

setInterval(function() {
	repeat();
}, 10000)
