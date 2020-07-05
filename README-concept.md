# Smooth Scrolling for Websites

Smooth scroll to elements on a website with javascript using `window.requestAnimationFrame` ([browser support](https://caniuse.com/#feat=requestanimationframe)).

## Installation
Download the [smoothScroll.js](https://raw.githubusercontent.com/wesselvanree/smooth-scrolling/master/dist/smoothScroll.js) file and add it to your project. After that, refer to the javaScript file in your html code.

```html
<script src="path/to/file/smoothScroll.js"></script>
```

## Getting started

`<a>` tags with the *href* attribute set to an *id* are automatically detected. When the user clicks on that link, the user will automatically scroll to the referenced element. To use smooth scrolling with other elements, add the `.js-scroll` class to the element and set the target with the `data-target` attribute. `data-target` can contain any querySelector. Here are some examples.
```html
<!-- automatically detected -->
<a href="#heading-1">Heading 1</a>

<!-- Other -->
<div class="js-scroll" data-target="#heading-1">
  <p></p>
</div>
<div class="js-scroll" data-target=".class-of-element">
  <p>Note that the url will only update when the target querySelector is an id</p>
</div>
```

### Preferences

Edit the smoothScrollSettings object at the top of the file to your own preferences.

```js
var smoothScrollSettings = {
  easing: "easeOutCubic",
  animationDuration: 600,
  changeUrl: true,
  navigationBreakpoint: 800,
  distanceFromTopDesktop: 0,
  distanceFromTopMobile: 0,
  // customFunction: closeMenu
};
```

`easing`: this is the easing function used in the animation, this function can be:
- linear
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint

`animationDuration`: the duration of the animation in milliseconds.

`changeUrl`: Controls whether the url should be updated when the target is an id. The value should be *true* or *false*.

`navigationBreakpoint`: When using navigations with different heights for mobile and desktop. This should be the amount of pixels where the navigation changes height.

`distanceFromTopDesktop`: Amount of pixels added between top of the screen and the target element on Desktop (width bigger than `navigationBreakpoint`).

`distanceFromTopMobile`: Amount of pixels added between top of the screen and the target element on mobile (width smaller than `navigationBreakpoint`).

`customFunction` *(optional)*: Add a custom function that will be executed after the animation.

## Built With

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- ## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us. -->

<!-- ## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
 -->

<!-- ## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details -->

<!-- ## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
 -->
