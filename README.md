# jQuery.masonryAutoFill

A jQuery plugin for [Masonry](http://masonry.desandro.com/).

Plugin enables Masonry to fill-up empty space at the end of the row if amount of items is uneven.

Please see the demo on [JSFiddle](http://jsfiddle.net/7gzrg8wf/).

#### Install with bower:

```sh
$ bower install jquery-masonry-autofill
```

### Usage
Include after jQuery.

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="masonry.js" type="text/javascript"></script>
<script src="jquery-masonry-autofill.js" type="text/javascript"></script>
```

Call the plugin on onDocumentReady in your JavaScript.

```javascript
$(function() {
    // 'itemSelector' property is required.
    $('.grid').masonry({itemSelector: '.item'}).masonryAutoFill({
        // String to use for filler elements as HTML template.
        fillerHtml: '<div></div>',

        // Optional class name for a filler element.
        fillerClassName : 'filler'
    });
});
```

### Licence
The jQuery.masonryAutoFill plugin is licensed under the MIT license:
http://en.wikipedia.org/wiki/MIT_License
