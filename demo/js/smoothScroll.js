const smoothScrollSettings = {
  easingFunction: easeOutCubic,
  animationDuration: 600,
  changeUrl: false,
  navigationBreakpoint: 798,
  distanceFromTopDesktop: 20,
  distanceFromTopMobile: 95,
  // closeMenu: closeMenu,
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
  let distanceFromTop;
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
      // calculating next position
      const progress = timestamp - start;
      const t = progress / smoothScrollSettings.animationDuration;
      const newPos =
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

  if (smoothScrollSettings.closeMenu) {
    smoothScrollSettings.closeMenu();
  }
}

function linear(t) {
  return t;
}

function easeOutCubic(t) {
  return --t * t * t + 1;
}

function easeInCubic(t) {
  return t * t * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// function closeMenu() {
//   console.log("closing menu...");
// }
