define(['jquery', 'handlebars', 'history', 'mrouter'], function ($, Handlebars, History, MRouter) {
    var app            = {},
        templatesCache = {},
        $appView       = $('#appView'),
        postsCache,
        router,
        state;




    function getPosts (callback) {
        if (!!postsCache && typeof postsCache === 'object') {
            callback.call(undefined, postsCache);
        } else {
            $.get('/posts.json', function(res) {
                postsCache = res;
                callback.call(undefined, postsCache);
            });
        }
    };

    function renderView (path, data) {
        if (typeof templatesCache[path] !== 'undefined' && typeof templatesCache[path] === 'function') {
            $appView.html(templatesCache[path](data));
        } else {
            $.get(path, function(tpl) {
                templatesCache[path] = Handlebars.compile(tpl);
                $appView.html(templatesCache[path](data));
            });
        }
    };





    app.init = function () {
        var router = new MRouter({
            '/': function() {
                renderView('/templates/home.html');
            },
            '/posts': function() {
                getPosts(function(posts) {
                    renderView('/templates/posts.html', posts);
                });
            },
            '/posts/:id': function(id) {
                var path = this.path;

                getPosts(function(p) {
                    renderView('/templates/post.html', {
                        post : p.posts[id],
                        path : path
                    });
                });
            }
        });


        History.Adapter.bind(window, 'statechange', function() {
            state = History.getState().url.replace(window.location.origin, '');
            router.route(state);
        });

        $(document).on('click', 'a:not(.link)', function(e) {
            e.preventDefault();
            History.pushState(null, $(this).text(), $(this).attr('href'));
        });


        router.route(History.getState().url.replace(window.location.origin, ''));
    };

    return app;
});