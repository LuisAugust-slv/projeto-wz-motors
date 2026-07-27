import { isMobile } from "../utils/viewport.js";

export function initHome() {
    if (!isMobile()) return;

    const title = document.querySelector("#home h1");
    const description = document.querySelector("#home p");

    if (!title || !description) return;

    title.innerHTML = 'Encontre seu carro <span class="highlight">ideal</span> com condições exclusivas';

    description.textContent = "Compare modelos e encontre o carro ideal com condições exclusivas.";
}