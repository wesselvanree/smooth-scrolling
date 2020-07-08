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

interface Setting {
  timingFunction(t: number): number;
  animationDuration: number;
  changeUrl: boolean;
  navigationBreakpoint: number;
  distanceFromTopDesktop: number;
  distanceFromTopMobile: number;
  customFunction?: Function;
}

interface SmoothScrollSettings {
  easing?: keyof Easings;
  animationDuration?: number;
  changeUrl?: boolean;
  navigationBreakpoint?: number;
  distanceFromTopDesktop?: number;
  distanceFromTopMobile?: number;
  customFunction?: Function;
}

class SmoothScroll {
  isMobileDevice: boolean = false;
  easings: Easings = {
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
  settings: Setting = {
    timingFunction: this.easings.easeOutQuint,
    animationDuration: 600,
    changeUrl: true,
    navigationBreakpoint: 800,
    distanceFromTopDesktop: 0,
    distanceFromTopMobile: 0,
    // customFunction: closeMenu,
  };
  currentEvent: null | MouseEvent = null;

  constructor(smoothScrollSettings?: SmoothScrollSettings) {
    this.checkForMobileDevice();
    this.setEventListeners();
    if (smoothScrollSettings) {
      if (smoothScrollSettings.easing) {
        this.settings.timingFunction = this.easings[
          smoothScrollSettings.easing
        ];
      }
      if (smoothScrollSettings.animationDuration) {
        this.settings.animationDuration =
          smoothScrollSettings.animationDuration;
      }
      if (smoothScrollSettings.changeUrl) {
        this.settings.changeUrl = smoothScrollSettings.changeUrl;
      }
      if (smoothScrollSettings.navigationBreakpoint) {
        this.settings.navigationBreakpoint =
          smoothScrollSettings.navigationBreakpoint;
      }
      if (smoothScrollSettings.distanceFromTopDesktop) {
        this.settings.distanceFromTopDesktop =
          smoothScrollSettings.distanceFromTopDesktop;
      }
      if (smoothScrollSettings.distanceFromTopMobile) {
        this.settings.distanceFromTopMobile =
          smoothScrollSettings.distanceFromTopMobile;
      }
      if (smoothScrollSettings.customFunction) {
        this.settings.customFunction = smoothScrollSettings.customFunction;
      }
    }
  }

  eventHandler() {
    if (this.currentEvent != null) {
      if (this.isMobileDevice) {
        this.scrollMobile(this.currentEvent);
      } else {
        this.scroll(this.currentEvent);
      }
    }
  }

  checkForMobileDevice(): void {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobileDevice = true;
    }
  }

  setEventListeners(): void {
    const self = this;
    // setting event listeners for anchor tags with # in the href attribute
    const smoothScrollElements: NodeListOf<HTMLElement> = document.querySelectorAll(
      "a[href*='#'], .js-scroll"
    );
    smoothScrollElements.forEach(function (smoothScrollElement) {
      smoothScrollElement.addEventListener("click", (event) => {
        self.currentEvent = event;
        self.eventHandler();
      });
    });
  }

  scroll(event: MouseEvent) {
    event.preventDefault();
    const currentTarget: HTMLElement = event.currentTarget as HTMLElement;
    const self = this;

    // get the target query selector
    let targetQuerySelector: string | null = "#";
    if (currentTarget.tagName == "A") {
      targetQuerySelector = currentTarget.getAttribute("href");
      if (self.settings.changeUrl) {
        window.history.replaceState(null, "", targetQuerySelector);
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

    // the targetPosition depends on the screen width
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName("body")[0].clientWidth;

    // calculate how many px will need to be scrolled
    let distanceFromTop;
    if (screenWidth > self.settings.navigationBreakpoint) {
      distanceFromTop = self.settings.distanceFromTopDesktop;
    } else {
      distanceFromTop = self.settings.distanceFromTopMobile;
    }

    // if targetQuerySelector = "#" --> scroll to top
    let targetElement: HTMLElement;
    let targetPosition: number;

    if (targetQuerySelector === "#") {
      targetPosition = 0;
    } else {
      targetElement = document.querySelector(
        targetQuerySelector!
      ) as HTMLElement;
      targetPosition = targetElement.offsetTop - distanceFromTop;
    }

    const startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    const duration = self.settings.animationDuration;
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

      // check if user scrolled
      if (
        previousPosition &&
        parseInt(previousPosition.toString()) != window.pageYOffset
      ) {
        abortAnimation = true;
      }

      // if user didn't scroll or is mobile device
      if (!abortAnimation) {
        // calculating next position
        const progress = timestamp - start;
        const t = progress / self.settings.animationDuration;
        const newPos =
          startPosition + distance * self.settings.timingFunction(t);

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

    // update url if target is an id
    if (self.settings.changeUrl && targetQuerySelector === "#") {
      window.history.replaceState(null, "", " ");
    } else if (
      self.settings.changeUrl &&
      typeof targetQuerySelector === "string" &&
      targetQuerySelector[0] === "#"
    ) {
      window.history.replaceState(null, "", targetQuerySelector);
    }

    // if custom function is provided
    if (self.settings.customFunction) {
      self.settings.customFunction();
    }
  }

  scrollMobile(event: MouseEvent) {
    event.preventDefault();
    const currentTarget: HTMLElement = event.currentTarget as HTMLElement;
    const self = this;

    // get the target query selector
    let targetQuerySelector: string | null = "#";
    if (currentTarget.tagName == "A") {
      targetQuerySelector = currentTarget.getAttribute("href");
      if (self.settings.changeUrl) {
        window.history.replaceState(null, "", targetQuerySelector);
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

    // the targetPosition depends on the screen width
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName("body")[0].clientWidth;

    // calculate how many px will need to be scrolled
    let distanceFromTop;
    if (screenWidth > self.settings.navigationBreakpoint) {
      distanceFromTop = self.settings.distanceFromTopDesktop;
    } else {
      distanceFromTop = self.settings.distanceFromTopMobile;
    }

    // if targetQuerySelector = "#" --> scroll to top
    let targetElement: HTMLElement;
    let targetPosition: number;

    if (targetQuerySelector === "#") {
      targetPosition = 0;
    } else {
      targetElement = document.querySelector(
        targetQuerySelector!
      ) as HTMLElement;
      targetPosition = targetElement.offsetTop - distanceFromTop;
    }

    const startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    const duration = self.settings.animationDuration;
    let start: number | null = null;

    window.requestAnimationFrame(step);

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const t = progress / self.settings.animationDuration;
      const newPos = startPosition + distance * self.settings.timingFunction(t);
      window.scrollTo(0, newPos);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }
  }
}
