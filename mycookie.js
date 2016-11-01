var Cookies = {
    get: function(key, isextend) {
        //是否要展开子cookie
        var cookie = document.cookie;
        var start, end;
        var cookieArr, temp, childcookie, result = {};
        isextend = isextend || false;
        if (typeof key == "string") {
            start = cookie.indexOf(key + "=");
            if (start != -1) {
                start = start + key.length + 1;
                var end1 = cookie.indexOf("&", start); //可能含有子cookie
                var end2 = cookie.indexOf(";", start);
                end = end2;
                if (isextend) {
                    if (end1 != -1 && end1 < end2) {
                        end = end1;
                    }
                }

                if (end != -1) {
                    return cookie.slice(start, end);
                } else {
                    return cookie.slice(start);
                }
            }
        } else {
            cookieArr = cookie.split(";");
            for (var i = 0, len = cookieArr.length; i < len; i++) {
                if (isextend) {
                    childcookie = cookieArr[i].split("&"); //可能含有子cookie
                    for (var j = 0; j < childcookie.length; j++) {
                        temp = childcookie[j].split("=");
                        temp[0] = temp[0].trim();
                        if (temp[0].length > 0) {
                            result[temp[0]] = temp[1];
                        }
                    }
                } else {

                    temp = cookieArr[i].split("=");
                    temp[0] = temp[0].trim();
                    if (temp[0].length > 0) {
                        var index = temp[0];
                        temp.splice(0, 1)
                        result[index] = temp.join("=");
                    }
                }

            }
            return result;
        }
    },
    set: function(key, value, options, ischildCookie) {
        //options为一个对象时
        //options={
        // expires:[Date]具体的过期时间,
        // path:[string]path表示cookie所在的目录,
        // domain:[string]domain表示的是cookie所在的域，默认为请求的地址}
        //options为一个Number类型时表示多少天后过期,
        //ischildCookie是否包含子cookie
        ischildCookie = ischildCookie || false;
        var nowtime = new Date();
        var cookie = document.cookie;
        if (typeof key == "string" && typeof value == "string") {

            if (typeof options == "number") {
                nowtime.setDate(nowtime.getDate() + options);
                return document.cookie = key + "=" + (ischildCookie == true ? value : escape(value)) + ";expires=" + nowtime.toGMTString();
            } else if (options instanceof Object) {
                return document.cookie = key + "=" + (ischildCookie == true ? value : escape(value)) + ";expires=" + options.expires.toGMTString() + ";path=" + (typeof options.path == "undefined" ? "/" : options.path) + ";domain=" + (typeof options.domain == "undefined" ? location.hostname : options.domain);
            } else {

                return document.cookie = key + "=" + (ischildCookie == true ? value : escape(value));
            }
        }

    },
    remove: function(key) {
        var nowtime = new Date();
        nowtime.setTime(nowtime.getTime() - 1);
        var value = this.get(key);
        if (value != null) {
            document.cookie = key + "=" + value + ";expires=" + nowtime.toGMTString();
        }
    },
    ischildCookie: function(key) {
        var start;
        var cookie = document.cookie;
        if (typeof key == "string") {
            start = cookie.indexOf(key + "=");
            if (start != -1) {
                start = start + key.length + 1;
                var end1 = cookie.indexOf("&", start); //可能含有子cookie
                var end2 = cookie.indexOf(";", start);
                if (end1 != -1 && end1 < end2) {
                    return true;
                } else {
                    return false;
                }

            }
        }
    }
}
