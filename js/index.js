var app = new Vue({
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
clo.onclick=function () {
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
// 站长统计
var caution=false
function setCookie(name,value,expires,path,domain,secure)
{
    var curCookie=name+"="+escape(value) +
        ((expires)?";expires="+expires.toGMTString() : "") +
        ((path)?"; path=" + path : "") +
        ((domain)? "; domain=" + domain : "") +
        ((secure)?";secure" : "")
    if(!caution||(name + "=" + escape(value)).length <= 4000)
    {
        document.cookie = curCookie
    }
    else if(confirm("Cookie exceeds 4KB and will be cut!"))
    {
        document.cookie = curCookie
    }
}
function getCookie(name)
{
    var prefix = name + "="
    var cookieStartIndex = document.cookie.indexOf(prefix)
    if (cookieStartIndex == -1)
    {
        return null
    }
    var cookieEndIndex=document.cookie.indexOf(";",cookieStartIndex+prefix.length)
    if(cookieEndIndex == -1)
    {
        cookieEndIndex = document.cookie.length
    }
    return unescape(document.cookie.substring(cookieStartIndex+prefix.length,cookieEndIndex))
}
function deleteCookie(name, path, domain)
{
    if(getCookie(name))
    {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT"
    }
}
function fixDate(date)
{
    var base=new Date(0)
    var skew=base.getTime()
    if(skew>0)
    {
        date.setTime(date.getTime()-skew)
    }
}
var now=new Date()
fixDate(now)
now.setTime(now.getTime()+365 * 24 * 60 * 60 * 1000)
var visits = getCookie("counter")
if(!visits)
{
    visits=1;
}
else
{
    visits=parseInt(visits)+1;
}
setCookie("counter", visits, now)
document.getElementById('num').innerHTML = "您是到访的第" + visits + "位用户！"


$('#in li').click(function () {
    var deviceWidth = document.documentElement.clientWidth;
    if(deviceWidth < 720){
        $('#first').html($(this).html())
    }
    $(this).parents('#in').removeClass('in')
})

// $('#in li').on('click',function () {
//     $(this).parents('#in').removeClass('in')
// })

// document.designMode="on";

function Times() {
    var nav = `<h3>
                   <a href="javascript:" target="_blank" title="我的大学">山政校门<br><small>山东政法学院</small></a>
               </h3>
               <p>
                       还记得来学校报道时候那份对大学校园的憧憬，然而时光已悄然离去，留下的是记忆...
               </p>`
    var nav1 = `<h3>
                   <a href="javascript:" target="_blank" title="我的教学楼">至善楼<br><small>综合教学楼</small></a>
                </h3>
                <p>
                   2010年到2013年大部分都在这所教学楼里度过，计算机信息管理系已改名信息学院...
                </p>`
    var nav2 = `<h3>
                   <a href="javascript:" target="_blank" title="茂陵山">茂陵山<br><small>茂陵山一角</small></a>
                </h3>
                <p>
                    还记得青山有幸埋忠骨，为解放事业而牺牲的烈士长眠之地，英雄永垂不朽...
                </p>`
    var nav3 = `<h3>
                  <a href="javascript:" target="_blank" title="防空洞">防空洞<br><small>封闭的防空洞</small></a>
                 </h3>
                 <p>
                    在来学校的时候防空洞已经封闭，防空洞已经在和平年代失去了它的作用...
                 </p>`
    function Time(id,nav) {
        var n = 0;
        var t = setInterval(function () {
            document.getElementById(id).innerHTML = nav.substring(0,n);
            n = n+1;
            if(n == nav.length){
              clearInterval(t)
            }
        },55)
    }
    Time("div",nav)
    Time("d1",nav1)
    Time("d2",nav2)
    Time("d3",nav3)
}

Times()


var ref = new Wilddog("wd4012320599nndlmg.wilddogio.com/first_node");
function buts() {
    if(document.getElementById('inp').value == ''){
        alert('请留下你的昵称呗')
    }else if(document.getElementById('are').value == ''){
        alert('您还没有留言哦')
    }
    else{
        ref.push({
            "ss": document.getElementById('inp').value,
            "usesarName": document.getElementById('are').value
        }, function(error) {
            if(error == null){
                alert('留言成功！')
            }else{
                alert('留言失败！')
            }
        });
        document.getElementById('inp').value = '';
        document.getElementById('are').value = '';
    }

}
ref.orderByKey().limitToLast(3).on('value',function (snap) {
//        console.log(snap.val())
    var out = ''
    for(var a in snap.val()){
        out +=
            '<div class="user">'+
            '<ul>'+
            '<li class="text-success">'+'昵称：'+snap.val()[a].ss +'</li>'+
            '<li>'+'留言：'+snap.val()[a].usesarName +'</li>'+
            '</ul>'+
            '</div>'
    }
//        console.log(out)
    document.getElementById('box').innerHTML = out;
})
//星星
new CanvasStar().init();