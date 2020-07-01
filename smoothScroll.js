const smoothScrollSettings = {
  navigationBreakpoint: 798,
  distanceFromTopDesktop: 20,
  distanceFromTopMobile: 95,
  animationDuration: 800,
  changeUrl: false,
};

// setting event listeners for anchor tags with # in the href attribute
const smoothScrollLinks = document.querySelectorAll("a[href*='#']");
smoothScrollLinks.forEach(function (smoothScrollLink) {
  smoothScrollLink.addEventListener("click", smoothScroll);
});

// setting event listeners for elements with the js-scroll class
const smoothScrollElements = document.querySelectorAll(".js-scroll");
smoothScrollElements.forEach(function (smoothScrollElement) {
  smoothScrollElement.addEventListener("click", smoothScroll);
});

// function for smooth scrolling
function smoothScroll(event) {
  event.preventDefault();

  let targetQuerySelector;
  if (event.currentTarget.tagName == "A") {
    targetQuerySelector = event.currentTarget.getAttribute("href");
    if (smoothScrollSettings.changeUrl) {
      history.replaceState(undefined, undefined, targetQuerySelector);
    }
  } else if (
    (" " + event.currentTarget.className + " ").indexOf(".js-scroll" > -1) &&
    event.currentTarget.dataset.target
  ) {
    targetQuerySelector = event.currentTarget.dataset.target;
  } else {
    targetQuerySelector = "#";
    console.error(
      "ERROR: No valid element provided, make sure you are using data-target='targetQuerySelector' to set the target element."
    );
  }

  // the targetPosition depends on the screen width
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName("body")[0].clientWidth;

  // calculate how many px will need to be scrolled
  if (screenWidth > smoothScrollSettings.navigationBreakpoint) {
    distanceFromTop = smoothScrollSettings.distanceFromTopDesktop;
  } else {
    distanceFromTop = smoothScrollSettings.distanceFromTopMobile;
  }

  // if targetQuerySelector = "#" --> scroll to top
  const targetPosition =
    targetQuerySelector == "#"
      ? 0
      : document.querySelector(targetQuerySelector).offsetTop - distanceFromTop;

  const startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  const duration = smoothScrollSettings.animationDuration;
  let start = null;

  window.requestAnimationFrame(step);

  // abort scrolling when user scrolls
  let previousPosition = null;
  let abortAnimation = false;

  function step(timestamp) {
    if (!start) {
      start = timestamp;
      previousPosition = window.pageYOffset;
    }
    if (previousPosition && parseInt(previousPosition) != window.pageYOffset) {
      abortAnimation = true;
    }

    // if user didn't scroll
    if (!abortAnimation) {
      const progress = timestamp - start;
      const newPos = timingFunction(
        progress,
        startPosition,
        distance,
        smoothScrollSettings.animationDuration
      );
      window.scrollTo(0, newPos);
      if (progress < duration) {
        previousPosition = newPos;
        window.requestAnimationFrame(step);
      } else {
        previousPosition = null;
      }
    }
  }

  // timing function
  function timingFunction(t, b, c, d) {
    // easeOutCubic
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  }

  // put close navigation function here
  // e.g. toggleMobileNavigation();
}
