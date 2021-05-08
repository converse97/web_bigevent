$(function () {
    // 实现登录和注册界面的转换
    $("#link-reg").on('click', function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link-login").on('click', function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 利用layui进行表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repass: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致";
            }
        }
    });

    // 调用接口发起注册用户请求
    $("#form-reg").on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form-reg [name=username]').val(), password: $("#form-reg [name=password]").val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功,请登录");
            // 模拟点击行为
            $("#link-login").click();
        }
        )
    });

    // 调用接口发起登录的请求
    $("#form-login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg("登录成功!");
                // console.log(res.token);
                // 登录成功就把token值存到localstorage中，需要身份权限时需要用到
                localStorage.setItem('token', res.token);
                // 跳转界面
                location.href = '/index.html';
            }
        })
    })
})
