var TCBLife = {

    settings: {
        rippledButtons: true,
        paths: {
            images: "../imgs",
            css: "../css"
        },
    },

    colors: {
        white: "#fff",
        black: "#000",
        primary: "#006aa8",
        info: "#03a9f4",
        success: "#009474",
        warning: "#ffc107",
        danger: "#bb1e39",
    },

    callOnResize: [],

    checkTouchScreen: function() {
        "use strict";
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('body').addClass('touch-screen');
            return true;
        } else {
            $('body').removeClass('touch-screen');
            return false;
        }
    },

    handleElementsOnResizing: function() {
        "use strict";
        var resizing;
        $(window).resize(function() {
            if (resizing) {
                clearTimeout(resizing);
            }
            resizing = setTimeout(function() {
                for (var i = 0; i < TCBLife.callOnResize.length; i++) {
                    TCBLife.callOnResize[i].call();
                }
            }, 300);
        });
    },

    handleGoTop: function() {
        "use strict";
        $(window).scroll(function() {
            if ($(this).scrollTop() > 10) {
                $('.go-top').fadeIn(200);
            } else {
                $('.go-top').fadeOut(200);
            }
        });
        $('.go-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 300);
        });
    },

    handleDropdownMenu: function() {
        "use strict";
        $('body').on('click', '.dropdown-menu.keep-open', function(e) {
            e.stopPropagation();
        });
    },

    handleTooltipsAndPopovers: function() {
        "use strict";
        $('body').tooltip({
            selector: '[data-toggle="tooltip"]'
        });
        $('body').popover({
            selector: '[data-toggle="popover"]'
        });
    },

    handleTabs: function() {
        "use strict";
        var hash = document.location.hash;
        var prefix = "tab_";
        if (hash) {
            $('.nav a[href=' + hash.replace(prefix, "") + ']').trigger('click');
        }
        $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function(e) {
            window.location.hash = e.target.hash.replace("#", "#" + prefix);
        });
    },

    handleAccordionAndToggles: function() {
        "use strict";
        $('.accordion a[data-toggle="collapse"]').click(function() {
            $(this).parents('.accordion').find('.panel-heading').removeClass('active');
            if ($(this).parent().next().hasClass('in')) {
                $(this).parents('.panel-heading').removeClass('active');
            } else {
                $(this).parents('.panel-heading').addClass('active');
            }
        });
        $('.toggle a[data-toggle="collapse"]').click(function() {
            $(this).parents('.panel-heading').toggleClass('active');
        });
    },

    handleFastClick: function() {
        "use strict";
        $(function() {
            FastClick.attach(document.body);
        });
    },

    handleBookmarking: function() {
        "use strict";
        $("#bookmarkme").click(function() {
            var url = 'http://' + location.host;
            var name = $('title').text();;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                alert("請點選" + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ?
                    'Command/Cmd' : 'CTRL') + "+D 以加入最愛。")
            } else if (window.sidebar) {
                $(this).attr('rel', 'sidebar');
                $(this).attr('href', url);
                $(this).attr('title', name);
                window.sidebar.addPanel('', '', '');
            } else if (window.external) {
                window.external.addFavorite(url, name);
            }
            return;
        });
    },

    initSelectPicker: function() {
        "use strict";
        $('select.selecter').selectpicker();
    },

    initAutoSizeTextarea: function() {
        "use strict";
        $('.js-auto-size').textareaAutoSize();
    },

    listenInputs: function() {
        "use strict";
        $('.inputer').on('keyup', function() {
            var $formControl = $(this).find('.form-control');
            if ($formControl.val().length > 0)
                $formControl.addClass('valid');
            else
                $formControl.removeClass('valid');
        });
        $('.inputer').trigger('keyup');

    },

    initInputerBorders: function() {
        "use strict";
        $('.inputer>.input-wrapper>.form-control:disabled').parents('.input-wrapper').addClass('disabled');

        $('.inputer>.input-wrapper>.form-control[readonly]').parents('.input-wrapper').addClass('readonly');

        $('.inputer>.input-wrapper>.form-control').on('focus', function() {
            $('.input-wrapper.active').removeClass('active');
            $(this).parents('.input-wrapper').addClass('active');
        });
        $('.inputer>.input-wrapper>.form-control').on('blur', function() {
            $('.input-wrapper.active').removeClass('active');
        });
    },

    handleRippledButtons: function() {
        "use strict";
        if (this.settings.rippledButtons) {
            var element, ripple, d, x, y;
            var i = 1;
            var queue = [];
            $('.btn').addClass('btn-ripple');
            $(document).on('click', '.btn-ripple', function(e) {
                element = $(this);
                if (queue.length > 5) {
                    $('._' + queue.shift()).remove();
                }
                if (i > 1000) {
                    i = 0;
                }
                i++;
                queue.push(i);
                element.append('<span class="ripple _' + i + '"></span>');
                ripple = element.find('._' + i);
                if (!ripple.height() && !ripple.width()) {
                    d = Math.max(element.outerWidth(), element.outerHeight());
                    ripple.css({
                        height: d,
                        width: d
                    });
                }
                x = e.pageX - element.offset().left - ripple.width() / 2;
                y = e.pageY - element.offset().top - ripple.height() / 2;
                ripple.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass('animate');
            });
        }
    },

    handleHeaderTransform: function() {
        "use strict";
        $(window).scroll(function() {
            if ($(document).scrollTop() > 80) {
                $(".page-header").removeClass("full-header").addClass("compact-header");
                $(".header-shadow").removeClass("full-header").addClass("compact-header");
                $(".nav-menu").removeClass("full-height").addClass("compact-height");
                $(".nav-list").removeClass("full-height").addClass("compact-height");
                $(".floating-icon").removeClass("full-height").addClass("compact-height");
                $(".menu-list").removeClass("full-height").addClass("compact-height");
            } else {
                $(".page-header").removeClass("compact-header").addClass("full-header");
                $(".header-shadow").removeClass("compact-header").addClass("full-header");
                $(".nav-menu").removeClass("compact-height").addClass("full-height");
                $(".nav-list").removeClass("compact-height").addClass("full-height");
                $(".floating-icon").removeClass("compact-height").addClass("full-height");
                $(".menu-list").removeClass("compact-height").addClass("full-height");
            }
        });
    },

    handleTabAccordion: function() {
        "use strict";
        $('#product-tab').tabCollapse({
            tabsClass: 'hidden-xs',
            accordionClass: 'visible-xs'
        });
        $('#faq-tab').tabCollapse({
            tabsClass: 'hidden-xs',
            accordionClass: 'visible-xs'
        });
        $('#country-tab').tabCollapse({
            tabsClass: 'hidden-xs',
            accordionClass: 'visible-xs'
        });
    },

    handleTabDestination: function() {
        "use strict";
        $("a[data-tab-destination]").on('click', function() {
            var tab = $(this).attr('data-tab-destination');
            $("#" + tab).click();
        });
    },


    handleResponsiveTable: function() {
        "use strict";
        $("#feature-table").cardtable();
        $("#skype-table").cardtable();
        $("#payment-table").cardtable();
        $("#query-table").cardtable();
        $("#benefit-table").cardtable();
        $("#benefit-table-2").cardtable();
        $("#creditcard-table").cardtable();
    },

    handleMaterialAnimation: function() {
        "use strict";
        var speed = 2000;
        var container = $('.display-animation');
        container.each(function() {
            var elements = $(this).find('.material-animate');
            elements.each(function() {
                var elementOffset = $(this).offset();
                var offset = elementOffset.left * 0.8 + elementOffset.top;
                var delay = parseFloat(offset / speed).toFixed(2);
                $(this)
                    .css("-webkit-animation-delay", delay + 's')
                    .css("-o-animation-delay", delay + 's')
                    .css("animation-delay", delay + 's');
                makeWatcher($(this));
            });
        });

        function makeWatcher(element) {
            var watcher = scrollMonitor.create(element);
            function addClass() {
                if (watcher.enterViewport) {
                    element.addClass('material-animated');
                    watcher.destroy();
                }
            }
            watcher.stateChange(addClass);
            addClass();
        }
    },

    handleHomepageSlides: function() {
        "use strict";
        $('#homepage-slides').flexslider({
            animation: "slide",
            prevText: "",
            nextText: ""
        });
    },

    handleMoreProducts: function() {
        "use strict";
        $('a.more-products').smoothScroll({
            offset: -90
        });
        $(document).on("scroll", function() {
            if ($(document).scrollTop() > 80) {
                $(".more-products").fadeOut();
            } else {
                $(".more-products").fadeIn();
            }
        });
    },

    handleDateRange: function() {
        "use strict";

        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var currentData = d.getFullYear() + '/' +
            (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day;

        $('input[name="birthdate"]').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoApply": true,
            "linkedCalendars": false,
            "minDate": "1935/04/11",
            "maxDate": currentData,
            locale: {
                format: 'YYYY/MM/DD'
            }
        });
        $('input[name="daterange"]').daterangepicker({
            timePicker: true,
            timePicker24Hour: true,
            timePickerIncrement: 30,
            locale: {
                format: 'YYYY/MM/DD HH:mm'
            }
        });
        $('input[name="startdate"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            linkedCalendars: false,
            locale: {
                format: 'YYYY/MM/DD'
            }
        });
        $('input[name="enddate"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            linkedCalendars: false,
            locale: {
                format: 'YYYY/MM/DD'
            }
        });
        $('input[name="daterangequery"]').daterangepicker({
            showDropdowns: true,
            linkedCalendars: false,
            locale: {
                format: 'YYYY/MM/DD'
            }
        });
        $('#start-time').change(function() {
            var option = $(this).find('option:selected').val();
            $('#end-time').text($(this).val());
        });

        $('#start-time2').change(function() {
            var option2 = $(this).find('option:selected').val();
            $('#end-time2').text($(this).val());
        });
    },

    handleStyleRadioCheck: function() {
        "use strict";
        $('input,textarea').attr('autocomplete', 'off');
        $("#ta-spread-main-select").hide();
        $("#ta-spread-sub-select-1").hide();
        $("#ta-spread-sub-select-2").hide();
        $('#ta-spread-main-check').change(function() {
            if ($(this).prop("checked")) {
                $('#ta-spread-main-select').show();
            } else {
                $('#ta-spread-main-select').hide();
            }
        });
        $('#ta-spread-sub-check-1').change(function() {
            if ($(this).prop("checked")) {
                $('#ta-spread-sub-select-1').show();
            } else {
                $('#ta-spread-sub-select-1').hide();
            }
        });
        $('#ta-spread-sub-check-2').change(function() {
            if ($(this).prop("checked")) {
                $('#ta-spread-sub-select-2').show();
            } else {
                $('#ta-spread-sub-select-2').hide();
            }
        });
        $("#ta-main-select").hide();
        $("#ta-sub-select-1").hide();
        $("#ta-sub-select-2").hide();
        $('#ta-main-check').change(function() {
            if ($(this).prop("checked")) {
                $('#ta-main-select').show();
            } else {
                $('#ta-main-select').hide();
            }
        });
        $('#ta-sub-check-1').change(function() {
            if ($(this).prop("checked")) {
                $('#ta-sub-select-1').show();
            } else {
                $('#ta-sub-select-1').hide();
            }
        });
        $('#ta-sub-check-2').change(function() {
            if ($(this).prop("checked")) {
                $('#ta-sub-select-2').show();
            } else {
                $('#ta-sub-select-2').hide();
            }
        });
    },

    handleMaskInput: function() {
        "use strict";
        $("#mobilephone").mask("(9999) 999-999");
    },

    handleBenefitDivide: function() {
        "use strict";
        $('#by-order-trigger,#by-order-trigger2').change(function() {
            var $changedElement = $(this);
            if ($changedElement.val() !== '') {
                $("#by-order,#by-order2").show();
                $("#help-notes").show();
                $("#by-percentage,#by-percentage2").hide();
            }
        });
        $('#by-percentage-trigger,#by-percentage-trigger2').change(function() {
            var $changedElement = $(this);
            if ($changedElement.val() !== '') {
                $("#by-percentage,#by-percentage2").show();
                $("#help-notes").show();
                $("#by-order,#by-order2").hide();
            }
        });
    },

    handleSubscribeClone: function() {
        "use strict";
        var template = $('#cloned-sections .redeem-box:first').clone();
        var sectionsCount = 1;
        $('body').on('click', '.order-clone', function() {
            sectionsCount++;
            var section = template.clone().find(':input').each(function() {
                var newId = this.id + sectionsCount;
                $(this).next().attr('for', newId);
                this.id = newId;
                this.name =  $(this).attr('name');
				var newName = $(this).attr('name') + sectionsCount;
                this.name = newName;
            }).end()
            .appendTo('#cloned-sections');
            return false;
        });
        $('#cloned-sections').on('click', '.order-remove', function() {
            $(this).parent().fadeOut(300, function() {
                $(this).parent().parent().empty();
                return false;
            });
            return false;
        });
		
        var templateAlt = $('#cloned-sections-alt .redeem-box:first').clone();
        var sectionsCountAlt = 1;
        $('body').on('click', '.percentage-clone', function() {
            sectionsCountAlt++;
            var sectionAlt = templateAlt.clone().find(':input').each(function() {
                var newId = this.id + sectionsCountAlt;
                $(this).next().attr('for', newId);
                this.id = newId;
                this.name =  $(this).attr('name');
				var newName = $(this).attr('name') + sectionsCountAlt;
                this.name = newName;
            }).end()
            .appendTo('#cloned-sections-alt');
            return false;
        });
        $('#cloned-sections-alt').on('click', '.percentage-remove', function() {
            $(this).parent().fadeOut(300, function() {
                $(this).parent().parent().empty();
                return false;
            });
            return false;
        });
    },

    handleMyPlan: function() {
        "use strict";
        $("button.remove-all").click(function() {
            $('.my-plan').fadeOut("slow", function() {
                $('.my-plan').remove();
            });
        });
        function remove() {
            $(this).parents(".my-plan").fadeOut("slow");
        }
        $("button.remove").on("click", remove);
    },

    handlePopupKeypad: function() {
        "use strict";
        $('#keypad-open').click(function() {
            $("#keypad").fadeIn(300);
        });
        $('#keypad-close').click(function() {
            $("#keypad").fadeOut(300);
        });
        $('#btn-keypad-close').click(function() {
            $("#keypad").fadeOut(300);
        });
        $('#keypad-open2').click(function() {
            $("#keypad2").fadeIn(300);
        });
        $('#keypad-close2').click(function() {
            $("#keypad2").fadeOut(300);
        });
        $('#btn-keypad-close2').click(function() {
            $("#keypad2").fadeOut(300);
        });
        $('#keypad-open3').click(function() {
            $("#keypad3").fadeIn(300);
        });
        $('#keypad-close3').click(function() {
            $("#keypad3").fadeOut(300);
        });
        $('#btn-keypad-close3').click(function() {
            $("#keypad3").fadeOut(300);
        });
    },

    handleAnimatedCircle: function() {
        "use strict";
        $('#static-1').circleProgress({
            value: parseFloat($('#static-1').attr("data-percent")) / 100,
            size: 160,
            fill: {
                gradient: ["#79c802", "#79c802"]
            }
        }).on('circle-animation-progress', function(event, progress) {
            $('#static-1').find('strong').html(parseInt($('#static-1').attr("data-percent") * progress) + '<i>%</i>');
        });
        $('#static-2').circleProgress({
            value: parseFloat($('#static-2').attr("data-percent")) / 100,
            size: 160,
            fill: {
                gradient: ["#79c802", "#79c802"]
            }
        }).on('circle-animation-progress', function(event, progress) {
            $('#static-2').find('strong').html(parseInt($('#static-2').attr("data-percent") * progress) + '<i>%</i>');
        });
        $('#static-3').circleProgress({
            value: parseFloat($('#static-3').attr("data-percent")) / 100,
            size: 160,
            fill: {
                gradient: ["#79c802", "#79c802"]
            }
        }).on('circle-animation-progress', function(event, progress) {
            $('#static-3').find('strong').html(parseInt($('#static-3').attr("data-percent") * progress) + '<i>%</i>');
        });
    },

    listenClickableCards: function() {
        "use strict";
        $('.floating-open').on('click', function() {
            var $this = $(this);
            $this.parents('.clickable-button').addClass('clicked');
            $this.parents('.clickable-button').next('.layered-content').addClass('active');

            setTimeout(function() {
                $this.parents('.card-heading').css('overflow', 'hidden');
            }, 100);
        });
        $('.floating-close').on('click', function() {
            var $this = $(this);
            $this.parents('.layered-content').prev('.clickable-button').removeClass('clicked');
            $this.parents('.layered-content').removeClass('active');

            setTimeout(function() {
                $this.parents('.card-heading').css('overflow', 'visible');
            }, 600);
        });
    },

    init: function() {
        "use strict";
        this.checkTouchScreen();
        this.handleElementsOnResizing();
        this.handleGoTop();
        this.handleDropdownMenu();
        this.handleTooltipsAndPopovers();
        this.handleTabs();
        this.handleAccordionAndToggles();
        this.handleFastClick();
        this.handleBookmarking();
        this.listenInputs();
        this.initInputerBorders();
        this.handleRippledButtons();
        this.handleHeaderTransform();
        this.handleTabAccordion();
        this.handleTabDestination();
        this.handleResponsiveTable();
        this.handleMaterialAnimation();
        this.handleHomepageSlides();
        this.handleMoreProducts();
        this.handleDateRange();
        this.handleStyleRadioCheck();
        this.handleMaskInput();
        this.handleBenefitDivide();
        this.handleSubscribeClone();
        this.handleMyPlan();
        this.handlePopupKeypad();
        this.handleAnimatedCircle();
        this.listenClickableCards();
    }

};