## Superscroll

A simple and lightweight JQuery plugin for scrolling using an element on click, between hashes on the same page, and even between hashes on different pages. Scrolling is smooth and adjustable, and has an interupt feature which lets you cancel the scroll by clicking or using your mousewheel during a scroll. This will also cancel a callback if set.

## How To Use

Simply include the `jquery.superscroll.min.js` file and place one of the following examples below in the head of your document (make sure jQuery is included, and JQuery UI if you want the bounce animation).

### Minimum usage (scrollup & hash scrolling)

```
$(document).ready(function() {
  $("#scrollup").superscroll();
});
```

### Minimum usage (hash scrolling only)

```
$(document).ready(function() {
  $.superscroll();
});
```

### Example with defaults

You only have to use the options that are applicable to your needs, so modify or remove them as you see fit.

```
$(document).ready(function() {
  $("#scrollup").superscroll({
    append: false,
    scrollName: "scrollup",
    scrollHash: true,
    scrollLocalHash: true,
    scrollExternalHash: true,
    scrollPersistent: false,
    scrollSpeedUp: 1000,
    scrollAnimation: true,
    showHashURL: false,
    top: 0,
    fadeInHeight: 850,
    fadeInSpeed: 500,
    fadeOutSpeed: 250,
    debug: false,
    callback: function() {}
  });
});
```

**Defaults Breakdown**

`append` - Scroll element created dynamically instead of grabbing from html. Useful in some situations.  
`scrollName` - Scroll element ID. Only applicable if `append` is `true`  
`scrollHash` - Toggle hash scrolling completely on or off  
`scrollLocalHash` - Toggle same page hash scrolling on or off only  
`scrollExternalHash` - Toggle different page hash scrolling on or off only  
`scrollPersistent` - Scroll element always visible instead of fading based on scroll height  
`scrollSpeedUp` - How fast plugin scrolls up to the top  
`scrollAnimation` - Bounce on click of scroll element  
`showHashURL` - Toggle hashes being displayed in url  
`top` - Height at which the plugin considers the top of the page  
`fadeInHeight` - Height at which the plugin fades in the scroll element  
`fadeInSpeed` - How fast the scroll element fades in  
`fadeOutSpeed` - How fast the scroll element fades out  
`debug` - Turn console logging of plugin events on or off  
`callback` - Main plugin callback that occurs after scroll has ended

### Callback

Allows you to fire an event after the plugin has finished scrolling to a target. For example, when you click the scroll element, or a link to a specific hash and begin scrolling, the callback would be fired after you are finished scrolling, unless the user cancels the scroll by clicking, or using the mousewheel during the movement.  

The example below would print `Callback!` to the console on completion.

```
$(document).ready(function() {
  $("#scrollup").superscroll({
    callback: function() {
      console.log("Callback!");
    }
  });
});
```

## Noteworthy Mentions

- If you have the bounce animation enabled (default) but your element isn't fixed position, then the bounce animation won't display as to not break static elements.  
- More as I think of them.