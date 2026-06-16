/* VARIÁVEIS */

const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id], footer[id]")
const sectionVeiculos = document.getElementById("vehicles");
const benefitCards = document.querySelectorAll(".benefits");

const elements = {
    emptyState: document.getElementById("empty-state"),
    vehicleActions: document.getElementById("vehicle-actions"),

    priceMin: document.getElementById("price-min"),
    priceMax: document.getElementById("price-max"),

    btnLoadMore: document.getElementById("load-more-btn"),
    btnLoadLess: document.getElementById("load-less-btn"),

    visibleCount: document.getElementById("visible-count"),
    totalCount: document.getElementById("total-count"),

    containerVeiculos: document.getElementById("vehicle-list"),

    btnFilter: document.getElementById("button-filter"),
    filters: document.getElementById("filters"),
    icon: document.getElementById("icon-filters"),

    btnReset: document.querySelector(".btn-reset"),
    btnCloseFilter: document.getElementById("btn-close-filter")
};

const btnPrice = document.querySelectorAll(".price-tags button");

const quickFilters = document.querySelector(".quick-filters");
const quickChips = document.querySelectorAll(".quick-chip");

const nameInput = document.querySelector(".search-name");
const yearSelect = document.querySelector(".year-option");
const modeloCheckboxes = document.querySelectorAll("[data-model]");
const conservacaoCheckboxes = document.querySelectorAll("[data-conservation]");
const marcaCheckboxes = document.querySelectorAll("[data-mark]");
const colorCheckboxes = document.querySelectorAll("[data-color]");

/* VARIÁVEIS GLOBAIS */
const ITEMS_INITIAL = 3;
const ITEMS_INCREMENT = 6;

const state = {
    filtros: {
        busca: "",
        precoMax: null,
        precoMin: null,
        modelos: [],
        conservacao: [],
        marca: [],
        ano: null,
        cor: []
    },

    itensVisiveis: ITEMS_INITIAL,

    listaFiltrada: []
};



