/**
 * Created by Rossy1 on 2018/7/13.
 */
var f = false; //底部显示隐藏
$("#topBtn").live("click", function () {
    if (!f) {
        $("#footer").css("bottom", "0px");
        f = true;
    } else {
        $("#footer").css("bottom", "-190px");
        f = false;
    }
})
//全屏
var full = false;
$("#fullScreen").live("click", function () {
    if (!full) {
        fullScreen();
        full = true;
    } else {
        exitScreen();
        full = false;
    }
})
function fullScreen() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
function exitScreen() {
    console.log(document.webkitCancelFullScreen)
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    }
}

//新建canvas
var windex = 1;
var preIdx = 1; //前一个index
var len=1;//选中的个数
var selArr = [];//选中的id
$("#newpaint").live("click", function () {
    $("#splitScreen").hide();//隐藏分屏
    $(".draw").hide();//隐藏画板
    windex++;
    // console.log(windex)
    var str1 = '<div id="wPaint' + windex + '" class="draw"></div>'; //新建canvas
    $("#content").prepend(str1);
    $("#wPaint" + windex).wPaint({
        imageBg: "images/bbb.png"
    }).data('_wPaint');
    // $("#wPaint"+windex).slideDown();

    setActimg("white");
    $("#bottom").children().removeClass("actSelect");
    var str2 = '<div id="w' + windex + '" class="imgs actSelect"></div>'; //新建缩略图
    $("#bottom").prepend(str2);
    //为上一个缩略图添加背景图片
    var backImg = $("#wPaint" + preIdx).wPaint("image");
    setwCss(preIdx,backImg)
    preIdx = windex;
    selArr = []
    selArr.push(preIdx)
})

//缩略图切换视图
$(".imgs").live("click", function () {
    var thisIdx = $(this)[0].id.substr(1);
    console.log(preIdx)
    //切换时为缩略图添加背景图片
    var backImg = $("#wPaint" + preIdx).wPaint("image");
    setwCss(preIdx,backImg)
    preIdx = thisIdx;
    //分屏
    if ($(this).hasClass("actSelect")) {
        if (len > 1) {
            $(this).removeClass("actSelect");
            selArr.removeByValue(thisIdx)
        }
    } else {
        $(this).addClass("actSelect");
        selArr.push(thisIdx)
    }
    len = selArr.length;
    if (len == 1) {
        $("#splitScreen").hide()
        $(".draw").hide()
        $("#wPaint" + selArr[0]).show()
        // $("#wPaint" + selArr[0]).slideDown()

        preIdx = $(".actSelect")[0].id.match(/\d/g).join("");
        var curentColor = $("#wPaint" + selArr[0]).find("._wColorPicker_buttonColor").css("backgroundColor");
        setActive(curentColor)
    }
    else if (len == 2) {
        setView2()
    }
    else if (len == 3) {
        setView3()
    }
    else if (len == 4) {
        setView4()
    }
    else if (len > 4) {
        $("#w" + selArr[0]).removeClass("actSelect")
        selArr.shift()
        var f1 = $("#wPaint" + selArr[0]).wPaint("image");
        var f2 = $("#wPaint" + selArr[1]).wPaint("image");
        var f3 = $("#wPaint" + selArr[2]).wPaint("image");
        var f4 = $("#wPaint" + selArr[3]).wPaint("image");
        $(".f1").css({
            "background-image": "url(" + f1 + ")",
            "background-size": "100% 100%"
        });
        $(".f2").css({
            "background-image": "url(" + f2 + ")",
            "background-size": "100% 100%"
        });
        $(".f3").css({
            "background-image": "url(" + f3 + ")",
            "background-size": "100% 100%"
        });
        $(".f4").css({
            "background-image": "url(" + f4 + ")",
            "background-size": "100% 100%"
        });
    }
    console.log(selArr)

})

//删除
$(".close").live("click", function () {
    var thiscloseId = $(this).parent().parent()[0].id.match(/\d/g).join("");
    console.log(thiscloseId)
    $("#wPaint" + thiscloseId).remove();
    $("#w" + thiscloseId).remove();
    selArr.removeByValue(thiscloseId);
    console.log(selArr)
    $(".draw").hide()
    $("#wPaint" + selArr[0]).show()
    // $("#wPaint" + selArr[0]).slideDown()
    var actNum = selArr.length;
    // console.log(actNum)
    if (actNum == 1) {
        $("#splitScreen").hide()
        preIdx = $(".actSelect")[0].id.match(/\d/g).join("");
        var curentColor = $("#wPaint" + selArr[0]).find("._wColorPicker_buttonColor").css("backgroundColor");
        setActive(curentColor)
    }
    else if (actNum == 2) {
        setView2()
    }
    else if (actNum == 3) {
        setView3()
    }
})
//最小化
$(".min").live("click", function () {
    var thisminId = $(this).parent().parent()[0].id.match(/\d/g).join("");
    selArr.removeByValue(thisminId);
    $("#w" + thisminId).removeClass("actSelect")
    console.log(selArr)
    $(".draw").hide()
    $("#wPaint" + selArr[0]).show()
    // $("#wPaint" + selArr[0]).slideDown()
    var actMin = selArr.length;
    if (actMin == 1) {
        $("#splitScreen").hide()
        preIdx = $(".actSelect")[0].id.match(/\d/g).join("");
        var curentColor = $("#wPaint" + selArr[0]).find("._wColorPicker_buttonColor").css("backgroundColor");
        setActive(curentColor)
    }
    else if (actMin == 2) {
        setView2()
    }
    else if (actMin == 3) {
        setView3()
    }
})

