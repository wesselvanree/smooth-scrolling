# Smooth scrolling for webpages <!-- omit in toc -->

### Table of Contents <!-- omit in toc -->

- [Description](#description)
- [How To Use](#how-to-use)
  - [Configuration](#configuration)
  - [Start Smooth Scrolling](#start-smooth-scrolling)
  - [Change Timing Function](#change-timing-function)
  - [Closing Mobile Navigation Menu](#closing-mobile-navigation-menu)

<br />

## Description

Smooth scrolling for links that refer to an element on the same page using `window.requestAnimationFrame`. You can add extra space between the top of the window and the target element. You can add one of two different values on from the top of the window depending on the given breakpoint.

<br />

## How To Use

To start using this script, first download the [smoothScroll.js](https://raw.githubusercontent.com/wesselvanree/smooth-scrolling/master/smoothScroll.js) file or copy the code in your own file js file.

### Configuration

You can change the settings on line 1:

```js
const smoothScrollSettings = {
  navigationBreakpoint: 798,
  distanceFromTopDesktop: 20,
  distanceFromTopMobile: 95,
  animationDuration: 800,
};
```

`navigationBreakPoint` is the amount of pixels where the height of the navigation changes.

`distanceFromTopDesktop` and `distanceFromTopMobile` are the amount of pixels added between the target element and the top of the window.

Change `animationDuration` to animate faster or slower.

### Start Smooth Scrolling

Add the `"js-scroll"` class to an element, also add the `href` attribute and set the target element. For example:

```html
<a class="js-scroll" href="#heading">Heading</a>
```

It also works with classes in the href attribute.

```html
<a class="js-scroll" href=".heading">Heading</a>
```

### Change Timing Function

You can change the timing function on line 66, the default function is easeOutCubic.

```javascript
function timingFunction(t, b, c, d) {
  t /= d;
  t--;
  return -c * (t * t * t * t - 1) + b;
}
```

### Closing Mobile Navigation Menu

On line 73, you can put a function to close your navigation.
