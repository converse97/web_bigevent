$(function () {
    // 发起$.get(),$.post(),$.ajax()时，先执行$.ajaxProfilter()
    $.ajaxPrefilter(function (option) {
        option.url = "http://api-breakingnews-web.itheima.net" + option.url;
    })
})