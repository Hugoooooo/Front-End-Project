var Layout = {

	settings: {
		autoScrollWhenMenuIsActive: false,
		improvePerformance: true,

	},


	initLayer: function () {
		"use strict";
		var $windowHeight = $(window).height(),
				$windowWidth = $(window).width(),
				$startingPoint = $('.starting-point');

		var diameterValue = (Math.sqrt( Math.pow($windowHeight, 2) + Math.pow($windowWidth, 2) ) * 2);

		$startingPoint.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height: diameterValue+'px',
			width: diameterValue+'px',
			top: -(diameterValue/2)+'px',
			left: -(diameterValue/2)+'px'
		}, 0);
	},

	layerResponsive: function () {
		"use strict";
		var $windowHeight = $(window).height(),
				$windowWidth = $(window).width(),
				$startingPoint = $('.starting-point');

		var diameterValue = (Math.sqrt( Math.pow($windowHeight, 2) + Math.pow($windowWidth, 2) ) * 2);

		$startingPoint.children('span').css({
			height: diameterValue+'px',
			width: diameterValue+'px',
			top: -(diameterValue/2)+'px',
			left: -(diameterValue/2)+'px'
		});
	},

	listenForMenuLayer: function () {
        "use strict";
		$('.nav-menu').on('click', function() {
			var $this = $(this),
					$startingPoint = $('.starting-point'),
					$overlay = $('.overlay'),
					$menu = $('.menu-layer'),
					$overlaySecondary = $('.overlay-secondary'),
					$content = $('.content'),
					$body = $('body'),
					$scrollableTabs = $('.scrollable-tabs');

			$menu.find('[data-open-after="true"]').addClass('open');

			if( !$this.hasClass('active') ) {

				if( !TCBLife.checkTouchScreen() && !Layout.settings.improvePerformance )
					$content.addClass('scaled');

				$menu.addClass('activating');
				$scrollableTabs.addClass('disabled');

				setTimeout(function () {
					$body.addClass('disable-scroll');
					$overlay.addClass('overlay-nav active');
					$this.addClass('active');
					$menu.addClass('active');
					$overlaySecondary.addClass('fade-in');

					$menu.find('[data-open-after="true"]').parents('li').addClass('open animate');

					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 1,
						scaleY: 1
					}, { duration: 500, easing: [0.42, 0, 0.58, 1] });

					if( Layout.settings.autoScrollWhenMenuIsActive ) {
						setTimeout(function () {
							$menu.animate({ scrollTop: $menu.find('[data-open-after="true"]').position().top + 200 }, 300);
						}, 600);
					}
				}, 50);

			} else {
				$this.addClass('rotating');

				$overlaySecondary.removeClass('fade-in');
				$content.removeClass('scaled');

				setTimeout(function() {
					$menu.removeClass('active');
					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 0,
						scaleY: 0
					}, {
						duration: 500,
						easing: [0.42, 0, 0.58, 1],
						complete: function () {
							$overlay.removeClass('active overlay-nav');
							$this.removeClass('active rotating');
							$menu.removeClass('activating');
							$body.removeClass('disable-scroll');
							$menu.find('.open').removeClass('open animate');
							$scrollableTabs.removeClass('disabled');
						}
					});
				}, 200);

			}
		});

		$('.overlay-secondary').on('click', function () {
			$('.nav-menu').trigger('click');
		});
	},

	listenForProductLayer: function () {
	   "use strict";
		$('.nav-product').on('click', function() {

			var $this = $(this),
					$startingPoint = $('.starting-point'),
					$overlay = $('.overlay'),
					$menu = $('.product-layer'),
					$overlaySecondary = $('.overlay-secondary-product'),
					$content = $('.content'),
					$body = $('body'),
					$scrollableTabs = $('.scrollable-tabs'),
					$floatingIcons = $('.floating-icons');

			$menu.find('[data-open-after="true"]').addClass('open');

			if( !$this.hasClass('active') ) {

				if( !TCBLife.checkTouchScreen() && !Layout.settings.improvePerformance )
					$content.addClass('scaled');

				$menu.addClass('activating');
				$scrollableTabs.addClass('disabled');

				setTimeout(function () {
					$body.addClass('disable-scroll');
					$overlay.addClass('overlay-product active');
					$this.addClass('active');
					$menu.addClass('active');
					$overlaySecondary.addClass('fade-in');
					$floatingIcons.addClass('show');

					$menu.find('[data-open-after="true"]').parents('li').addClass('open animate');

					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 1,
						scaleY: 1
					}, { duration: 500, easing: [0.42, 0, 0.58, 1] });

					if( Layout.settings.autoScrollWhenMenuIsActive ) {
						setTimeout(function () {
							$menu.animate({ scrollTop: $menu.find('[data-open-after="true"]').position().top + 200 }, 300);
						}, 600);
					}
				}, 50);

			} else {
				$this.addClass('rotating');

				$overlaySecondary.removeClass('fade-in');
				$content.removeClass('scaled');

				setTimeout(function() {
					$menu.removeClass('active');
					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 0,
						scaleY: 0
					}, {
						duration: 500,
						easing: [0.42, 0, 0.58, 1],
						complete: function () {
							$overlay.removeClass('active overlay-product');
							$this.removeClass('active rotating');
							$menu.removeClass('activating');
							$body.removeClass('disable-scroll');
							$menu.find('.open').removeClass('open animate');
							$scrollableTabs.removeClass('disabled');
					        $floatingIcons.removeClass('show');
						}
					});
				}, 200);

			}
		});

		$('.overlay-secondary-product').on('click', function () {
			$('.nav-product').trigger('click');
		});
	},

	listenForAboutLayer: function () {
		"use strict";
		$('.nav-about').on('click', function() {

			var $this = $(this),
					$startingPoint = $('.starting-point'),
					$overlay = $('.overlay'),
					$menu = $('.about-layer'),
					$overlaySecondary = $('.overlay-secondary-about'),
					$content = $('.content'),
					$body = $('body'),
					$scrollableTabs = $('.scrollable-tabs'),
					$floatingIcons = $('.floating-icons');

			$menu.find('[data-open-after="true"]').addClass('open');

			if( !$this.hasClass('active') ) {

				if( !TCBLife.checkTouchScreen() && !Layout.settings.improvePerformance ) // If screen is desktop, add scaled effect
					$content.addClass('scaled');

				$menu.addClass('activating');
				$scrollableTabs.addClass('disabled');

				setTimeout(function () {
					$body.addClass('disable-scroll');
					$overlay.addClass('overlay-nav overlay-about active');
					$this.addClass('active');
					$menu.addClass('active');
					$overlaySecondary.addClass('fade-in');
					$floatingIcons.addClass('show');

					$menu.find('[data-open-after="true"]').parents('li').addClass('open animate');

					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 1,
						scaleY: 1
					}, { duration: 500, easing: [0.42, 0, 0.58, 1] });

					if( Layout.settings.autoScrollWhenMenuIsActive ) {
						setTimeout(function () {
							$menu.animate({ scrollTop: $menu.find('[data-open-after="true"]').position().top + 200 }, 300);
						}, 600);
					}
				}, 50);

			} else {
				$this.addClass('rotating');

				$overlaySecondary.removeClass('fade-in');
				$content.removeClass('scaled');

				setTimeout(function() {
					$menu.removeClass('active');
					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 0,
						scaleY: 0
					}, {
						duration: 500,
						easing: [0.42, 0, 0.58, 1],
						complete: function () {
							$overlay.removeClass('active overlay-nav overlay-about');
							$this.removeClass('active rotating');
							$menu.removeClass('activating');
							$body.removeClass('disable-scroll');
							$menu.find('.open').removeClass('open animate');
							$scrollableTabs.removeClass('disabled');
					        $floatingIcons.removeClass('show');
						}
					});
				}, 200);

			}
		});

		$('.overlay-secondary-about').on('click', function () {
			$('.nav-about').trigger('click');
		});
	},

	listenForMemberLayer: function () {
		"use strict";
		$('.nav-member').on('click', function() {

			var $this = $(this),
					$startingPoint = $('.starting-point'),
					$overlay = $('.overlay'),
					$menu = $('.member-layer'),
					$overlaySecondary = $('.overlay-secondary-member'),
					$content = $('.content'),
					$body = $('body'),
					$scrollableTabs = $('.scrollable-tabs'),
					$floatingIcons = $('.floating-icons');

			$menu.find('[data-open-after="true"]').addClass('open');

			if( !$this.hasClass('active') ) {

				if( !TCBLife.checkTouchScreen() && !Layout.settings.improvePerformance ) 
					$content.addClass('scaled');

				$menu.addClass('activating');
				$scrollableTabs.addClass('disabled');

				setTimeout(function () {
					$body.addClass('disable-scroll');
					$overlay.addClass('overlay-nav overlay-member active');
					$this.addClass('active');
					$menu.addClass('active');
					$overlaySecondary.addClass('fade-in');
					$floatingIcons.addClass('show');

					$menu.find('[data-open-after="true"]').parents('li').addClass('open animate');

					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 1,
						scaleY: 1
					}, { duration: 500, easing: [0.42, 0, 0.58, 1] });

					if( Layout.settings.autoScrollWhenMenuIsActive ) {
						setTimeout(function () {
							$menu.animate({ scrollTop: $menu.find('[data-open-after="true"]').position().top + 200 }, 300);
						}, 600);
					}
				}, 50);

			} else {
				$this.addClass('rotating');

				$overlaySecondary.removeClass('fade-in');
				$content.removeClass('scaled');

				setTimeout(function() {
					$menu.removeClass('active');
					$.Velocity.animate($startingPoint.children('span'), {
						translateZ: 0,
						scaleX: 0,
						scaleY: 0
					}, {
						duration: 500,
						easing: [0.42, 0, 0.58, 1],
						complete: function () {
							$overlay.removeClass('overlay-nav active overlay-member');
							$this.removeClass('active rotating');
							$menu.removeClass('activating');
							$body.removeClass('disable-scroll');
							$menu.find('.open').removeClass('open animate');
							$scrollableTabs.removeClass('disabled');
					        $floatingIcons.removeClass('show');
						}
					});
				}, 200);

			}
		});

		$('.overlay-secondary-member').on('click', function () {
			$('.nav-member').trigger('click');
		});
	},



	listenKeyboardEvents: function () {
		"use strict";
		$(document).keyup(function(e) {

			var     $navProduct = $('.nav-product'),
					$navAbout = $('.nav-about'),
					$navMember = $('.nav-member'),
					$navMenu = $('.nav-menu');

			if (e.keyCode === 27 && $navMenu.hasClass('active')) {
				$navMenu.trigger('click');
			}
			
			if (e.keyCode === 27 && $navProduct.hasClass('active')) {
				$navProduct.trigger('click');
			}
			
			if (e.keyCode === 27 && $navAbout.hasClass('active')) {
				$navAbout.trigger('click');
			}

			if (e.keyCode === 27 && $navMember.hasClass('active')) {
				$navMember.trigger('click');
			}


		});
	},

	listenMenu: function () {
        "use strict";
		$('.menu-list a').on('click', function () {

			var $this = $(this),
					$menu = $(this).parents('.menu-list');

			if( $this.parents('ul').hasClass('child-menu') ) {
				if( $this.parent().hasClass('open') ) {
					$this.parent().removeClass('open animate');
				} else {
					$this.parent().siblings('.has-child').removeClass('open animate');
					$this.parent().addClass('open');
					setTimeout(function () {
						$this.parent().addClass('animate');
					}, 100);
				}
			} else {
				if( $this.parents('li').hasClass('open') ) {
					$this.parents('li').removeClass('animate open');
				} else {
					$menu.find('.open').removeClass('animate open');
					$this.parents('li').addClass('open');
					setTimeout(function () {
						$this.parents('li').addClass('animate');
					}, 10);
				}
			}
		});

		$('.menu-list').find('li:has("ul")').each( function (){
			$(this).addClass('has-child');
		});

		$('.menu-list').find('li').each( function (){
			$(this).append('<span class="hover-bg"></span>');
		});

	},

	handleSidebar: function () {
		"use strict";
		var $window = $(window),
				$body = $('body');

		if( $window.width() <= 767 ) {
			$body.addClass('layout-device layout-tablet');
		} else if( $window.width() > 767 && $window.width() < 990 ) {
			$body.addClass('layout-tablet');
			$body.removeClass('layout-device');
		} else if( $window.width() > 990 ) {
			$body.removeClass('layout-device layout-tablet');
		}
		/*Layout.resetSendMessage();*/
	},


	init: function () {
		"use strict";

		this.initLayer();
		TCBLife.callOnResize.push( this.layerResponsive ); 

		this.listenForMenuLayer();
		this.listenForProductLayer();
		this.listenForAboutLayer();
		this.listenForMemberLayer();
		this.listenKeyboardEvents();

		// Menu Links
		this.listenMenu();

		// Handle Sidebar
		this.handleSidebar();
		TCBLife.callOnResize.push( this.handleSidebar );

	}

};

