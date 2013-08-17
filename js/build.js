({
    baseUrl: ".",
    name: "main",
    out: "main-built.js",
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/require/text',
		echo: 'libs/jquery/plugins/jqConsola'
    },
    shim: {
        underscore: {
          exports: '_'
        },
        backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        }
    }
})