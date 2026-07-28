import { initHeader } from "./modules/header.js";
import { initHome } from "./modules/home.js";
import { initBenefits } from "./modules/benefits.js";
import { initBrands } from "./modules/brands.js";
import { initVehicles } from "./modules/vehicles.js";
import { initOn } from "./modules/on.js";
import { initTestimonials } from "./modules/testimonials.js";
import { initFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        initHeader();
    } catch (e) {
        console.error("Erro no Header:", e);
    }

    try {
        initHome();
    } catch (e) {
        console.error("Erro no Home:", e);
    }

    try {
        initBenefits();
    } catch (e) {
        console.error("Erro no Benefits:", e);
    }

    try {
        initBrands();
    } catch (e) {
        console.error("Erro no Brands:", e);
    }

    try {
        initVehicles();
    } catch (e) {
        console.error("Erro no Vehicles:", e);
    }

    try {
        initOn();
    } catch (e) {
        console.error("Erro no On:", e);
    }

    try {
        initTestimonials();
    } catch (e) {
        console.error("Erro no Testimonials:", e);
    }

    try {
        initFooter();
    } catch (e) {
        console.error("Erro no Footer:", e);
    }

});
