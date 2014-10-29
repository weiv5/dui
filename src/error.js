define(function() {
    var ErrCode = {
        1 : "cannot find container to render"
    };

    function Err(code) {
        var msg = "unkonw error";
        if (typeof ErrCode[code] !== "undefined") {
            msg = ErrCode[code];
        }
        throw new Error(msg);
    }
    return Err;
});
