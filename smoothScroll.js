// setting event listeners for smooth scrolling
smoothScrollLinks = document.querySelectorAll(".scroll");
smoothScrollLinks.forEach(function (smoothScrollLink) {
  smoothScrollLink.addEventListener("click", smoothScroll);
});

// define breakpoint for mobile navigation to desktop navigation
const breakPoint = 798;
const spaceFromTopWindow = {
  desktop: 20,
  mobile: 95,
};

smoothScrollSettings = {
  duration: 800,
};

// function for smooth scrolling
function smoothScroll(event) {
  event.preventDefault();
  const targetQuerySelector = event.currentTarget.getAttribute("href");

  // the targetPosition depends on the screen size because of my different topnavs
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName("body")[0].clientWidth;

  // calculate how many px will need to be scrolled less because of the navigation bar
  navigationHeight = 0;
  if (screenWidth > breakPoint) {
    navigationHeight = spaceFromTopWindow["desktop"];
  } else {
    navigationHeight = spaceFromTopWindow["mobile"];
  }
  console.log("navigation height: " + navigationHeight);

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

  console.log("from: " + window.pageYOffset + ", to: " + targetPosition);
  console.log("duration: " + duration);

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
        smoothScrollSettings["duration"]
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
  // for example: toggleMobileNavigation();
}
