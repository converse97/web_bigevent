$(function () {
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    });
    getUserinfo();
})
// 获取用户信息函数
function getUserinfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token')
                || ''
        }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取失败');
            }
            // 渲染用户头像
            renderAvatar(res.data);
        },
        // 无论成功与否都会执行complete函数，没有权限不能访问主页
        /*  complete: function (res) {
             
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                 // 强制跳转到注册界面
                 location.href = '/login.html';
                 // 强制清空token
                 localStorage.removeItem('token');
             }
         } */
    });
};
// 渲染用户头像函数
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp' + name);
    // 头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();

    }
};