/* LISTA DOS VEÍCULOS EM ESTOQUE */
let veiculos = [
    {
        id: 1,
        name: "Audi A5 Coupé",
        marca: "Audi",
        modelo: ["Sedan"],
        preco: 220000,
        ano: 2019,
        conservacao: "Seminovo",
        cor: "branco",
        quilometragem: 8200,
        motor: "2.0 TFSI Turbo 190cv",
        cambio: "Automático S tronic",
        imagem: "assets/Lista-Veiculo/audi-a5.webp"
    },
    {
        id: 2,
        name: "BMW 320i Série 3",
        marca: "BMW",
        modelo: ["Sedan"],
        preco: 250000,
        ano: 2022,
        conservacao: "Seminovo",
        cor: "preto",
        quilometragem: 18000,
        motor: "2.0 TwinPower Turbo 184cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/bmw-320i.webp"
    },
    {
        id: 3,
        name: "BMW X1",
        marca: "BMW",
        modelo: ["SUV"],
        preco: 180000,
        ano: 2023,
        conservacao: "Seminovo",
        cor: "preto",
        quilometragem: 12000,
        motor: "2.0 TwinPower Turbo 192cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/bmw-x1.webp"
    },
    {
        id: 4,
        name: "Cruze",
        marca: "Chevrolet",
        modelo: ["Sedan"],
        preco: 67000,
        ano: 2014,
        conservacao: "Usado",
        cor: "branco",
        quilometragem: 110000,
        motor: "1.8 Flex 144cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/cruze.webp"
    },
    {
        id: 5,
        name: "Camaro",
        marca: "Chevrolet",
        modelo: ["Sedan"],
        preco: 170000,
        ano: 2010,
        conservacao: "Usado",
        cor: "amarelo",
        quilometragem: 90000,
        motor: "6.2 V8 406cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/camaro.webp"
    },
    {
        id: 6,
        name: "Honda Civic G10",
        marca: "Honda",
        modelo: ["Sedan"],
        preco: 98000,
        ano: 2019,
        conservacao: "Usado",
        cor: "vermelho",
        quilometragem: 72000,
        motor: "2.0 Flex 155cv",
        cambio: "Automático CVT",
        imagem: "assets/Lista-Veiculo/honda-civic-g10.webp"
    },
    {
        id: 7,
        name: "Honda Civic G10 Facelift",
        marca: "Honda",
        modelo: ["Sedan"],
        preco: 110000,
        ano: 2020,
        conservacao: "Seminovo",
        cor: "cinza",
        quilometragem: 38000,
        motor: "1.5 Turbo 173cv",
        cambio: "Automático CVT",
        imagem: "assets/Lista-Veiculo/honda-civic-G10-facelift.webp"
    },
    {
        id: 8,
        name: "Honda CR-V",
        marca: "Honda",
        modelo: ["SUV"],
        preco: 69000,
        ano: 2011,
        conservacao: "Usado",
        cor: "preto",
        quilometragem: 130000,
        motor: "2.0 16V 150cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/honda-cr-v.webp"
    },
    {
        id: 9,
        name: "HB20s",
        marca: "Hyundai",
        modelo: ["Sedan"],
        preco: 45000,
        ano: 2013,
        conservacao: "Usado",
        cor: "branco",
        quilometragem: 160000,
        motor: "1.6 Flex 128cv",
        cambio: "Manual",
        imagem: "assets/Lista-Veiculo/hb20s.webp"
    },
    {
        id: 10,
        name: "HB20",
        marca: "Hyundai",
        modelo: ["Hatch"],
        preco: 56000,
        ano: 2019,
        conservacao: "Novo",
        cor: "cinza",
        quilometragem: 0,
        motor: "1.0 Flex 80cv",
        cambio: "Manual",
        imagem: "assets/Lista-Veiculo/hb20.webp"
    },
    {
        id: 11,
        name: "Creta",
        marca: "Hyundai",
        modelo: ["SUV"],
        preco: 88000,
        ano: 2018,
        conservacao: "Seminovo",
        cor: "azul",
        quilometragem: 40000,
        motor: "2.0 Flex 166cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/creta.webp"
    },
    {
        id: 12,
        name: "Jeep Renegade",
        marca: "Jeep",
        modelo: ["SUV"],
        preco: 63000,
        ano: 2017,
        conservacao: "Usado",
        cor: "preto",
        quilometragem: 85000,
        motor: "1.8 Flex 139cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/jeep-renegade.webp"
    },
    {
        id: 13,
        name: "Mercedes-Benz A200",
        marca: "Mercedes",
        modelo: ["Hatch"],
        preco: 86000,
        ano: 2016,
        conservacao: "Usado",
        cor: "preto",
        quilometragem: 78000,
        motor: "1.6 Turbo 156cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/mercedes-benz-a200.webp"
    },
    {
        id: 14,
        name: "Mercedes-AMG C43",
        marca: "Mercedes",
        modelo: ["Sedan"],
        preco: 336000,
        ano: 2019,
        conservacao: "Seminovo",
        cor: "azul",
        quilometragem: 35000,
        motor: "3.0 V6 Biturbo 390cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/mercedes-amg-c43.webp"
    },
    {
        id: 15,
        name: "KIA Cerato",
        marca: "KIA",
        modelo: ["Sedan"],
        preco: 90000,
        ano: 2023,
        conservacao: "Novo",
        cor: "branco",
        quilometragem: 0,
        motor: "2.0 Flex 167cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/kia-cerato.webp"
    },
    {
        id: 16,
        name: "Toyota Corolla XSE",
        marca: "Toyota",
        modelo: ["Sedan"],
        preco: 120000,
        ano: 2019,
        conservacao: "Seminovo",
        cor: "branco",
        quilometragem: 50000,
        motor: "2.0 Flex 177cv",
        cambio: "Automático CVT",
        imagem: "assets/Lista-Veiculo/toyota-corolla-xse.webp"
    },
    {
        id: 17,
        name: "Toyota Avalon",
        marca: "Toyota",
        modelo: ["Sedan"],
        preco: 160000,
        ano: 2013,
        conservacao: "Usado",
        cor: "bege",
        quilometragem: 70000,
        motor: "3.5 V6 277cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/toyota-avalon.webp"
    },
    {
        id: 18,
        name: "Toyota RAV4",
        marca: "Toyota",
        modelo: ["SUV", "Híbrido"],
        preco: 270000,
        ano: 2023,
        conservacao: "Novo",
        cor: "cinza",
        quilometragem: 0,
        motor: "2.5 Híbrido 222cv",
        cambio: "Automático CVT",
        imagem: "assets/Lista-Veiculo/toyota-rav4.webp"
    },
    {
        id: 19,
        name: "Toyota Aygo",
        marca: "Toyota",
        modelo: ["Hatch"],
        preco: 37000,
        ano: 2010,
        conservacao: "Usado",
        cor: "preto",
        quilometragem: 120000,
        motor: "1.0 72cv",
        cambio: "Manual",
        imagem: "assets/Lista-Veiculo/toyota-aygo.webp"
    },
    {
        id: 20,
        name: "Peugeot 207",
        marca: "Peugeot",
        modelo: ["Hatch"],
        preco: 34000,
        ano: 2016,
        conservacao: "Usado",
        cor: "branco",
        quilometragem: 140000,
        motor: "1.4 Flex 82cv",
        cambio: "Manual",
        imagem: "assets/Lista-Veiculo/peugeot-207.webp"
    },
    {
        id: 21,
        name: "Renault Captur",
        marca: "Renault",
        modelo: ["SUV"],
        preco: 60000,
        ano: 2015,
        conservacao: "Seminovo",
        cor: "azul",
        quilometragem: 47000,
        motor: "2.0 Flex 148cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/renault-captur.webp"
    },
    {
        id: 22,
        name: "Golf GTI MK6",
        marca: "Volkswagen",
        modelo: ["Hatch"],
        preco: 110000,
        ano: 2011,
        conservacao: "Usado",
        cor: "preto",
        quilometragem: 108000,
        motor: "2.0 TSI Turbo 211cv",
        cambio: "Automático DSG",
        imagem: "assets/Lista-Veiculo/golf-gti-mk6.webp"
    },
    {
        id: 23,
        name: "Polo R-Line",
        marca: "Volkswagen",
        modelo: ["Hatch"],
        preco: 137000,
        ano: 2026,
        conservacao: "Novo",
        cor: "branco",
        quilometragem: 0,
        motor: "1.0 TSI Turbo 116cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/polo-r-line.webp"
    },
    {
        id: 24,
        name: "Tiguan Allspace",
        marca: "Volkswagen",
        modelo: ["SUV"],
        preco: 144000,
        ano: 2018,
        conservacao: "Usado",
        cor: "cinza",
        quilometragem: 78000,
        motor: "2.0 TSI Turbo 220cv",
        cambio: "Automático DSG",
        imagem: "assets/Lista-Veiculo/tiguan-allspace.webp"
    },
    {
        id: 25,
        name: "Amarok V6",
        marca: "Volkswagen",
        modelo: ["Picape"],
        preco: 150000,
        ano: 2018,
        conservacao: "Usado",
        cor: "preto",
        quilometragem: 92000,
        motor: "3.0 V6 Turbo Diesel 258cv",
        cambio: "Automático",
        imagem: "assets/Lista-Veiculo/amarok-v6.webp"
    }
]

