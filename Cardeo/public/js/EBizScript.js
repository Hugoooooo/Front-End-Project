//Google分析碼必要區段
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

//全域變數
var AjaxWebServiceUrl = '';
var EnvMode = '';
var SystemDate = new Date(new Date().toFormat('yyyy/mm/dd'));

function DocumentReady() {
    //將AjaxWebSerivce參數取出
    AjaxWebServiceUrl = $('#hidAjaxWebServiceUrl').val();
    //環境模式
    EnvMode = $('#hidEnv').val();

    //偵測如果是PC瀏覽器，隱藏Line的項目
    var ua = navigator.userAgent;
    var isiPad = /iPad/i.test(ua) || /iPhone/i.test(ua);
    var isAndroid = ua.indexOf("android") != -1 || ua.indexOf("Android") != -1;
    var isIE = ua.indexOf("MSIE") != -1;

    if (!(isiPad || isAndroid)) {
        $('#LineShareSp').hide();
        $('#LineShare').hide();
    }

    if (!isIE) {
        $('ul.navbar-right li:first').hide();
    }

    $('input:text').each(function () {
        //加入左右兩側清除空白處理
        var RemoveBlank = function () { $(this).val($.trim($(this).val())); }
        $(this).change(RemoveBlank);

        // undefined
        //數字TextBox加入輸入限制效果
        if ($(this).attr('class') != undefined && $(this).attr('class').indexOf('NumTextBox') != -1) {
            $(this).keypress(NumberOnlyKeyPress);
            $(this).blur(NumberOnlyBlur);
        }
    });

    $('.calendarset').datepicker({ format: 'yyyy/mm/dd', language: 'zh-TW' });

    var GATracking = $('#hidGATracking').val();
    if (GATracking == '1' && EnvMode != 'DEV' && $('#hidGACode').val() != '') {
        ga('create', $('#hidGACode').val(), 'auto');
        ga('send', 'pageview');
    }
}

//限定輸入數字
function NumberOnlyKeyPress(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code < 48 || code > 57) { return false; }
}

//限定輸入數字 numpad數字 8:backspace 46:delete 37:左 39:右 (倒退鍵、刪除鍵、左、右鍵也允許作用) 
function NumberOnlyKeyEvent(e) {
    var key = (e.keyCode ? e.keyCode : e.which);

    //8:backspace 46:delete 37:左 39:右 (倒退鍵、刪除鍵、左、右鍵也允許作用) 
    if ((key >= 48 && key <= 57)
        || (key >= 96 && key <= 105)
        || 8 == key || 46 == key || 37 == key || 39 == key
        ) {
        return true;
    } else {
        return false;
    }
}

//限定輸入數字
function NumberOnlyBlur(parObject) {
    $(parObject).val($(parObject).val().replace(/[^0-9]/g, ''));
}

//阻止給定的keycode
function stopKeyUnValidCharacter(stopCodeArray, e) {
    var key = (e.keyCode ? e.keyCode : e.which);

    return $.inArray(key, stopCodeArray) === -1;
}

//檢查是否含有不可輸入字元 , ; |
function checkLimitedCharacters(inputVal) {
    var p = /[\|,︱；，]+/;

    return p.test(inputVal);
}

