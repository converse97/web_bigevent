$(function () {
    // 发起$.get(),$.post(),$.ajax()时，先执行$.ajaxProfilter()
    $.ajaxPrefilter(function (option) {
        option.url = "http://api-breakingnews-web.itheima.net" + option.url;

        // 为需要权限的请求设置headers请求头
        if (option.url.indexOf('/my/') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('token')
                    || ''
            };
        };
        option.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制跳转到注册界面
                location.href = '/login.html';
                // 强制清空token
                localStorage.removeItem('token');
            }
        }
    });


})