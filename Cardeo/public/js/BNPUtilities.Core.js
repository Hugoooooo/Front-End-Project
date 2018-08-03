/******************************************************
* 建立者　：Chris Su
* 建立日期：2015/01/16
* 版本　　：V1.0.0.2
* 說明　　：需搭配jQuery核心一起使用
* 
* 修訂說明：
* 2015/10/26 - Chris Su
* a.修正ShowWindow處理方式，可以動態改變視窗大小
* b.預設可以調整視窗大小
* c.開窗後，會預設關注該視窗
*
* 2016/01/26 - Genty Chen
* a.加強ShowWindow處理不會有閃兩次的錯覺
******************************************************/

//開啟視窗
//@parUrl(文字):開啟的網址
//@parWidth(數字,可忽略):視窗寬度
//@parHeight(數字,可忽略):視窗高度
//@parWindowName(文字,可忽略):指定的ID名稱
//@parTop(數字,可忽略):視窗再Y軸位置
//@parLeft(數字,可忽略):視窗再X軸位置
//@parResizable(數字[0:不可調整,1:可調整],可忽略):是否允許調整視窗大小
function ShowWindow(parUrl, parWidth, parHeight, parWindowName, parTop, parLeft, parResizable) {
    var _Width = (parWidth) ? parWidth : 800;
    var _Height = (parHeight) ? parHeight : 600;
    var _WindowName = (parWindowName) ? parWindowName : '__OpneWindow';
    var _Top = (parTop) ? parTop : 100;
    var _Left = (parLeft) ? parLeft : 180;
    var _Resizable = (parResizable) ? parResizable : 1;

    var _window = window.open(parUrl, _WindowName, 'top=' + _Top + ',left=' + _Left + ',resizable=' + _Resizable + ',toolbar=no,location=no,directories=no,scrollbars=yes,status=yes' + ',width=' + _Width + ',height=' + _Height);
    //_window.resizeTo(_Width, _Height);
    _window.focus();

    return _window;
}

//顯示對話視窗
//@parUrl(文字):開啟的網址
//@parWidth(數字,可忽略):視窗寬度
//@parHeight(數字,可忽略):視窗高度
function ShowDialog(parUrl, parWidth, parHeight) {
    var _Width = (parWidth) ? parWidth : 800;
    var _Height = (parHeight) ? parHeight : 600;
    return window.showModalDialog(parUrl, null, 'dialogWidth=' + _Width + 'px;dialogHeight=' + _Height + 'px;resizable=yes;scroll=yes');
}

//判斷是否為閏年，回傳Boolean
//@parYear(string):西元年
function isLeapYear(parYear) {
    return ((parYear % 4 == 0 && parYear % 100 != 0) || (parYear % 400 == 0));
}

//判斷該年月的天數
//@parYear(string):西元年
//@parMonth(string):月份
function GetMonthMaxDays(parYear, parMonth) {
    switch (parseInt(parMonth)) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;
        case 2:
            if (isLeapYear(parYear)) {
                return 29;
                break;
            }
            else {
                return 28;
                break;
            }
    }

}

//共用按鈕處理，如日曆盒，或Key-Value的參數選擇，以 id前綴作區分
$(document).ready(function () {
    // 點擊日期輸入框
    $("input[id^='iptDate']").on("click", function () {
        WdatePicker({ dateFmt: 'yyyy/MM/dd', lang: "zh-tw", skin: "whyGreen" });
    });

    // 點擊日曆圖片
    $("img[id^='imgDate']").on("click", function () {
        var iptID = $(this).attr("id").replace("img", "ipt"); // 請留意，所有的日曆img id都要有配合的ipt id! 例如：imgDateStart / iptDateStart
        WdatePicker({ el: iptID, dateFmt: 'yyyy/MM/dd', lang: "zh-tw", skin: "whyGreen" });
    });

    // 儲存檔案按鈕，頁面上如有html File標籤，一律以 parFile起始，其後加上流水號，File的對應Hidden欄位一律為 hidparFile+流水號
    $("input[id^='parFile']").on("change", function () {
        var _id = $(this).attr("id");
        $("#hid" + _id).val($(this).val());
    });

});

