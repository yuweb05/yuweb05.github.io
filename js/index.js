new Vue({
    el: '#app',
    data: {
        curId: 0
    },
    computed: {},
    methods: {},
    mounted: function () {
    }
})
// 日期
$(function () {
    var date = new Date();
    $('#n').html(date.getFullYear());
    $("#y").html(date.getMonth()+1);
    $("#r").html(date.getDate());
    var xq = ['日','一','二','三','四','五','六']
    $("#x").html(xq[date.getDay()]);
})
// 百度地图
var map = new BMap.Map("allmap");
var but = document.getElementById('but');
var clo = document.getElementById('clo');
var way = document.getElementById('driving_way');
var allmap = document.getElementById('allmap');
but.onclick = function (ev) {
    $("#allmap").animate({'height':300},600)
    clo.style.display = 'block'
    way.style.display = 'block'
    but.style.display = 'none'
    // var ev = window.event || ev;  //event-----谷歌。ie   通过参数传入的ev  ----ff
    // ev.stopPropagation ?  ev.stopPropagation() :  ev.cancelBubble = true;
}
clo.onclick=function (e) {
    // e.preventDefault()
    // allmap.style.display = 'none'
    $("#allmap").animate({'height':0},600)
    clo.style.display = 'none'
    way.style.display = 'none'
    but.style.display = 'block'
}
map.centerAndZoom(new BMap.Point(116.31, 37.46), 14);
var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_LEAST_WALKING,BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];
var transit = new BMap.TransitRoute(map, {
    renderOptions: {map: map},
    policy: 0
});
$("#result").click(function(){
    var str = document.getElementById('str').value;
    var ends = document.getElementById('end').value;
    var start = '"'+str+'"';
    var end = '"'+ends+'"';
    console.log(start,end)
    map.clearOverlays();
    var i=$("#driving_way select").val();
    search(start,end,routePolicy[i]);
    function search(start,end,route){
        transit.setPolicy(route);
        transit.search(start,end);
    }
});
var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
//添加控件和比例尺
add_control()
function add_control(){
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);
    map.addControl(top_right_navigation);
}
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
// window.onload = loadJScript;  //异步加载地图

// 文字滚动
var scrollBox = $(".scrollBox");
var scrollUl = scrollBox.find("ul");
var scrollLi = scrollBox.find("li");
var boxHeight = scrollLi.eq(0).height();
var numLi=1;
function scrollMove(){
    if(numLi<boxHeight){
        numLi++;
    }else{
        numLi=1;
        var lastBox = scrollBox.find("li").eq(0).css({"margin-top":0}).clone();
        scrollUl.append(lastBox);
        scrollBox.find("li").eq(0).remove();
    }
    scrollBox.find("li").eq(0).css({"margin-top":-numLi});
}
var scrollId = setInterval(scrollMove,50);
scrollBox.hover(function(){
    clearInterval(scrollId);
},function(){
    scrollId = setInterval(scrollMove,50);
});