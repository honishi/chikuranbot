var width = 1000, height = 1300;
var clipLeft = 0, clipTop = 150, clipWidth = 880, clipHeight = 970;
var wait = 2000;

var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length !== 4 ) {
    console.log('Usage: rasterize.js useragent URL filename');
    phantom.exit(1);
} else {
    ua = system.args[1];
    address = system.args[2];
    output = system.args[3];
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
