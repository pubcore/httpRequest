export default (uri, data, method='POST') => {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest
        req.onreadystatechange = () => {
            if(req.readyState != 4){
                return;
            }

            if(req.status != 200){
                reject(new Error('HTTP Error:' + req.statusText), req.status)
            }else{
                var response = (typeof req.response == 'string') ?
                    JSON.parse(req.response)
                    : req.response || JSON.parse(req.responseText)
                resolve(response)
            }
        }

        req.open(method, uri, true)
        req.withCredentials = true
        req.setRequestHeader('Accept', 'application/json')
        req.setRequestHeader('Content-Type', 'application/json')
        req.responseType = 'json'
        req.send(JSON.stringify(data))
    })
}
