import { animateOnScroll } from "../utils/animations.js";
import { isMobile } from "../utils/viewport.js";

export function initBenefits() {

    const benefitCards = document.querySelectorAll(".benefit-card");

    if (!benefitCards.length) {
        return;
    }

    if (isMobile()) {
        // Título e descrição
        const title = document.querySelector("#differences h2");
        const description = document.querySelector("#differences .container-difer p");

        // Títulos dos cards
        const cardTitles = document.querySelectorAll(
            "#differences .cont-benefits h3"
        );

        if (title && description && cardTitles.length >= 2) {
            title.textContent = "Por que escolher a WZ Motors?";
            description.textContent = "Benefícios exclusivos para quem compra com a gente.";

            cardTitles[0].textContent = "Economize no seguro do seu carro";
        }
    }

    function handleScroll() {
        animateOnScroll(benefitCards);
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();
}