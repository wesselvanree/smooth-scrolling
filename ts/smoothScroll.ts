interface Easings {
  linear(t: number): number;
  easeInCubic(t: number): number;
  easeOutCubic(t: number): number;
  easeInOutCubic(t: number): number;
  easeInQuad(t: number): number;
  easeOutQuad(t: number): number;
  easeInOutQuad(t: number): number;
  easeInQuart(t: number): number;
  easeOutQuart(t: number): number;
  easeInOutQuart(t: number): number;
  easeInQuint(t: number): number;
  easeOutQuint(t: number): number;
  easeInOutQuint(t: number): number;
}

interface Settings {
  easing: keyof Easings;
  animationDuration: number;
  changeUrl: boolean;
  navigationBreakpoint: number;
  distanceFromTopDesktop: number;
  distanceFromTopMobile: number;
  customFunction?(): void;
}

/*
Easing functions:
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
*/
const smoothScrollSettings: Settings = {
  easing: "easeOutCubic",
  animationDuration: 600,
  changeUrl: true,
  navigationBreakpoint: 800,
  distanceFromTopDesktop: 0,
  distanceFromTopMobile: 0,
  // customFunction: closeMenu,
};

// function closeMenu() {
//   console.log("closing menu...");
// }

// easing functions
const easings: Easings = {
  linear: (t: number): number => t,
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => --t * t * t + 1,
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number): number => t * t * t * t,
  easeOutQuart: (t: number): number => 1 - --t * t * t * t,
  easeInOutQuart: (t: number): number =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInQuint: (t: number): number => t * t * t * t * t,
  easeOutQuint: (t: number): number => 1 + --t * t * t * t * t,
  easeInOutQuint: (t: number): number =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};

function setScrollEventListeners(): void {
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
}

setScrollEventListeners();

// function for smooth scrolling
function smoothScroll(event: MouseEvent) {
  event.preventDefault();
  const currentTarget: HTMLElement = event.currentTarget as HTMLElement;

  // get the target query selector
  let targetQuerySelector: string | null = "#";
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

  // setting easingfunction
  const easing = easings[smoothScrollSettings.easing];

  window.requestAnimationFrame(step);

  // abort scrolling when user scrolls
  let previousPosition: number | null = null;
  let abortAnimation = false;

  function step(timestamp: number) {
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
      const progress = timestamp - start;
      const t = progress / smoothScrollSettings.animationDuration;
      const newPos = startPosition + distance * easing(t);

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

  // if cusotm function is provided
  if (smoothScrollSettings.customFunction) {
    smoothScrollSettings.customFunction();
  }
}
