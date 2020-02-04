var winHeight = 0;
(function () {
	// body...
	setHeight();

	// 窗口大小变化
	$(window).on('resize', function() {
		setHeight();
	});

})();

// 是否ios
function isMac() {
	var agent = navigator.userAgent.toLowerCase();
	return /macintosh|mac os x/i.test(agent);
}

// 是否移动端
function isMobile() {
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
		return true;
	}else{
		return false;
	}
}

function setHeight() {
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;

	$('.session').each(function() {
		$(this).height(winHeight + 'px');
	})

	if (window.reSetScroll) {
		setTimeout(function() {
			window.reSetScroll();
		}, 100);
	}

	window.winHeight = winHeight;
}

window.isMac = isMac;
window.isMobile = isMobile;
