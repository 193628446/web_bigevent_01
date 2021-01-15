$(function () {
    // 点击去注册账号 显示注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登陆的时候 显示登录页面
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 只要引入Layui.js 就回多出来一个layui 对象 从layui 中获取form对象
    var form = layui.form;
    // 通过form.verify 函数自定义校验规则
    form.verify({
        // 属性就是规则定义的名称
        pwd: [
            // 数组中第一个元素是正则
            /^[\S]{6,12}$/,
            // 第二个元素是报错信息
            '密码必须6到12位，且不能出现空格'], 
        // 校验两次输入密码是否一致
        repwd: function (value) {
            // 获取注册表单中的密码值
            var pwd = $('.reg-box input[name = password]').val().trim()
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    // 监听注册表单提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录！');
                // 手动切换到登录列表
                $('#link_login').click();
                // 重置form表单
                $('#form_reg')[0].reset();
            }
        });
    })

    // 监听登录表单的提交
    $('#form_login').submit(function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                // 页面跳转  
                location.href = '/index.html',
                // 保存到本地将登录成功之后的token 字符串保存 将来要使用token
                localStorage.setItem('token', res.token);

            }
        });
    });
})