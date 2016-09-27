var page = require("webpage").create();
setTimeout(function () {
    page.open("http://service-a", function (status) {
        if (status !== "success") {
            console.log("Status:" + status);
            phantom.exit(1);
        }
        console.log("TESTS PASSED");
        phantom.exit();
    });
}, 2000);