/* MENU ATIVO AO CLICAR */
links.forEach(link => { // Percorre cada link encontrado

    // Identifica quando o link é clicado e assim executa o código abaixo
    link.addEventListener("click", () => {

        // Remove a classe "active" de todos os links do menu
        links.forEach(l => l.classList.remove("active"));

        // Adiciona a classe "active" apenas no link que foi clicado
        link.classList.add("active");
    });
});

/* SCROLL SPY */
function atualizarScrollSpy() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            atualizarScrollSpy();
            animarCards();

            ticking = false;
        });
        ticking = true;
    }
});

/* ANIMAÇÃO DOS CARDS */
function animarCards() {

    // Percorre cada elemento selecionado
    benefitCards.forEach(el => {

        // Pega a posição do elemento em relação à tela (viewport)
        const top = el.getBoundingClientRect().top;

        // Verifica se o elemento já está visível na tela
        // window.innerHeight = altura da tela
        // -100 = faz aparecer um pouco antes (efeito mais suave)
        if (top < window.innerHeight - 100) {

            // Adiciona a classe "show" ao elemento
            el.classList.add("show");
        }
    });
}

/* FORMATAÇÃO DE PRICE */
function formatPrice(value) {
    const numbers = value.replace(/\D/g, "");
    return numbers
        ? Number(numbers).toLocaleString("pt-BR")
        : "";
}

