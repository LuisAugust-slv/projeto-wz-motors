import { isMobile } from "../utils/viewport.js";

export function initTestimonials() {
    if (!isMobile()) return;

    const description = document.querySelector("#testimonials .testim-header p");

    if (!description) return;

    description.textContent =
        "Veja como foi a experiência de quem já comprou com a gente.";
}