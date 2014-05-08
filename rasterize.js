var width = 1000, height = 1300;
var clipLeft = 0, clipTop = 180, clipWidth = 760, clipHeight = 800;
var wait = 2000;

var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length !== 4 ) {
    console.log('Usage: rasterize.js useragent URL filename');
    phantom.exit(1);
}
else {
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
        }
        else {
            window.setTimeout(function () {
                console.log('rasterizing...');

                /* for console log in page.evaluate(). */
                page.onConsoleMessage = function (message){
                    console.log(message);
                };

                page.evaluate(function(){
                    function removeElementsByClassName(className) {
                        console.log('removing elements by class name: ' + className);
                        var elements = document.getElementsByClassName(className);
                        for (var i=0; i<elements.length; i++) {
                            elements[i].parentNode.removeChild(elements[i]);
                            console.log('removed.');
                        }
                    }

                    function removeElementById(idName) {
                        console.log('removing element by id name: ' + idName);
                        var element = document.getElementById(idName);
                        if (element) {
                            element.parentNode.removeChild(element);
                            console.log('removed.');
                        }
                    }

                    removeElementsByClassName('geenee');
                    removeElementById('ninja_iframe_1');
		});

                page.render(output);
                phantom.exit();
            }, wait);
        }
    });
}
