# smoothScroll.js

<br />

## Description

---

Smooth scrolling for links that refer to an element on the same page.

<br />

## How to use

---

To start using this script, first download the smoothScroll.js file or copy the code in your own file js file.

### Configuration

First, set the breakpoint in pixels for mobile navigation to desktop navigation.
Also set how many pixels you want to add to the top.
After that, you need to set the animation duration.

The integers added in `spaceFromTopWindow` are the amount of pixels added to the top of the screen.

```javascript
// define breakpoint for mobile navigation to desktop navigation
const breakPoint = 798;
const spaceFromTopWindow = {
  desktop: 20,
  mobile: 95,
};

smoothScrollSettings = {
  duration: 800,
};
```

### Start using
Then, add the `"js-scroll"` class and add the `href` attribute to a tag. For example:

```html
<a class="js-scroll" href="#heading">Heading</a>
```
It also works with classes in the href attribute.
```html
<a class="js-scroll" href=".heading">Heading</a>
```

### Timing function

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
