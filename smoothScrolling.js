// setting event listeners for smooth scrolling
topNavLinks = document.querySelectorAll(".navigation__links a");
topNavLinks.forEach(function (link) {
  link.addEventListener('click', smoothScroll);
});

// define breakpoint for mobile navigation to desktop navigation
const breakPoint = 798;
const desktopNavHeight = 69;
const mobileNavHeight = 49;

// function for smooth scrolling
function smoothScroll(event) {
  event.preventDefault();
  // when href = # --> scroll to the #home element
  const targetId = event.currentTarget.getAttribute("href") == "#" ? "#home" : event.currentTarget.getAttribute("href");

  // the targetPosition depends on the screen size because of my different topnavs
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;

  // calculate how many px will need to be scrolled less because of the navigation bar
  navigationHeight = screenWidth > breakPoint ? desktopNavHeight : mobileNavHeight;
  console.log("navigation height: " + navigationHeight);

  // if target is home --> don't count the navigation bar
  const targetPosition = targetId == "#home" ? document.querySelector(targetId).offsetTop : document.querySelector(targetId).offsetTop - navigationHeight;

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
    window.scrollTo(0, easeOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  // timing function
  function easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  };

  // put close navigation function here
  // for example: closeNav(mobileNavBtn);
}