/* CLEAR AND CLOSE THE FILTER */
elements.btnFilter.addEventListener("click", () => {
    elements.filters.classList.toggle("open");

    elements.icon.classList.toggle("rotate");

    quickFilters.classList.toggle("disabled");

    const aberto = elements.filters.classList.contains("open");

    elements.btnFilter.setAttribute("aria-expanded", aberto);
    elements.filters.setAttribute("aria-hidden", !aberto);
});

/* CONTADOR */
function atualizarContador() {
    elements.visibleCount.textContent = Math.min(state.itensVisiveis, state.listaFiltrada.length);
    elements.totalCount.textContent = state.listaFiltrada.length;
}

/* MOSTRAR VEÍCULOS */
function mostrarVeiculos(lista) {
    // Nenhum veículo encontrado
    if (lista.length === 0) {

        elements.containerVeiculos.innerHTML = "";

        elements.emptyState.hidden = false;
        elements.vehicleActions.style.display = "none";

        atualizarContador();

        return;
    }

    elements.emptyState.hidden = true;

    if (lista.length > 0) {
        elements.vehicleActions.style.display = "flex";
    }

    const listaLimitada = lista.slice(0, state.itensVisiveis);

    elements.containerVeiculos.innerHTML = listaLimitada
        .map((v, index) => {

            const mensagem = encodeURIComponent(
`Olá! 👋

Tenho interesse no veículo ${v.name} (${v.ano}) que vi no site da WZ Motors.

Gostaria de receber mais informações sobre:
• Disponibilidade
• Valor atualizado
• Condições de pagamento
• Financiamento (se disponível)

Fico no aguardo. Obrigado!`
            );

            const whatsappLink = `https://wa.me/5534984413141?text=${mensagem}`;

            return `
                <div class="vehicle-card" style="animation-delay: ${index * 0.05}s">
                    <div class="vehicle-image">
                        <img
                            src="${v.imagem}"
                            alt="Foto do veículo ${v.name}, modelo ${v.modelo.join(", ")}, cor ${v.cor}, ano ${v.ano}"
                            loading="lazy"
                        >

                        <span class="vehicle-condition">
                            ${v.conservacao}
                        </span>
                    </div>

                    <div class="vehicle-content">
                        <h3 class="vehicle-title">
                            ${v.name}
                        </h3>

                        <div class="vehicle-description">
                            <span>${v.motor}</span>
                            <span>${v.cambio}</span>
                        </div>

                        <div class="vehicle-info">
                            <span class="vehicle-info-item">
                                <i class="fa-solid fa-calendar-days"></i>
                                <span>${v.ano}</span>
                            </span>

                            <span class="vehicle-info-item">
                                <i class="fa-solid fa-gauge"></i>
                                <span>${v.quilometragem.toLocaleString("pt-BR")} km</span>
                            </span>
                        </div>

                        <span class="vehicle-price">
                            R$ ${v.preco.toLocaleString("pt-BR")}
                        </span>

                        <a href="${whatsappLink}" class="vehicle-card-btn" target="_blank" rel="noopener noreferrer">
                            Ver oferta
                        </a>
                    </div>
                </div>
            `;
        })
        .join("");

    atualizarContador();
    controlarBotao();
}

/* FILTROS */

function validarFaixaPreco() {
    if (state.filtros.precoMin && state.filtros.precoMax && state.filtros.precoMin > state.filtros.precoMax) {
        return false;
    }
    return true;
}

