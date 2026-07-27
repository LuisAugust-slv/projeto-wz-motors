import { isMobile } from "../utils/viewport.js";

export function initFooter() {
    if (!isMobile()) return;

    const brandDescription = document.querySelector(".footer-brand .text-tab p");

    if (!brandDescription) return;

    brandDescription.textContent =
        "Ajudamos você a encontrar o veículo ideal com atendimento transparente, condições especiais e suporte em todas as etapas da compra.";
}