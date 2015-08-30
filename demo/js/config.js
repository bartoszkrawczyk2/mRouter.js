var regs = requirejs.config({
    waitSeconds: 0,
    enforceDefine: false,
    baseUrl: '/js',
    paths: {
        'jquery'     : 'libs/jquery',
        'handlebars' : 'libs/handlebars',
        'history'    : 'libs/history',
        'mrouter'    : 'mrouter.min'
    },
    shim: {
        'history' : {
            exports: 'History'
        }
    }
});

regs(['app'], function (app) {
    'use strict';
    app.init();
});