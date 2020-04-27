function getcookie(req, target = null) {
    let cookie = req.headers.cookie.split('; ');

    if(target){
        let cookieTitle = cookie.map(function (index) {
            return index.slice(index.indexOf('=') + 1);
        });
        console.log(cookieTitle, target);
        console.log(cookieTitle.indexOf(target) !== -1 ? cookieTitle[target] : null);
    }else{
        return cookie;
    }
}

module.exports = {
    getcookie
};