//檢查是否年滿20歲，回傳bool
//@parBirrhday(string):生日
function CheckAge(parBirrhday) {
    var SystemYear = SystemDate.getFullYear();
    var Birrhday = new Date(parBirrhday);

    var Age = SystemYear - parseInt(Birrhday.getFullYear());

    if (Age > 20) {
        return true;
    }
    else if (Age == 20) {
        //需判斷月份與日期是否滿足20歲
        if ((SystemDate.getMonth() + 1) > parseInt(Birrhday.getMonth() + 1)) {
            return true;
        }
        else {
            if ((SystemDate.getDate()) >= parseInt(Birrhday.getDate())) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}


//檢查是否超過100歲，回傳bool
//@parBirrhday(string):生日
function CheckAgeOverHundred(parBirrhday) {
    var SystemYear = SystemDate.getFullYear();
    var Birrhday = new Date(parBirrhday);

    var Age = SystemYear - parseInt(Birrhday.getFullYear());

    if (Age < 100) {
        return true;
    }
    else if (Age == 100) {
        //需判斷月份與日期是否滿足100歲
        if ((SystemDate.getMonth() + 1) < parseInt(Birrhday.getMonth() + 1)) {
            return true;
        }
        else {
            if ((SystemDate.getDate()) <= parseInt(Birrhday.getDate())) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}

function ModalInitial() {
    $('#FinishReadPDP').hide();
    $('#btnConfirm').hide();
    $('#btnYes').hide();
    $('#btnNo').hide();
}

//顯示Modal類的訊息方法
//@parMessageArray(array):錯誤訊息陣列
//@parCallBack(function):
function mAlert(parMessageArray, parCallBack) {
    ModalInitial();
    $('#btnConfirm').show();
    var ErrorMessage = '';

    if ($('#ModalAlert').size() == 0) {
        for (var i = 0; i < parMessageArray.length; i++) {
            if (parMessageArray[i] != '') {
                ErrorMessage += parMessageArray[i];
            }
        }

        alert(ErrorMessage);
    }
    else {
        for (var i = 0; i < parMessageArray.length; i++) {
            if (parMessageArray[i] != '') {
                //因AP層回傳的錯誤訊息採用\n分隔，需要另外轉處理換行符號
                var AddMessage = parMessageArray[i].replace(/\\n/g, '<br />');
                ErrorMessage += '<i class="ico-warning mr10"></i>&nbsp;' + AddMessage + '<br />';
            }
        }

        $('#lblAlertMessage').html(ErrorMessage);
        $('#ModalAlert').modal('show');

        if (parCallBack != null) {
            $('#btnConfirm').click(parCallBack);
        }
    }
}

//顯示Modal類的訊息方法
//@parMessageArray(Array):訊息陣列
//@parBtnYesName:Yes按鈕的顯示名稱
//@parBtnNoName:No按鈕的顯示名稱
//@parYesCallBack:選擇Yes的Call Back處理
//@parNoCallBack:選擇No的Call Back處理
//@parShowPDP:顯示個資申明事項
function mConfirm(parMessageArray, parBtnYesName, parBtnNoName, parYesCallBack, parNoCallBack, parShowPDP,defaultCallback) {
    ModalInitial();
    if (parShowPDP) {
        $('#FinishReadPDP').show();
        $('#cbMasterPDP').prop('checked', false);

        $('#btnYes').prop('disabled', true);
        $('#FinishReadPDP').click(function () {
            $('#btnYes').prop('disabled', !$('#cbMasterPDP').prop('checked'));
        });
    }

    $('#btnYes').show();
    $('#btnNo').show();
    $('#btnYes').text(parBtnYesName);
    $('#btnNo').text(parBtnNoName);

    var ErrorMessage = '';
    for (var i = 0; i < parMessageArray.length; i++) {
        if (i != 0) {
            ErrorMessage += '&nbsp;';
        }

        if (parMessageArray[i] != '') {
            ErrorMessage += parMessageArray[i] + '<br />';
        }
    }

    $('#lblAlertMessage').html(ErrorMessage);
    $('#ModalAlert').modal('show');

    if (parYesCallBack != null) {
        $('#btnYes').click(function () { parYesCallBack(); });
    }
    if (parNoCallBack != null) {
        $('#btnNo').click(function () { parNoCallBack(); });
    }

    if ($.isFunction(defaultCallback)) {
        defaultCallback();
    }
}

//增加「,」符號
//@parValue:數值
function AddComma(parValue) {
    //移除,符號
    var num = RemoveComma(parValue);

    //判斷是否為負數
    var neg = false;
    if (num.indexOf('-') != -1) {
        neg = true;
        num = num.replace('-', '');
    }

    var re = /\d{1,3}(?=(\d{3})+$)/g;

    num = num.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, "$&,") + s2; });

    //若為負數則回填負號	
    if (neg) {
        num = '-' + num;
    }

    return num;
}

//移除,符號(千分位)
//@parValue:數值
function RemoveComma(parValue) {
    //傳進來的有可能為數字型態，先轉換為文字型態
    parValue = $.trim(parValue.toString());

    return parValue.replace(/\,/g, '');
}

//移除空白字元陣列
//@parArray(array):陣列內容
function RemoveBlankArray(parArray) {
    var NewArray = new Array();

    for (var i = 0; i < parArray.length; i++) {
        if (parArray[i] != '') {
            NewArray.push(parArray[i]);
        }
    }

    return NewArray;
}

//顯示BlockUI
function ShowBlock() {
    $.blockUI({ message: "<h4>資料處理中，請稍候，勿離開此頁面，謝謝！</h4>" });
}

//關閉BlockUI
function HideBlock() {
    $.unblockUI();
}

//加入我的最愛
//@parUrl(string):網址
//@patTitle(string):書籤抬頭
function AddFavorite(parUrl, patTitle) {
    if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(patTitle, parUrl, "");
    } else if (window.external) {
        window.external.AddFavorite(parUrl, patTitle);
    }
}
//取得URL querystring
function getQueryStringToObject() {
    var obj = { haveData: false },
    queryStr = location.search.replace("?", ""),
    queryStrArr = queryStr.split("&"),
    tmp = null;

    if (queryStr !== "") {

        for (var i = 0; i < queryStrArr.length; i++) {
            tmp = queryStrArr[i].split("=");
            obj[tmp[0]] = tmp[1];
        }

        obj.haveData = true;
    }

    return obj;
}

//對該節點自動補class內容
//@jqueryNodeArray:要補的node
//@classItem:class
function autoAddClassAtNode(jqueryNodeArray,classItem) {
    if ($.isArray(jqueryNodeArray)) {
        var filterDisabled = function (item) {
            return item === classItem ? item : "";
        };

        $.each(jqueryNodeArray, function (index, node) {
            var nodeClass = node.attr("class");

            if (nodeClass.split(/\s+/).filter(filterDisabled).length === 0) {
                node.attr("class", nodeClass + " " + classItem);
            }
        });
    }
}

//對該節點自動移除class內容
//@jqueryNodeArray:要補的node
//@classItem:class
function autoRemoveClassAtNode(jqueryNodeArray, classItem) {
    if ($.isArray(jqueryNodeArray)) {
        var sortDisabledAtFirst = function (a, b) {
            return a === classItem || b === classItem ? -1 : 0;
        };

        $.each(jqueryNodeArray, function (index, node) {
            var nodeClass = node.attr("class");
            nodeClass = nodeClass.split(/\s+/).sort(sortDisabledAtFirst);

            if (nodeClass.length > 0 && nodeClass[0] === classItem) {
                nodeClass.shift();
                node.attr("class", nodeClass.join(" "));
            }
        });
    }
}

