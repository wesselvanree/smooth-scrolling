# Smooth Scrolling for Websites <!-- omit in toc -->

[Demo](https://wesselvanree.github.io/smooth-scrolling/)

Smooth scroll to elements on a website with javascript using `window.requestAnimationFrame` ([browser support](https://caniuse.com/#feat=requestanimationframe)).


- [Features](#features)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Preferences](#preferences)
- [Example](#example)
- [Built With](#built-with)

## Features
- **Add space** between target elements and top of the screen.
- Set **different amounts of this space** for your mobile and desktop navigation.
- **Run custom function** after scrolling (e.g. close menu function)
- Disable or enable adding the **target id** to the url
- Multiple **easing functions** to choose from
- Set **scroll duration**.
- Scroll animation aborts if user scrolls during the animation.

## Installation

Download the [smoothScroll.js](https://raw.githubusercontent.com/wesselvanree/smooth-scrolling/master/dist/smoothScroll.js) file and add it to your page above the closing body tag.

```html
<script src="path/to/file/smoothScroll.js"></script>
```

## Getting started

To start using this code, create a new instance of the `SmoothScroll` class.

```js
const smoothScroll = new SmoothScroll();
```

`<a>` tags with the _href_ attribute set to an _id_ are automatically detected. When the user clicks on that link, the user will automatically scroll to the referenced element. To use smooth scrolling with other elements, add the `.js-scroll` class to the element and set the target with the `data-target` attribute. `data-target` can contain any querySelector. Here are some examples.

```html
<!-- automatically detected -->
<a href="#heading-1">Heading 1</a>

<!-- Other -->
<div class="js-scroll" data-target="#heading-1">
  <p></p>
</div>
<div class="js-scroll" data-target=".class-of-element">
  <p>
    Note that the url will only update when the target querySelector is an id
  </p>
</div>
```

## Preferences

You can pass a settings object when you initialize the new instance of the class. For example:

```js
const settings = {
  easing: "easeOutQuint",
  animationDuration: 600,
  changeUrl: true,
  navigationBreakpoint: 800,
  distanceFromTopDesktop: 60,
  distanceFromTopMobile: 50,
  customFunction: closeMenu,
};

const smoothScroll = new SmoothScroll(settings);
```

The following settings can be chosen, these are all optional so you don't have to set them all. If there is a default value, this value will be used when there is no other value given.

- `easing`

  - Default: `"easeOutQuint"`
  - Description: This is the easing function used in the animation. Take a look at [easings.net](https://easings.net/) to see how each function works.
  - Options:
    - `"linear"`
    - `"easeInCubic"`
    - `"easeOutCubic"`
    - `"easeInOutCubic"`
    - `"easeInQuad"`
    - `"easeOutQuad"`
    - `"easeInOutQuad"`
    - `"easeInQuart"`
    - `"easeOutQuart"`
    - `"easeInOutQuart"`
    - `"easeInQuint"`
    - `"easeOutQuint"`
    - `"easeInOutQuint"`
    <br>

- `animationDuration`

  - Default: `600`
  - Description: the duration of the animation in milliseconds.
    <br>

- `changeUrl`

  - Default: `true`
  - Description: Controls whether the url should be updated when the target is an id. The value should be _true_ or _false_.
    <br>

- `navigationBreakpoint`

  - Default: `0`
  - Description: When using navigations with different heights for mobile and desktop. This should be the amount of pixels where the navigation changes height.
    <br>

- `distanceFromTopDesktop`

  - Default: `0`
  - Description: Amount of pixels added between top of the screen and the target element on Desktop (width bigger than `navigationBreakpoint`).
    <br>

- `distanceFromTopMobile`

  - Default: `0`
  - Description: Amount of pixels added between top of the screen and the target element on mobile (width smaller than `navigationBreakpoint`).
    <br>

- `customFunction`
  - Description: Add a custom function that will be executed after the animation.

## Example

_index.html_

```html
<script src="path/to/file/smoothScroll.js"></script>
<script src="path/to/file/app.js"></script>
```

_app.js_:

```js
function closeMenu() {
  document.querySelector(".menu").classList.remove("active");
}

const settings = {
  changeUrl: false,
  navigationBreakpoint: 800,
  distanceFromTopDesktop: 70,
  distanceFromTopMobile: 50,
  customFunction: closeMenu,
};

const smoothScroll = new SmoothScroll(settings);
```

When creating a SmoothScroll instance, your website instantly starts smooth scrolling.

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
