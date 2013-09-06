## Superscroll

A simple and lightweight JQuery plugin for scrolling using an element on click, between hashes on the same page, and even between hashes on different pages. Small and efficent, weighing in at just under 6kbs.

## Features

- Smooth scrolling using an element on click, between local hashes, and between hashes on different pages
- Fully customizable options and css let you integrate this plugin into any project with ease.
- Full control over what you want out of the plugin. Toggle any of the scrolling functions on or off.
- A main callback to run something after the plugin has finished scrolling to a target.
- An interupt feature which lets you cancel the scroll by clicking or using your mousewheel during a scroll. This will also cancel the callback if it is set.

## Setup

Is as easy as 1. 2. Done. 3 feels lonely :(

#### Step 1 (include)

Include the `jquery.superscroll.min.js` file and place one of the examples from usage below in the head of your document with it (make sure jQuery is included first, then JQuery UI if you want the bounce animation, then a usage example.).

#### Step 2 (style)

Style it however you want! Don't want to? Fine! Don't include any css and the plugin will create defaults for you! Although the recommended example css below would look better ;)

**Recommended css example**

This is the example that is used in the demo included in the download.

```
#scrollUp {
  width: 32px;
  height: 32px;
  position: fixed;
  bottom: 15px;
  right: 25px;
  display: none;
  background: url('img/up.png') no-repeat;
  cursor: pointer;
  z-index: 999;
}
```

## Usage

#### Minimum usage example 1

TThis example is the bare minimum, and will create the element for you so you don't have to put it in your html, and has all scroll features enabled.

```
$(document).ready(function() {
  $.superscroll();
});
```

#### Minimum usage example 2

This example will not create the element for you, so you need to put it in your html, and has all scroll features enabled.

```
$(document).ready(function() {
  $("#scrollup").superscroll();
});
```

Add the element to your html in whatever form suits your needs. Something like:

```
<div id="scrollup"></div>
```

#### Example usage with an option set

This example would only disable scrolling of hashes between two different pages, but keep local hash scrolling and scrollup enabled.

```
$(document).ready(function() {
  $("#scrollup").superscroll({
    scrollExternalHash: false
  });
});
```

#### Example usage with multiple options set

This example would enable console output of the plugin events for debugging, and remove hashes from being displayed in the url.

```
$(document).ready(function() {
  $("#scrollup").superscroll({
    showHashURL: false,
    debug: true
  });
});
```

## Options

You only have to use the options that are applicable to your needs, so modify or remove them as you see fit.

```
$(document).ready(function() {
  $("#scrollup").superscroll({
    scrollUp: true,
    scrollUpName: "scrollup",
    scrollHash: true,
    scrollLocalHash: true,
    scrollExternalHash: true,
    scrollPersistent: false,
    scrollSpeedUp: 1000,
    scrollAnimation: true,
    showHashURL: true,
    top: 0,
    fadeInHeight: 850,
    fadeInSpeed: 500,
    fadeOutSpeed: 250,
    debug: false,
    callback: function() {}
  });
});
```

#### Defaults Breakdown

- `scrollUp` - Toggle scrolling up by clicking the scrollup element on or off. If off, scrollup element won't be displayed, or created depending on usage.  
- `scrollUpName` - Scroll element ID name.  
- `scrollHash` - Toggle hash scrolling completely on or off  
- `scrollLocalHash` - Toggle same page hash scrolling on or off only  
- `scrollExternalHash` - Toggle different page hash scrolling on or off only  
- `scrollPersistent` - Scroll element always visible instead of fading based on scroll height  
- `scrollSpeedUp` - How fast plugin scrolls up to the top  
- `scrollAnimation` - Bounce on click of scroll element  
- `showHashURL` - Toggle hashes being displayed in url  
- `top` - Height at which the plugin considers the top of the page  
- `fadeInHeight` - Height at which the plugin fades in the scroll element  
- `fadeInSpeed` - How fast the scroll element fades in  
- `fadeOutSpeed` - How fast the scroll element fades out  
- `debug` - Turn console logging of plugin events on or off  
- `callback` - Main plugin callback that occurs after scroll has ended

#### Callback Breakdown

This option allows you to fire an event after the plugin has finished scrolling to a target. For example, when you click the scroll element, or a link to a specific hash and begin scrolling, the callback would be fired after you are finished scrolling, unless the user cancels the scroll by clicking, or using the mousewheel during the movement.  

The example below would print "Callback!" to the console on completion.

```
$(document).ready(function() {
  $("#scrollup").superscroll({
    callback: function() {
      console.log("Callback!");
    }
  });
});
```

## Notes

- If you have the bounce animation enabled (default) but your element isn't fixed position, then the bounce animation won't display as to not break static elements.  
- If user interupts a scroll by clicking, or using the mousewheel and a callback was set, it will be cancled.  
- If you don't create any css styles for the element, defaults will be used instead.  
- More as I think of them.
