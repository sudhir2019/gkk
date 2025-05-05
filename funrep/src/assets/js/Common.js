var newMessage = "Disabled!";
document.oncontextmenu = new Function("alert(newMessage);return false");

function CheckBrowser() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0) // If Internet Explorer, return version number
    {
        return true;
    }
    else  // If another browser, return 0
    {
        var isAtLeastIE11 = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/));
        if (isAtLeastIE11) {
            return true;
        }
        else {
            alert('Use Microsoft Internet Explorer to Play Game');
            return false;
        }
    }
}