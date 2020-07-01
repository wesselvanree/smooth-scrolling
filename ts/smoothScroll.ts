interface Settings {
  easingFunction(t: number): number;
  animationDuration: number;
  changeUrl: boolean;
  navigationBreakpoint: number;
  distanceFromTopDesktop: number;
  distanceFromTopMobile: number;
  closeMenu?(): void;
}

const smoothScrollSettings: Settings = {
  easingFunction: easeOutCubic,
  animationDuration: 600,
  changeUrl: true,
  navigationBreakpoint: 800,
  distanceFromTopDesktop: 0,
  distanceFromTopMobile: 0,
  /* closeMenu: closeMenu, */
};
// function closeMenu() {
//   console.log("closing menu...");
// }

// setting event listeners for anchor tags with # in the href attribute
const smoothScrollLinks: NodeListOf<HTMLElement> = document.querySelectorAll(
  "a[href*='#']"
);
smoothScrollLinks.forEach(function (smoothScrollLink) {
  smoothScrollLink.addEventListener("click", smoothScroll);
});

// setting event listeners for elements with the js-scroll class
const smoothScrollElements: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".js-scroll"
);
smoothScrollElements.forEach(function (smoothScrollElement) {
  smoothScrollElement.addEventListener("click", smoothScroll);
});

// function for smooth scrolling
function smoothScroll(event: MouseEvent) {
  event.preventDefault();
  const currentTarget: HTMLElement = event.currentTarget as HTMLElement;

  let targetQuerySelector;
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
    targetQuerySelector = "#";
    console.error(
      "ERROR: No valid element provided, make sure you are using data-target='targetQuerySelector' to set the target element."
    );
  }

  if (targetQuerySelector === "#") {
    history.replaceState(null, "", " ");
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
  let targetElement: HTMLElement;

  let targetPosition: number;

  if (targetQuerySelector === "#") {
    targetPosition = 0;
  } else {
    targetElement = document.querySelector(targetQuerySelector!) as HTMLElement;
    targetPosition = targetElement.offsetTop - distanceFromTop;
  }

  const startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  const duration = smoothScrollSettings.animationDuration;
  let start: number | null = null;

  window.requestAnimationFrame(step);

  // abort scrolling when user scrolls
  let previousPosition: number | null = null;
  let abortAnimation = false;

  function step(timestamp: number) {
    if (!start) {
      start = timestamp;
      previousPosition = window.pageYOffset;
    }
    if (
      previousPosition &&
      parseInt(previousPosition.toString()) != window.pageYOffset
    ) {
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

function linear(t: number): number {
  return t;
}

function easeInCubic(t: number): number {
  return t * t * t;
}

function easeOutCubic(t: number): number {
  return --t * t * t + 1;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
