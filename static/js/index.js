var winPageNum = 0;
var winIndex = 0;
var winFooter = 220;
(function() {

	// star();
	var navWhite = $('.nav-white');

    // 全局变量 winHeight - 窗口高度
    var scrolling = false;
    var mainBox = $('.main');
    var session = $('.session');
	var pageNum = session.length;
	winPageNum = pageNum;
	var index = 0;
	var curIndex = 0;
	var footer = winFooter;
	var setTime = 600;
	
	if (window.isMobile()) {
		$('body').addClass('animate');
	} else {
		$('body').removeClass('animate');
	}

	if (window.isMac()) {
		setTime = 1000;
	}

	// 页面帧滚动
	$(document).on('mousewheel', function(event, delta) {
		// 向下
		if (delta < 0) {
			if (index >= pageNum) return;
			toPage(index + 1, index == 4 ? true : false);
		} else if (delta > 0) {
			if (index <= 0) return;
			toPage(index - 1, index == 5 ? true : false);
		}
	});
	
	$('.arrow-box').on({
		'click': function() {
			if (index >= pageNum) return;
			toPage(index + 1);
		}
	})

	function toPage(_index, isLast) {
		if (_index != curIndex) {
			if (scrolling) return;
			scrolling = true;

			// if (isLast) {
			// 	mainBox.addClass('last');
			// } else {
			// 	mainBox.removeClass('last');
			// }

			if (_index == 0) {
				navWhite.slideUp(300);
			} else {
				navWhite.slideDown(300);
			}
			$(session[_index]).addClass('animate');
			
			var scrollHeight = _index == pageNum ?
				footer + Number(winHeight) * (_index - 1) :
				Number(winHeight) * _index;
			mainBox.css({
				top: `${-scrollHeight}px`
			}, 1000);
			index = _index;
			curIndex = _index;
			winIndex = _index;
			setTimeout(function() {
				scrolling = false;
			}, setTime);
		}
    }
	
	$('.session-0').addClass('animate');
	
    // 首页第一版面 图标悬浮二维码
    $('.dl-container').on({
        'mouseover': function(){
            $(this).addClass('hover');
        },
        'mouseout': function() {
            $(this).removeClass('hover');
        }
	})

})();

function reSetScroll() {
	if (winIndex <= 0) return;
	var scrollHeight = winIndex == winPageNum ?
		winFooter + Number(winHeight) * (winIndex - 1) :
		Number(winHeight) * winIndex;
	$('.main').css({
		top: `${-scrollHeight}px`
	}, 1000);
}

window.reSetScroll = reSetScroll;
