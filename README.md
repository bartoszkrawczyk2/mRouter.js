mRouter.js 
===================
Simple javascript routing library. Works with History.js or hashchange.

----
## Usage:
Create instance of MRouter and define routes:

```js
var router = new MRouter({
  '/posts/:id': function(id) {
    alert(this.path, id);
  }
});
```
## API
+ **.route(route)** - Apply function of current route. Example:
```js
$(window).on('hashchange', function() {
  router.route(window.location.hash);
});
```

+ **.notFound(callback)** - Calls callback when no matching route is found. Example:
```js
router.notFound(function() {
  alert('Route ' + this.path + ' not found!');
});
```

+ **.setPrefix(prefix)** - Sets base url for routes. Example:
```js
router.setPrefix('/app');
```

## Demo

http://projects.bartoszkrawczyk.com/mrouter/

## License

MIT License