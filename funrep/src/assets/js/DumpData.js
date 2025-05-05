$(function () {
    function copyToClipboard() {
        // Create a "hidden" input
        var aux = document.createElement("input");
        // Assign it the value of the specified element
        aux.setAttribute("value", "Print Screen Lol.");
        // Append it to the body
        document.body.appendChild(aux);
        // Highlight its content
        aux.select();
        // Copy the highlighted text
        document.execCommand("copy");
        // Remove it from the body
        document.body.removeChild(aux);
    }

    $(window).keyup(function (e) {
        if (e.keyCode == 44) {
            copyToClipboard();
        }
    });
});