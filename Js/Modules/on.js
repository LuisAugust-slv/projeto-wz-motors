import { isMobile } from "../utils/viewport.js";

export function initOn() {
    if (!isMobile()) return;

    const onText = document.querySelector("#on .on-text");

    if (!onText) return;

    onText.innerHTML = `
        <p>Comprar um carro é uma decisão importante. Na WZ Motors, você encontra atendimento próximo, condições especiais e suporte em todas as etapas da compra.</p>

        <p>Nossa equipe ajuda você a escolher o veículo ideal com transparência, segurança e benefícios exclusivos.</p>
    `;
}