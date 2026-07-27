import { initHeader } from "./Modules/header.js";
import { initHome } from "./Modules/home.js";
import { initBenefits } from "./Modules/benefits.js";
import { initBrands } from "./Modules/brands.js";
import { initVehicles } from "./Modules/vehicles.js";
import { initSobre } from "./Modules/sobre.js";
import { initTestimonials } from "./Modules/testimonials.js";
import { initFooter } from "./Modules/footer.js";

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
        initSobre();
    } catch (e) {
        console.error("Erro no Sobre:", e);
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
