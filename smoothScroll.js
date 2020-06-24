const smoothScrollSettings = {
  navigationBreakpoint: 798,
  distanceFromTopDesktop: 20,
  distanceFromTopMobile: 95,
  animationDuration: 800,
};

// setting event listeners for smooth scrolling
smoothScrollLinks = document.querySelectorAll(".js-scroll");
smoothScrollLinks.forEach(function (smoothScrollLink) {
  smoothScrollLink.addEventListener("click", smoothScroll);
});

// function for smooth scrolling
function smoothScroll(event) {
  event.preventDefault();
  const targetQuerySelector = event.currentTarget.getAttribute("href");

  // the targetPosition in pixels depends on the screen width
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName("body")[0].clientWidth;

  // calculate how many px will need to be scrolled less because of the navigation bar
  navigationHeight = 0;
  if (screenWidth > smoothScrollSettings.navigationBreakpoint) {
    navigationHeight = smoothScrollSettings.distanceFromTopDesktop;
  } else {
    navigationHeight = smoothScrollSettings.distanceFromTopMobile;
  }

  // if targetQuerySelector = "#" --> scroll to top
  const targetPosition =
    targetQuerySelector == "#"
      ? 0
      : document.querySelector(targetQuerySelector).offsetTop -
        navigationHeight;

  const startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  const duration = 800;
  let start = null;

  // animation
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      timingFunction(
        progress,
        startPosition,
        distance,
        smoothScrollSettings.animationDuration
      )
    );
    if (progress < duration) {
      window.requestAnimationFrame(step);
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
