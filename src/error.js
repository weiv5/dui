define([
    "./data/errcode"
], function(ErrCode) {
    function Err(code) {
        var msg = "unkonw error";
        if (typeof ErrCode[code] !== "undefined") {
            msg = ErrCode[code];
        }
        throw new Error(msg);
    }
    return Err;
});
