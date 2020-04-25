# smooth-scrolling

Smooth scrolling for webpages with javascript.
To start using this script, add this script at the end of the body tag.

First, set the breakpoint in pixels for mobile navigation to desktop navigation.
Also set how many pixels you want to add to the top.
After that, you need to set the animation duration.

Make sure to define at how many pixels your navigation flips on line 8 and the height of your different navigations. The height of the navigation is used for calculating the amount of pixels that need to be scrolled.

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

Then, add the "scroll" class and add the href attribute to a tag. For example:

```html
<a class="scroll" href="#heading">Heading</a>
```

You can change the timing function on line 74, the default function is easeOutCubic.

```javascript
function timingFunction(t, b, c, d) {
  t /= d;
  t--;
  return -c * (t * t * t * t - 1) + b;
}
```

On line 81, you can put a function to close your navigation.
For example a mobile dropdown navigation.

```javascript
// put close navigation function here
// for example: toggleMobileNavigation();
```
