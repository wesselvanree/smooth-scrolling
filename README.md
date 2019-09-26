# smooth-scrolling
Smooth scrolling for webpages with javascript.

Make sure to define at how many pixels your navigation flips on line 8 and the height of your different navigations. The height of the navigation is used for calculating the amount of pixels that need to be scrolled.
```javascript
const breakPoint = 798;
const desktopNavHeight = 69;
const mobileNavHeight = 49;
```

You can change the timing function on line 49, default is ease-out-cubic.
```javascript
function easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
 };
```

On line 55 you can put a function to close your navigation when a link in the mobile navigation is clicked.
```javascript
// put close navigation function here
// for example: closeNav(mobileNavBtn);
```
