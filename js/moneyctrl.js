$(function () {
	var moneyctrl = new Moneyctrl();
	moneyctrl.getMoneyctrl();
	moneyctrl.clickPage();
	moneyctrl.getTop();
	moneyctrl.toMoneyctrlProduct();
	moneyctrl.initScroll();
});

var Moneyctrl = function () {};
Moneyctrl.prototype = {
	url: 'http://localhost:9090/api/',
	pageId: 1,
	page: 0,
	//请求数据 动态渲染页面
	getMoneyctrl: function () {
		var that = this;
		$.ajax({
			url: that.url + 'getmoneyctrl',
			data: {pageid: that.pageId},
			success: function (data) {
				//console.log(data);
				var html = template('moneyctrlTpl',data);
				$('.product-list').html(html);
				that.page=Math.floor(data.totalCount/10);
				//console.log(that.page);
				that.getPage();
				that.initPage();
			}
		})
	},
	//回到顶部
	getTop: function () {
		$('.top').on('tap',function () {
			$(window).scrollTop(0);
		})
	},
	//根据数据来动态渲染总页码
	getPage: function () {
		var that = this;
		//console.log(that.page);
		var html ='<li class="mui-previous mui-disabled">'+
					'<a href="#">'+
					'上一页'+
					'</a>'+
					'</li>';
		for (var i = 1 ; i <= that.page ; i++) {
			if (i==that.pageId) {
				html += '<li class="mui-active page">'+
					'<a href="#">'+
						i
					'</a>'+
					'</li>';
			} else {
				html += '<li class="page">'+
					'<a href="#">'+
						i
					'</a>'+
					'</li>';
			}
		}
		html += '<li class="mui-next ">'+
				'<a href="#">'+
				'下一页'+
				'</a>'+
				'</li>';
				//console.log(html);
		$('#page ul').html(html);
	},
	//分页的点击事件
	clickPage: function () {
		var that = this;
		$('#page ul').on('tap','.page',function () {
			that.pageId = $(this).text();
			console.log(that.pageId);
			$.ajax({
				url: that.url + 'getmoneyctrl',
				data: {pageid: that.pageId},
				success: function (data) {
					var html = template('moneyctrlTpl',data);
					$('.product-list').html(html);
					that.page=Math.floor(data.totalCount/10);
				}
			})
		})
	},
	//初始化分页
	initPage: function () {
		var that = this;
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
		(function($) {
			$('.mui-pagination').on('tap', 'a', function() {
				var li = this.parentNode;
				var classList = li.classList;
				if (!classList.contains('mui-active') && !classList.contains('mui-disabled')) {
					var active = li.parentNode.querySelector('.mui-active');
					if (classList.contains('mui-previous')) {//previous
						if (active) {
							var previous = active.previousElementSibling;
							//console.log('previous', previous);
							if (previous && !previous.classList.contains('mui-previous')) {
								$.trigger(previous.querySelector('a'), 'tap');
							} else {
								classList.add('mui-disabled');
							}
						}
					} else if (classList.contains('mui-next')) {//next
						if (active) {
							var next = active.nextElementSibling;
							if (next && !next.classList.contains('mui-next')) {
								$.trigger(next.querySelector('a'), 'tap');
							} else {
								classList.add('mui-disabled');
							}
						}
					} else {//page
						active.classList.remove('mui-active');
						classList.add('mui-active');
						var page = parseInt(this.innerText);
						var previousPageElement = li.parentNode.querySelector('.mui-previous');
						var nextPageElement = li.parentNode.querySelector('.mui-next');
						previousPageElement.classList.remove('mui-disabled');
						nextPageElement.classList.remove('mui-disabled');
						if (page <= 1) {
							previousPageElement.classList.add('mui-disabled');
						} else if (page >= that.page) {
							nextPageElement.classList.add('mui-disabled');
						}
					}
				}
			});
		})(mui); 
	},
	//跳转到商品详情的点击事件
	toMoneyctrlProduct: function () {
		$('#content .product-list').on('tap','.product-content',function () {
			location = 'moneyctrlProduct.html?productid='+$(this).data('id');
			//console.log($(this).data('id'));
		})
	},
	//初始化区域滚动
	initScroll: function () {
		mui('.mui-scroll-wrapper').scroll({
			//scrollY: true, //是否竖向滚动
			scrollX: true, //是否横向滚动
			startX: 0, //初始化时滚动至x
			startY: 0, //初始化时滚动至y
			indicators: false, //是否显示滚动条
			deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
			bounce: true //是否启用回弹
		});
	}
}
