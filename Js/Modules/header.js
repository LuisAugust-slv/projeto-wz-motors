export function initHeader() {
    // VARIÁVEIS 
    const links = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section[id], footer[id]")

    // VARIÁVEIS MOBILE
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const icon = menuToggle?.querySelector('i');


    // MENU DO HEADER ATIVO AO CLICAR
    links.forEach(link => { // Percorre cada link encontrado

        // Identifica quando o link é clicado e assim executa o código abaixo
        link.addEventListener("click", () => {

            // Remove a classe "active" de todos os links do menu
            links.forEach(l => l.classList.remove("active"));

            // Adiciona a classe "active" apenas no link que foi clicado
            link.classList.add("active");
        });
    });


    // SCROLL SPY
    function atualizarScrollSpy() {
        let currentSection = "";

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // A seção é considerada ativa quando cruza a região do header
            if (rect.top <= 120 && rect.bottom > 120) {
                currentSection = section.id;
            }
        });

        links.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
            );
        });
    }

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                atualizarScrollSpy();

                ticking = false;
            });
            ticking = true;
        }
    });

    // Atualiza o item ativo ao carregar a página
    atualizarScrollSpy();


    // MENU HAMBURGUER
    if (menuToggle && menu && icon) { 
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');

            menuToggle.setAttribute(
                'aria-expanded',
                menu.classList.contains('active')
            );

            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-x');
        });

        document.querySelectorAll('#menu a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');

                menuToggle.setAttribute('aria-expanded', false);

                icon.classList.remove('fa-x');
                icon.classList.add('fa-bars');
            });
        });
    }
}