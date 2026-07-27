const MOBILE_BREAKPOINT = 768;

export function isMobile() {
    return window.matchMedia(
        `(max-width: ${MOBILE_BREAKPOINT}px)`
    ).matches;
}