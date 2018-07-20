function request(opts, callback) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return
            if (xhr.status >= 200 && xhr.status < 400) {
                return callback(null, xhr.getResponseHeader("Content-Type") != null && xhr.getResponseHeader("Content-Type").indexOf("application/json") != -1 ? JSON.parse(xhr.responseText) : xhr.responseText, xhr)
            }
            var msg = xhr.responseText || "Error"
            callback(Error(msg), null, xhr)
        }
        xhr.open(opts.method || "GET", opts.url)
        for (var key in opts.headers) {
            xhr.setRequestHeader(key, opts.headers[key])
        }
        xhr.send(opts.data)
        return xhr
    }

var a = request('https://discordbots.org/api/weekend')
console.log(a);