function setView2() {
    $("#splitScreen").show()
    $(".s").hide()
    // $(".twoScreen").show()
    $(".twoScreen").slideDown()
    var t1 = $("#wPaint" + selArr[0]).wPaint("image");
    var t2 = $("#wPaint" + selArr[1]).wPaint("image");
    $(".t1").attr("id", "t" + selArr[0])
    $(".t2").attr("id", "t" + selArr[1])
    $(".t1").css({
        "background-image": "url(" + t1 + ")",
        "background-size": "100% 100%"
    });
    $(".t2").css({
        "background-image": "url(" + t2 + ")",
        "background-size": "100% 100%"
    });
}
function setView3() {
    $("#splitScreen").show()
    $(".s").hide()
    // $(".threeScreen").show()
    $(".threeScreen").slideDown()
    var th1 = $("#wPaint" + selArr[0]).wPaint("image");
    var th2 = $("#wPaint" + selArr[1]).wPaint("image");
    var th3 = $("#wPaint" + selArr[2]).wPaint("image");
    $(".th1").attr("id", "th" + selArr[0])
    $(".th2").attr("id", "th" + selArr[1])
    $(".th3").attr("id", "th" + selArr[2])
    $(".th1").css({
        "background-image": "url(" + th1 + ")",
        "background-size": "100% 100%"
    });
    $(".th2").css({
        "background-image": "url(" + th2 + ")",
        "background-size": "100% 100%"
    });
    $(".th3").css({
        "background-image": "url(" + th3 + ")",
        "background-size": "100% 100%"
    });
}
function setView4() {
    $("#splitScreen").show()
    $(".s").hide()
    // $(".fourScreen").show()
    $(".fourScreen").slideDown()
    var f1 = $("#wPaint" + selArr[0]).wPaint("image");
    var f2 = $("#wPaint" + selArr[1]).wPaint("image");
    var f3 = $("#wPaint" + selArr[2]).wPaint("image");
    var f4 = $("#wPaint" + selArr[3]).wPaint("image");
    $(".f1").attr("id", "f" + selArr[0])
    $(".f2").attr("id", "f" + selArr[1])
    $(".f3").attr("id", "f" + selArr[2])
    $(".f4").attr("id", "f" + selArr[3])
    $(".f1").css({
        "background-image": "url(" + f1 + ")",
        "background-size": "100% 100%"
    });
    $(".f2").css({
        "background-image": "url(" + f2 + ")",
        "background-size": "100% 100%"
    });
    $(".f3").css({
        "background-image": "url(" + f3 + ")",
        "background-size": "100% 100%"
    });
    $(".f4").css({
        "background-image": "url(" + f4 + ")",
        "background-size": "100% 100%"
    });
}

//最大化
$(".max").live("click", function () {
    var thismaxId = $(this).parent().parent()[0].id.match(/\d/g).join("");
    setMax(thismaxId)
})

//双击最大化
$(".s div").live("dblclick", function () {
    var thisdbId = $(this)[0].id.match(/\d/g).join("");
    setMax(thisdbId)
})

function setMax(id) {
    selArr = []
    selArr.push(id)
    console.log(selArr)
    $(".imgs").removeClass("actSelect")
    $("#w" + id).addClass("actSelect")
    $("#splitScreen").hide()
    $(".draw").hide()
    $("#wPaint" + selArr[0]).show()
    // $("#wPaint" + selArr[0]).slideDown()
    preIdx = id
    var curColor = $("#wPaint" + selArr[0]).find("._wColorPicker_buttonColor").css("backgroundColor");
    setActive(curColor)
}
//设置画笔选中状态
function setActive(current) {
    $(".wcolors").removeClass("actimg");
    if (current == "rgb(126, 211, 33)") {
        $("#green").addClass("actimg")
    } else if (current == "rgb(87, 255, 255)") {
        $("#blue").addClass("actimg")
    } else if (current == "rgb(255, 94, 108)") {
        $("#red").addClass("actimg")
    } else if (current == "rgb(252, 253, 186)") {
        $("#yellow").addClass("actimg")
    } else if (current == "rgb(255, 255, 255)") {
        $("#white").addClass("actimg")
    }
}

//保存图片
function saveImage() {
    $(".draw").hide();//隐藏画板
    windex++;
    var imageData = $("#wPaint" + preIdx).wPaint("image");
    var str1 = '<div id="wPaint' + windex + '" class="draw"></div>'; //新建canvas
    $("#content").prepend(str1);
    $("#wPaint" + windex).wPaint({
        imageBg: imageData
    }).data('_wPaint');
    $("#bottom").children().removeClass("actSelect");
    var str2 = '<div id="w' + windex + '" class="imgs actSelect"><img src="images/c.png" class="smallcamera"></div>'; //新建缩略图
    $("#bottom").prepend(str2);
    setwCss(windex,imageData)
    setwCss(preIdx,imageData)
    selArr = [];
    selArr.push(windex);
    $("#splitScreen").hide();
    $("#wPaint" + selArr[0]).show();
    preIdx=windex;

}

//设置缩略图背景
function setwCss(index,data) {
    $("#w" + index).css({
        "background-image": "url(" + data + ")",
        "background-size": "100% 100%"
    });
}

//设置默认选中画笔的activeClass
function setActimg(id) {
    $(".wcolors").removeClass("actimg");
    $("#" + id).addClass("actimg")
}

//消隐画笔
var missPen = false;
$("#missPen").live("click", function () {
    $("._wPaint_pencil").click();
    missPen = true;
    $("._wPaint_icon").removeClass('active');
    $("#missPen").addClass("activeZ");

})

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

