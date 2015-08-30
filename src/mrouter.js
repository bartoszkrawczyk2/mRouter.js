/*!
 MRouter.js 0.0.3
 (c) 2015 Bartosz Krawczyk
 bartoszkrawczyk.com
 MIT License
*/

!function (name, definition) {
    if (typeof define == 'function' && define.amd) define([], definition)
    else this[name] = definition()
}('MRouter', function () {

    var MRouter = function (routesObj) {
        var routes    = [],
            self      = this,
            prefix    = '',
            prefixSet = false;

        var notFoundCallback = function(route) {
            console.error('route '+route+' not found');
        };

        var createRegex = function (route) {
            var matchParam, routeRegex;

            matchParam = route.match(/\:([a-zA-Z0-9_-]+)/g);
            
            if (matchParam) {
                routeRegex = route;
                for (var i = 0, len = matchParam.length; i < len; i++) {
                    routeRegex = routeRegex.replace(matchParam[i], '([[a-zA-Z0-9_-]+)');
                }
                return new RegExp(routeRegex+'$');
            } else {
                return false;
            }
        };

        var setRoutes = function (obj) {
            if (typeof obj === 'object') {
                var route;

                for (route in obj) {
                    routes.push({
                        route    : route,
                        reg      : createRegex(route),
                        callback : obj[route]
                    });
                }
            }
        };


        this.route = function(route) {
            if (typeof route === 'string') {
                var found    = false,
                    params   = [],
                    callback = notFoundCallback,
                    regexMatch;

                if (prefixSet) route = route.replace(prefix, '');

                self.path = route;

                // check for routes without parameters
                for (var i = 0, len = routes.length; i < len; i++) {
                    if (!routes[i].reg && route == routes[i].route) {
                        callback = routes[i].callback;
                        found    = true;
                    }
                }

                // check for routes with parameters
                for (var i = 0, len = routes.length; i < len; i++) {
                    regexMatch = false;
                    if (routes[i].reg) {
                        regexMatch = route.match(routes[i].reg);

                        if (regexMatch) {
                            params   = regexMatch.splice(1, regexMatch.length-1);
                            found    = true;
                            callback = routes[i].callback;
                        }
                    }
                }

                if (typeof callback === 'function') {
                    if (!found) params.push(route);
                    callback.apply(self, params);
                }
            }
        };

        this.notFound = function(callback) {
            if (typeof callback === 'function') {
                notFoundCallback = callback;
            };
        };

        this.setPrefix = function(pre) {
            if (!!pre && typeof pre === 'string') {
                prefix = pre;
                prefixSet = true;
            }
        };


        if (typeof routesObj === 'object') {
            setRoutes(routesObj);
        } else {
            throw new TypeError('Invalid parameters');
        }
    };
    
    return MRouter;
});