// 每次调用 $.get() 或者$.ajax() 会先调用这个函数
var baseURL = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function (options) {
    // 获取到ajax 的所有参数
    // alert(options.url)
    options.url = baseURL + options.url;
})