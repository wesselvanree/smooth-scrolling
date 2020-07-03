/*
Easing functions options are:
  - linear
  - easeInCubic
  - easeOutCubic
  - easeInOutCubic
*/
var smoothScrollSettings = {
  easingFunction: easeOutCubic,
  animationDuration: 600,
  changeUrl: true,
  navigationBreakpoint: 800,
  distanceFromTopDesktop: 0,
  distanceFromTopMobile: 0,
};

// function closeMenu() {
//   console.log("closing menu...");
// }

function setScrollEventListeners() {
  // setting event listeners for anchor tags with # in the href attribute
  var smoothScrollLinks = document.querySelectorAll("a[href*='#']");
  smoothScrollLinks.forEach(function (smoothScrollLink) {
    smoothScrollLink.addEventListener("click", smoothScroll);
  });
  // setting event listeners for elements with the js-scroll class
  var smoothScrollElements = document.querySelectorAll(".js-scroll");
  smoothScrollElements.forEach(function (smoothScrollElement) {
    smoothScrollElement.addEventListener("click", smoothScroll);
  });
}
setScrollEventListeners();

// function for smooth scrolling
function smoothScroll(event) {
  event.preventDefault();
  var currentTarget = event.currentTarget;

  // get the target query selector
  var targetQuerySelector = "#";
  if (currentTarget.tagName == "A") {
    targetQuerySelector = currentTarget.getAttribute("href");
    if (smoothScrollSettings.changeUrl) {
      history.replaceState(null, "", targetQuerySelector);
    }
  } else if (
    currentTarget.classList.contains("js-scroll") &&
    currentTarget.dataset.target
  ) {
    targetQuerySelector = currentTarget.dataset.target;
  } else {
    console.error(
      "ERROR: No valid element provided, make sure you are using data-target='targetQuerySelector' to set the target element."
    );
  }

  // update url if target is an id
  if (smoothScrollSettings.changeUrl && targetQuerySelector === "#") {
    history.replaceState(null, "", " ");
  } else if (
    smoothScrollSettings.changeUrl &&
    typeof targetQuerySelector === "string" &&
    targetQuerySelector[0] === "#"
  ) {
    history.replaceState(null, "", targetQuerySelector);
  }

  // the targetPosition depends on the screen width
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName("body")[0].clientWidth;

  // calculate how many px will need to be scrolled
  var distanceFromTop;
  if (screenWidth > smoothScrollSettings.navigationBreakpoint) {
    distanceFromTop = smoothScrollSettings.distanceFromTopDesktop;
  } else {
    distanceFromTop = smoothScrollSettings.distanceFromTopMobile;
  }

  // if targetQuerySelector = "#" --> scroll to top
  var targetElement;
  var targetPosition;
  if (targetQuerySelector === "#") {
    targetPosition = 0;
  } else {
    targetElement = document.querySelector(targetQuerySelector);
    targetPosition = targetElement.offsetTop - distanceFromTop;
  }

  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var duration = smoothScrollSettings.animationDuration;
  var start = null;

  window.requestAnimationFrame(step);

  // abort scrolling when user scrolls
  var previousPosition = null;
  var abortAnimation = false;
  function step(timestamp) {
    if (!start) {
      start = timestamp;
      previousPosition = window.pageYOffset;
    }

    // check if user scrolled
    if (
      previousPosition &&
      parseInt(previousPosition.toString()) != window.pageYOffset
    ) {
      abortAnimation = true;
    }

    // if user didn't scroll
    if (!abortAnimation) {
      // calculating next position
      var progress = timestamp - start;
      var t = progress / smoothScrollSettings.animationDuration;
      var newPos =
        startPosition + distance * smoothScrollSettings.easingFunction(t);
      // scrolling and checking if animation should end
      window.scrollTo(0, newPos);
      if (progress < duration) {
        previousPosition = newPos;
        window.requestAnimationFrame(step);
      } else {
        previousPosition = null;
      }
    }
  }

  // if function to close menu is provided
  if (smoothScrollSettings.closeMenu) {
    smoothScrollSettings.closeMenu();
  }
}

function linear(t) {
  return t;
}

function easeInCubic(t) {
  return t * t * t;
}

function easeOutCubic(t) {
  return --t * t * t + 1;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
