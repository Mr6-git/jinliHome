var winPageNum = 0;
var winIndex = 0;
var winFooter = 220;
(function() {
    
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
	var setTime = 300;

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
			toPage(index + 1);
		} else if (delta > 0) {
			if (index <= 0) return;
			toPage(index - 1);
		}
	});

	$('.arrow-box').on({
		'click': function() {
			if (index >= pageNum) return;
			toPage(index + 1);
		}
	})

	function toPage(_index) {
		if (_index != curIndex) {
			if (scrolling) return;
			scrolling = true;

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
			return;
		}
    }

    // 轮播  
    var swiper = new Swiper('.swiper-container', {  
        loop : true,
        autoplay: 3000,
        // pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false,
        effect: 'coverflow',  
        grabCursor: true,  
        centeredSlides: true,  
        nextButton: '.swiper-button-next',  
        prevButton: '.swiper-button-prev',  
        slidesPerView: 'auto',
        touchRatio : -1,  
        coverflow: {  
            rotate: -10,// 旋转的角度  
            stretch: 300,// 拉伸   图片间左右的间距和密集度  
            depth: 100,// 深度   切换图片间上下的间距和密集度  
            modifier: 4,// 修正值 该值越大前面的效果越明显  
            slideShadows : false// 页面阴影效果  
        }  
    });
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
