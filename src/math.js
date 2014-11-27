define(function() {
    return {
        add : function(a, b) {
            a = parseFloat(a);
            b = parseFloat(b);
            var f1 = a%1,
                f2 = b%1;
            if (f1===0 && f2===0) {
                return a+b;
            }
            if (f1 !== 0) {
                f1 = a.toString().split(".")[1].length;
            }
            if (f2 !== 0) {
                f2 = b.toString().split(".")[1].length;
            }
            var p = Math.pow(10, Math.max(f1, f2));
            return (a*p + b*p)/p;
        }
    };
});
