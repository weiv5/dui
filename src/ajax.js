define([
    "jquery"
], function($) {
    var get = function(url, success, error, timeout) {
        timeout = timeout || 5000;
        $.ajax({
            type: "GET",
            url : url,
            timeout: timeout,
            dataType:"json",
            success:function(data) {
                if (typeof success == 'function') {
                    success(data);
                }
            },
            error:function() {
                if (typeof error == 'function') {
                    error();
                }
            }
        });
    }
    var post = function(url, data, success, error, timeout) {
        timeout = timeout || 5000;
        $.ajax({
            type: "POST",
            url : url,
            timeout: timeout,
            dataType:"json",
            data : data,
            success:function(data) {
                if (typeof success == 'function') {
                    success(data);
                }
            },
            error:function() {
                if (typeof error == 'function') {
                    error();
                }
            }
        });
    }
    return {
        get : get,
        post : post
    };
});
