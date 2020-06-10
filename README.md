# Smooth scrolling for webpages <!-- omit in toc -->

## Tabel of contents <!-- omit in toc -->
- [Description](#description)
- [How to use](#how-to-use)
  - [Configuration](#configuration)
  - [Start smooth scrolling](#start-smooth-scrolling)
  - [Changing timing function](#changing-timing-function)
  - [Closing mobile navigation menu](#closing-mobile-navigation-menu)

<br />

## Description

Smooth scrolling for links that refer to an element on the same page.

<br />

## How to use

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

Change `animationDuration` to scroll faster or slower.

### Start smooth scrolling
Add the `"js-scroll"` class and add the `href` attribute to a tag. For example:

```html
<a class="js-scroll" href="#heading">Heading</a>
```
It also works with classes in the href attribute.
```html
<a class="js-scroll" href=".heading">Heading</a>
```

### Changing timing function

You can change the timing function on line 74, the default function is easeOutCubic.

```javascript
function timingFunction(t, b, c, d) {
  t /= d;
  t--;
  return -c * (t * t * t * t - 1) + b;
}
```

### Closing mobile navigation menu
On line 81, you can put a function to close your navigation.

```javascript
// put close navigation function here
// for example: toggleMobileNavigation();
```
