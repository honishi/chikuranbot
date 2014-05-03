var width = 1000, height = 1300;
var clipLeft = 0, clipTop = 150, clipWidth = 880, clipHeight = 970;
var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36'
var wait = 2000;

var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length !== 3 ) {
    console.log('Usage: rasterize.js URL filename');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: width, height: height };
    page.clipRect = { left: clipLeft, top: clipTop, width: clipWidth, height: clipHeight };
    page.settings.userAgent = ua
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, wait);
        }
    });
}