function aplicarFiltros() {

    if (!validarFaixaPreco()) {
        return;
    }

    state.listaFiltrada = veiculos.filter(v => {
        // Busca pelo nome:
        if (state.filtros.busca && !normalizeText(v.name).includes(normalizeText(state.filtros.busca))) {
            return false;
        }

        // Busca pelo preço mínimo:
        if (state.filtros.precoMin && v.preco < state.filtros.precoMin) {
            return false;
        }

        // Busca pelo preço máximo:
        if (state.filtros.precoMax && v.preco > state.filtros.precoMax) {
            return false;
        }
        // Busca pelo modelo:
        if (state.filtros.modelos.length && !state.filtros.modelos.some(m => v.modelo.includes(m))) {
            return false;
        }

        // Busca pela cor:
        if (state.filtros.cor.length && !state.filtros.cor.includes(v.cor)) {
            return false;
        }

        // Busca pelo ano:
        if (state.filtros.ano && v.ano !== state.filtros.ano) {
            return false;
        }

        // Busca pelo conservação:
        if (state.filtros.conservacao.length && !state.filtros.conservacao.includes(v.conservacao)) {
            return false;
        }

        // Busca pela marca:
        if (state.filtros.marca.length && !state.filtros.marca.includes(v.marca)) {
            return false;
        }

        return true;
    });

    state.itensVisiveis = ITEMS_INITIAL;

    mostrarVeiculos(state.listaFiltrada);
}

/* INPUT BUSCA */
nameInput.addEventListener("input", (e) => {
    state.filtros.busca = e.target.value.trim();

    aplicarFiltros();
});

/* BUSCA INDEPENDENTE SE TEM ACENTO OU NÃO */
function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

/* SELECT ONE YEAR */
yearSelect.addEventListener("change", () => {
    state.filtros.ano = yearSelect.value
        ? Number(yearSelect.value)
        : null;

    aplicarFiltros();
});

/* SELECT ONE COLOR */
colorCheckboxes.forEach(check => {
    check.addEventListener("change", () => {

        state.filtros.cor = [...colorCheckboxes]
            .filter(c => c.checked)
            .map(c => c.dataset.color);

        aplicarFiltros();
    });
});

/* INPUT PREÇO */

function parsePrice(value) {
    return Number(
        value.replace(/\D/g, "")
    ) || null;
}

elements.priceMin.addEventListener("input", () => {
    elements.priceMin.value = formatPrice(elements.priceMin.value);
    state.filtros.precoMin = parsePrice(elements.priceMin.value);

    removeActiveButtons();
    aplicarFiltros();
});

elements.priceMax.addEventListener("input", () => {
    elements.priceMax.value = formatPrice(elements.priceMax.value);
    state.filtros.precoMax = parsePrice(elements.priceMax.value);

    removeActiveButtons();
    aplicarFiltros();
});

/* BOTÕES DE PREÇO */
btnPrice.forEach(btn => {
    btn.addEventListener("click", () => {
        removeActiveButtons();

        btn.classList.add("active");

        const value = btn.dataset.value;

        elements.priceMin.value = "";

        state.filtros.precoMax = Number(value);
        elements.priceMax.value = Number(value).toLocaleString("pt-BR");

        aplicarFiltros();

        sincronizarQuickFilters();
    });
});

function sincronizarPriceButtons() {
    btnPrice.forEach(btn => {
        btn.classList.remove("active");

        if (Number(btn.dataset.value) === state.filtros.precoMax) {
            btn.classList.add("active");
        }
    });
}

/* OPÇÕES DE MODELOS */

function getCheckedValues(nodeList, datasetKey) {
    return [...nodeList].filter(i => i.checked).map(i => i.dataset[datasetKey]);
}

modeloCheckboxes.forEach(check => {
    check.addEventListener("change", () => {
        state.filtros.modelos = getCheckedValues(modeloCheckboxes, "model");

        aplicarFiltros();
        sincronizarQuickFilters();
    });
});

/* OPÇÕES DE CONSERVAÇÃO */
conservacaoCheckboxes.forEach(check => {
    check.addEventListener("change", () => {
        state.filtros.conservacao = getCheckedValues(conservacaoCheckboxes, "conservation");

        aplicarFiltros();
        sincronizarQuickFilters();
    });
});

/* OPÇÕES DE MARCA */
marcaCheckboxes.forEach(check => {
    check.addEventListener("change", () => {
        state.filtros.marca = getCheckedValues(marcaCheckboxes, "mark");

        aplicarFiltros();
    });
});

/* SINCRONIZA O FILTRO RÁPIDO */
function sincronizarQuickFilters() {
    quickChips.forEach(chip => {

        const valor = chip.dataset.filter;

        chip.classList.remove("active");

        if (state.filtros.modelos.includes(valor) || state.filtros.conservacao.includes(valor)) {
            chip.classList.add("active");
        }

        if (!isNaN(valor) && state.filtros.precoMax === Number(valor)) {
            chip.classList.add("active");
        }
    });
}

