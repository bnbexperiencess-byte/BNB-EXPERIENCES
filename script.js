// VARIÁVEL GLOBAL: Onde vamos mostrar o conteúdo
const catalogo = document.getElementById('catalogo-experiencias');

/**
 * Função para criar o HTML de um único cartão de experiência.
 * @param {object} exp - Um objeto contendo os dados da experiência (nome, categoria, etc.).
 * @returns {string} O HTML formatado para o cartão.
 */
function criarCardExperiencia(exp) {
    // Usamos Template Literals (crases ``) para criar HTML de forma fácil.
    return `
        <div class="experiencia-card">
            <span class="categoria">${exp.categoria}</span>
            <h3>${exp.nome}</h3>
            <p><strong>Local:</strong> ${exp.local}</p>
            <p>${exp.descricao}</p>
            <div class="preco">R$ ${exp.preco.toFixed(2).replace('.', ',')}</div>
        </div>
    `;
}

/**
 * Função principal para mostrar as experiências no catálogo.
 * @param {Array<object>} lista - A lista de experiências a ser exibida.
 */
function exibirExperiencias(lista) {
    // 1. Limpa o catálogo antes de adicionar novos cartões
    catalogo.innerHTML = ''; 

    // 2. Verifica se há experiências para mostrar
    if (lista.length === 0) {
        catalogo.innerHTML = '<p>Nenhuma experiência encontrada nesta categoria.</p>';
        return;
    }

    // 3. Itera sobre a lista e constrói o HTML
    let htmlContent = '';
    lista.forEach(experiencia => {
        htmlContent += criarCardExperiencia(experiencia);
    });

    // 4. Insere todo o HTML de uma vez no catálogo (melhor performance)
    catalogo.innerHTML = htmlContent;
}


/**
 * Função chamada pelos botões de filtro no HTML.
 * @param {string} categoriaDesejada - O nome da categoria a ser filtrada ('Todos', 'Atividade Esportiva', etc.).
 */
function filtrarExperiencias(categoriaDesejada) {
    let experienciasFiltradas;

    if (categoriaDesejada === 'Todos') {
        // Se for 'Todos', usamos a lista completa
        experienciasFiltradas = experiencias;
    } else {
        // Filtra a lista original (experiencias)
        // O método .filter() cria uma nova lista apenas com os itens que passam no teste.
        experienciasFiltradas = experiencias.filter(exp => exp.categoria === categoriaDesejada);
    }
    
    // Chama a função de exibição com a lista filtrada ou completa
    exibirExperiencias(experienciasFiltradas);
}


// --- EXECUÇÃO INICIAL ---
// Quando a página carrega, mostramos todas as experiências por padrão.
document.addEventListener('DOMContentLoaded', () => {
    filtrarExperiencias('Todos');
});
