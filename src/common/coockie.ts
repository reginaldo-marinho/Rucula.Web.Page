export let cookie =  (()=> {

    return {
        read: function (name:string) {

            var cookies = document.cookie.split('; ');
            
            for (var i = 0; i < cookies.length; i++) {

                var cookie = cookies[i].split('=');
                
                if (cookie[0] === name) {
                    return decodeURIComponent(cookie[1]);
                }
            }            
            return null;
        }
    }
})()