/* RESET DOS FILTROS */
elements.btnReset.addEventListener("click", () => {
    state.filtros = {
        busca: "",
        precoMin: null,
        precoMax: null,
        modelos: [],
        conservacao: [],
        marca: [],
        ano: null,
        cor: []
    };

    elements.priceMin.value = "";
    elements.priceMax.value = "";
    yearSelect.value = "";
    nameInput.value = "";

    removeActiveButtons();

    elements.filters
        .querySelectorAll("input[type='checkbox']")
        .forEach(input => {
            input.checked = false;
        });

    quickChips.forEach(chip => {
        chip.classList.remove("active");
    });

    state.listaFiltrada = [...veiculos];

    state.itensVisiveis = ITEMS_INITIAL;

    sincronizarPriceButtons()
    sincronizarQuickFilters();

    mostrarVeiculos(state.listaFiltrada);
});

/* QUICK FILTERS */
quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
        const valor = chip.dataset.filter;
        const tipo = chip.dataset.type;

        chip.classList.toggle("active");

        /* MODELOS */
        if (tipo === "modelo") {
            const ativo = toggleArrayFilter("modelos", valor);
            const checkbox = document.querySelector(`[data-model="${valor}"]`);

            if (checkbox) {
                checkbox.checked = ativo;
            }
        }

        /* CONSERVAÇÃO */
        if (tipo === "conservacao") {
            const ativo = toggleArrayFilter("conservacao", valor);
            const checkbox = document.querySelector(`[data-conservation="${valor}"]`);

            if (checkbox) {
                checkbox.checked = ativo;
            }
        }

        /* PREÇO */
        if (tipo === "preco") {
            removeActiveButtons();

            if (chip.classList.contains("active")) {
                state.filtros.precoMin = null;
                elements.priceMin.value = "";
                state.filtros.precoMax = Number(valor);

                sincronizarPriceButtons()

                elements.priceMax.value = Number(valor).toLocaleString("pt-BR");
            } else {
                state.filtros.precoMax = null;
                elements.priceMax.value = "";
            }
        }
        aplicarFiltros();
    });
});

function toggleArrayFilter(chave, valor) {

    const lista = state.filtros[chave];

    if (lista.includes(valor)) {
        state.filtros[chave] =
            lista.filter(item => item !== valor);

        return false;
    }

    state.filtros[chave].push(valor);

    return true;
}

/* FECHAR FILTRO */
elements.btnCloseFilter.addEventListener("click", () => {
    elements.filters.classList.remove("open");

    elements.icon.classList.remove("rotate");

    quickFilters.classList.remove("disabled");

    elements.btnFilter.setAttribute("aria-expanded", "false");
    elements.filters.setAttribute("aria-hidden", "true");
});

/* AUXILIAR */
function removeActiveButtons() {
    btnPrice.forEach(b => b.classList.remove("active"));
}

/* VER MAIS | MENOS */
function controlarBotao() {
    const total = state.listaFiltrada.length;
    const existeMaisItens = total > state.itensVisiveis;
    const listaExpandida = state.itensVisiveis >= total;

    elements.btnLoadMore.style.display = existeMaisItens
        ? "inline-flex"
        : "none";

    elements.btnLoadLess.style.display = listaExpandida && total > 3
        ? "inline-flex"
        : "none";
}

// Ver mais:
elements.btnLoadMore.addEventListener("click", () => {
    const total = state.listaFiltrada.length;

    state.itensVisiveis += ITEMS_INCREMENT;

    if (state.itensVisiveis > total) {
        state.itensVisiveis = total;
    }

    mostrarVeiculos(
        state.listaFiltrada
    );
});

// Ver menos:
elements.btnLoadLess.addEventListener("click", () => {
    state.itensVisiveis = ITEMS_INITIAL;

    mostrarVeiculos(state.listaFiltrada);

    window.scrollTo({
        top: sectionVeiculos.offsetTop - 100,
        behavior: "smooth"
    });
});

/* INICIALIZAÇÃO */
state.listaFiltrada = [...veiculos];

mostrarVeiculos(state.listaFiltrada);
