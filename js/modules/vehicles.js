import { vehicles } from "../data/vehicles.js";
import { isMobile } from "../utils/viewport.js";

export function initVehicles() {
    //======= VARIÁVEIS =======//
    
    // Elementos principais
    const elements = {
        // Estados
        emptyState: document.getElementById("empty-state"),
        vehicleActions: document.getElementById("vehicle-actions"),

        // Inputs de preço
        priceMin: document.getElementById("price-min"),
        priceMax: document.getElementById("price-max"),

        // Botões
        btnLoadMore: document.getElementById("load-more-btn"),
        btnLoadLess: document.getElementById("load-less-btn"),
        btnFilter: document.getElementById("button-filter"),
        btnReset: document.querySelectorAll(".btn-reset"),

        // Contadores
        resultsCounter: document.querySelector(".results-counter"),
        resultsPrefix: document.querySelector(".results-prefix"),
        visibleCount: document.getElementById("visible-count"),
        resultsSeparator: document.querySelector(".results-separator"),
        totalCount: document.getElementById("total-count"),      
        resultsSuffix: document.querySelector(".results-suffix"),        

        // Containers
        containerVeiculos: document.getElementById("vehicle-list"),        
        filters: document.getElementById("filters"),

        // Brands
        brandsSection: document.getElementById("brands"),
        brandCards: document.querySelectorAll(".brand-card"),

        // Ícones
        icon: document.getElementById("icon-filters")
    };

    // Impede a execução do módulo em páginas que não possuem a seção de veículos
    if (!elements.containerVeiculos) {
        return;
    }

    // Seção
    const sectionVeiculos = document.getElementById("vehicles");

    // Botão de preço
    const btnPrice = document.querySelectorAll(".price-tags button");

    // Filtros rápidos
    const quickFilters = document.querySelector(".quick-filters");
    const quickChips = document.querySelectorAll(".quick-chip");

    // Campos de pesquisa
    const nameInput = document.querySelector(".search-name");
    const yearSelect = document.querySelector(".year-option");

    // Checkboxes
    const modeloCheckboxes = document.querySelectorAll("[data-model]");
    const conservacaoCheckboxes = document.querySelectorAll("[data-conservation]");
    const marcaCheckboxes = document.querySelectorAll("[data-mark]");
    const colorCheckboxes = document.querySelectorAll("[data-color]");
    
    // ===== LISTENER NOVO (BRANDS) =====
    document.addEventListener("brandSelected", handleBrandSelected);
    
    // VARIÁVEIS GLOBAIS
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
            marcaSelecionada: null,

            ano: null,
            cor: []
        },

        itensVisiveis: ITEMS_INITIAL,

        listaFiltrada: []
    };


    // Atualiza os checkboxes de marca   
    function updateBrandCheckboxes() {
        marcaCheckboxes.forEach((checkbox) => {
            checkbox.checked = state.filtros.marca.includes(
                checkbox.dataset.mark.toLowerCase()
            );
        });
    }
    
    // Manipula o clique da seleção Brands
    function handleBrandSelected(event) {
        const brand = event.detail.brand;

        state.filtros.marca = [brand];

        updateBrandCheckboxes();
        aplicarFiltros();
    }


    // FORMATAÇÃO DE PRICE
    function formatPrice(value) {
        const numbers = value.replace(/\D/g, "");
        return numbers
            ? Number(numbers).toLocaleString("pt-BR")
            : "";
    }


    // CLEAR AND CLOSE THE FILTER
    elements.btnFilter.addEventListener("click", () => {
        elements.filters.classList.toggle("open");

        elements.icon.classList.toggle("rotate");

        quickFilters.classList.toggle("disabled");

        const aberto = elements.filters.classList.contains("open");

        elements.resultsCounter.classList.toggle("filter-open", aberto);

        elements.btnFilter.setAttribute("aria-expanded", aberto);
        elements.filters.setAttribute("aria-hidden", !aberto);
    });


    // CONTADOR
    function atualizarContador() {
        const total = state.listaFiltrada.length;
        const visiveis = Math.min(state.itensVisiveis, total);

        if (total === 0) {
            elements.resultsPrefix.textContent = "";
            elements.visibleCount.textContent = "0";
            elements.resultsSeparator.textContent = "";
            elements.totalCount.textContent = "";
            elements.resultsSuffix.textContent = " veículos encontrados";
            return;
        }

        if (isMobile()) {
            const title = document.querySelector("#vehicles h2");
            const titleEmpty = document.querySelector("#vehicles .empty-state h3");

            if (title && titleEmpty) {
                title.textContent = "Encontre o veículo ideal";
                titleEmpty.textContent ="Nenhum veículo encontrado";
            }

            elements.resultsPrefix.textContent = "";
            elements.visibleCount.textContent = visiveis;
            elements.resultsSeparator.textContent = " de ";
            elements.totalCount.textContent = total;
            elements.resultsSuffix.textContent = " veículos";
        } else {
            elements.resultsPrefix.textContent = "Mostrando ";
            elements.visibleCount.textContent = visiveis;
            elements.resultsSeparator.textContent = " de ";
            elements.totalCount.textContent = total;
            elements.resultsSuffix.textContent = " veículos disponíveis";
        }
    }


    // LÓGICA DE MOSTRAR VEÍCULOS
    function criarCardVeiculo(v, index) {
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
    }

    function renderizarListaVeiculos(lista) {
        const html = lista
            .map((veiculo, index) => criarCardVeiculo(veiculo, index))
            .join("");

        elements.containerVeiculos.innerHTML = html;
    }

    function obterVeiculosVisiveis(lista) {
        return lista.slice(0, state.itensVisiveis);
    }

    function atualizarInterface(lista) {
        const possuiResultados = lista.length > 0;

        elements.emptyState.hidden = possuiResultados;
        elements.vehicleActions.style.display = possuiResultados
            ? "flex"
            : "none";
    }

    function limparListaVeiculos() {
        elements.containerVeiculos.innerHTML = "";
    }

    function finalizarRenderizacao() {
        atualizarContador();
        updateLoadButtons();
    }
    
    function renderizarLista(lista) {
        atualizarInterface(lista);

        // Nenhum veículo encontrado
        if (lista.length === 0) {
            limparListaVeiculos();
            atualizarContador();
            return;
        }

        const veiculosVisiveis = obterVeiculosVisiveis(lista);

        renderizarListaVeiculos(veiculosVisiveis);

        finalizarRenderizacao()
    }


    // FILTROS
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

        state.listaFiltrada = vehicles.filter(v => {
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

        renderizarLista(state.listaFiltrada);
    }


    // INPUT BUSCA
    nameInput.addEventListener("input", (e) => {
        state.filtros.busca = e.target.value.trim();

        aplicarFiltros();
    });


    // BUSCA INDEPENDENTE SE TEM ACENTO OU NÃO
    function normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }


    // SELECT ONE YEAR
    yearSelect.addEventListener("change", () => {
        state.filtros.ano = yearSelect.value
            ? Number(yearSelect.value)
            : null;

        aplicarFiltros();
    });


    // SELECT ONE COLOR
    colorCheckboxes.forEach(check => {
        check.addEventListener("change", () => {

            state.filtros.cor = [...colorCheckboxes]
                .filter(c => c.checked)
                .map(c => c.dataset.color);

            aplicarFiltros();
        });
    });


    // INPUT PREÇO
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


    // BOTÕES DE PREÇO
    btnPrice.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("active")) {
                btn.classList.remove("active");

                state.filtros.precoMax = null;
                elements.priceMax.value = "";
            } else {
                removeActiveButtons();

                btn.classList.add("active");

                const value = Number(btn.dataset.value);

                elements.priceMin.value = "";
                state.filtros.precoMax = value;
                elements.priceMax.value = value.toLocaleString("pt-BR");
            }

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


    // OPÇÕES DE MODELOS
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


    // OPÇÕES DE CONSERVAÇÃO
    conservacaoCheckboxes.forEach(check => {
        check.addEventListener("change", () => {
            state.filtros.conservacao = getCheckedValues(conservacaoCheckboxes, "conservation");

            aplicarFiltros();
            sincronizarQuickFilters();
        });
    });


    // OPÇÕES DE MARCA
    marcaCheckboxes.forEach(check => {
        check.addEventListener("change", () => {
            state.filtros.marca = getCheckedValues(marcaCheckboxes, "mark");

            aplicarFiltros();
        });
    });


    // SINCRONIZA O FILTRO RÁPIDO
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


    // RESET DOS FILTROS
    function resetFilters() {
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
        desmarcarCheckboxes();

        quickChips.forEach(chip => {
            chip.classList.remove("active");
        });

        state.listaFiltrada = [...vehicles];
        state.itensVisiveis = ITEMS_INITIAL;

        sincronizarPriceButtons();
        sincronizarQuickFilters();

        renderizarLista(state.listaFiltrada);
    }

    elements.btnReset.forEach(button => {
        button.addEventListener("click", resetFilters);
    });

    function desmarcarCheckboxes() {
        elements.filters
            .querySelectorAll("input[type='checkbox']")
            .forEach(input => {
                input.checked = false;
            });
    }


    // QUICK FILTERS
    quickChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const valor = chip.dataset.filter;
            const tipo = chip.dataset.type;

            chip.classList.toggle("active");

            // MODELOS
            if (tipo === "modelo") {
                const ativo = toggleArrayFilter("modelos", valor);
                const checkbox = document.querySelector(`[data-model="${valor}"]`);

                if (checkbox) {
                    checkbox.checked = ativo;
                }
            }

            // CONSERVAÇÃO
            if (tipo === "conservacao") {
                const ativo = toggleArrayFilter("conservacao", valor);
                const checkbox = document.querySelector(`[data-conservation="${valor}"]`);

                if (checkbox) {
                    checkbox.checked = ativo;
                }
            }

            // PREÇO
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


    // AUXILIAR
    function removeActiveButtons() {
        btnPrice.forEach(b => b.classList.remove("active"));
    }


    // LÓGICA DOS BUTTONS VER MAIS/MENOS 
    function updateLoadButtons() {
        const total = state.listaFiltrada.length;

        const possuiMaisVeiculos = state.itensVisiveis < total;
        const listaExpandida = state.itensVisiveis >= total;

        elements.btnLoadMore.style.display =
            possuiMaisVeiculos ? "inline-flex" : "none";

        elements.btnLoadLess.style.display =
            listaExpandida && total > ITEMS_INITIAL
                ? "inline-flex"
                : "none";
    }

    elements.btnLoadMore.addEventListener(
        "click",
        mostrarMaisVeiculos
    );

    elements.btnLoadLess.addEventListener(
        "click",
        mostrarMenosVeiculos
    );

    function mostrarMaisVeiculos() {
        const total = state.listaFiltrada.length;

        const primeiroNovoIndice = obterIndicePrimeiroNovoVeiculo();

        state.itensVisiveis = Math.min(
            state.itensVisiveis + ITEMS_INCREMENT,
            total
        );

        renderizarLista(state.listaFiltrada);

        if (isMobile()) {
            scrollParaPrimeiroNovoVeiculo(primeiroNovoIndice);
        }
    }

    function obterIndicePrimeiroNovoVeiculo() {
        return state.itensVisiveis;
    }

    function mostrarMenosVeiculos() {
        state.itensVisiveis = ITEMS_INITIAL;

        renderizarLista(state.listaFiltrada);

        voltarParaInicioDosVeiculos();
    }

    function voltarParaInicioDosVeiculos() {
        const top = sectionVeiculos.getBoundingClientRect().top + window.scrollY - 110;

        window.scrollTo({
            top,
            behavior: "smooth"
        });
    }

    function scrollParaPrimeiroNovoVeiculo(indice) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const cards = elements.containerVeiculos.querySelectorAll(".vehicle-card");
                const card = cards[indice];

                if (!card) return;

                const top = card.getBoundingClientRect().top + window.scrollY - 460;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });
            });
        });
    }


    // INICIALIZAÇÃO
    state.listaFiltrada = [...vehicles];
    renderizarLista(state.listaFiltrada);
}