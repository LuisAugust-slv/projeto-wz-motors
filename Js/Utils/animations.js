export function animateOnScroll(elements, offset = 100) {

    elements.forEach(element => {

        // Se o elemento já foi exibido anteriormente,
        // não há necessidade de processá-lo novamente
        if (element.classList.contains("show")) return;

        // Obtém a posição do elemento em relação à janela de visualização (viewport)
        const top = element.getBoundingClientRect().top;

        // Verifica se o elemento entrou na área visível da tela.
        // window.innerHeight representa a altura da janela do navegador.
        if (top < window.innerHeight - offset) {

            // Adiciona a classe responsável por exibir e animar o elemento
            element.classList.add("show");
        }
    });

}