//初始化 jQuery Validate
//@parFormID:頁面上要作驗證的 form id
function InitValidate(parFormID, parMethodUrl) {

    // 初始化 jQuery Validate  //$("#" + parFormID).validate();
    $("#" + parFormID).validate({
        onclick: false,
        onfocusout: false,
        //ignore: [],
        ignore: ":disabled",
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var errList = validator.errorList;
                var summary = "";
                //$.each(errList, function () { alert(this.element.id + " , " + $("#lbl" + this.element.id).text().trim().split(" ")[0]); summary += $("#lbl" + this.element.id).text().trim().split(" ")[0] + " ： " + this.message + "\n"; });
                $.each(errList, function () { summary += $("#lbl" + this.element.id).text().trim().split(" ")[0] + " ： " + this.message + "\n"; });
                alert(summary);
                validator.errorList[0].element.focus();
            }
        },
        errorPlacement: function (error, element) {

        } //, 
        //        showErrors: function (errorMap, errorList) {
        //            var summary = "";
        //            $.each(errorList, function () { summary += " * " + this.message + "\n"; });
        //            alert(summary);
        //            this.defaultShowErrors();
        //        }

    });

    // 加入自訂條件，以 class 作區分，新增的驗證方法寫在 jquery.validate.extend內
    $(".vReq").each(function () {
        $(this).rules("add", { required: true });
    });

    $(".vVeq").each(function () {
        $(this).rules("add", { ValueNotEquals: "" });
    });

    $(".vImg").each(function () {
        $(this).rules("add", { FileFormatImg: "" });
    });

    // ajax 作Campaign Code驗證
    $(".vaDup").on("blur", function () {
        var obj = {
            'parCampaignCode': $("#iptCampaignCode").val(),
            'parProductSerial': $("#iptProductserial").val()
        };
        var method = "CheckCampaignData";
        parMethodUrl = parMethodUrl.replace(method, "") + method; // "CheckCampaignData"是Controller的方法名稱，置於BasisController共用方法
        CoreAjaxCall(JSON.stringify(obj), parMethodUrl, _parCallBackValidateCampaignCode, true, 'application/json; charset=utf-8');
    });

    // ajax 作Campaign Code有無廣告連結驗證
    $(".vaAD").on("click", function () {
        if ($(this).is(':checked') == false)
        {
            var obj = {
                'parCampaignCode': $("#iptCampaignCode").val()
            };
            var method = "CheckPDIsExsit";
            parMethodUrl = parMethodUrl.replace(method, "") + method; // "CheckPDIsExsit"是Controller的方法名稱，置於CMS1002Controller
            CoreAjaxCall(JSON.stringify(obj), parMethodUrl, _parCallBackValidateAD, true, 'application/json; charset=utf-8');
        }
    });

}

function _parCallBackValidateAD(data) {
    if (data.result) {
    }
    else {  // using return string as false and false message
        $("#iptActive").prop("checked", true);
        alert(data.msg);
        return false;
    }
}

function _parCallBackValidateCampaignCode(data) {
    if (data.result) {

        var parseData = JSON.parse(data.msg)

        $("#iptDateStart").val(parseData.Startdate.substring(0, 10).replace(/\-/g, "/"));
        $("#iptDateEnd").val(parseData.Enddate.substring(0, 10).replace(/\-/g, "/"));
        // alert("true"); // Campaign Code 檢查成功時不用 alert
        return true;
    }
    else {  // using return string as false and false message
        
        $("#iptDateStart").val("");
        $("#iptDateEnd").val("");
        alert(data.msg);
        return false;
    }
}

// 快速查詢使用
function QuickSearch(parThis) {
    var _Act = parThis.attr("id").replace("aFast", "");
    $('#hidQuickSearch').val(_Act);
    $('#hidShowPageIndex').val(1); // 點擊快速查詢時，需重設分頁
    QueryEvent();
}









