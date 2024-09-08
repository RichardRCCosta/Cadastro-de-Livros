document.addEventListener("DOMContentLoaded", function() {
    const cadastroForm = document.getElementById("cadastroForm");
    const buscaForm = document.getElementById("buscaForm");
    const listaLivros = document.getElementById("listaLivros");

    // Função para cadastrar um livro
    cadastroForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const livro = {
            titulo: document.getElementById("titulo").value,
            autor: document.getElementById("autor").value,
            isbn: document.getElementById("isbn").value,
            dataPublicacao: document.getElementById("dataPublicacao").value
        };

        fetch("http://localhost:8080/api/livros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(livro)
        })
        .then(response => response.json())
        .then(() => {
            alert("Livro cadastrado com sucesso!");
            listarLivros(); // Atualiza a lista de livros após cadastrar
        })
        .catch(error => console.error("Erro ao cadastrar livro:", error));
    });

    // Função para buscar livros
    buscaForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = document.getElementById("buscaTitulo").value;
        const autor = document.getElementById("buscaAutor").value;

        let url = "http://localhost:8080/api/livros/buscar?";
        if (titulo) {
            url += `titulo=${titulo}&`;
        }
        if (autor) {
            url += `autor=${autor}`;
        }

        fetch(url)
        .then(response => response.json())
        .then(livros => {
            listarLivros(livros); // Passa os resultados da busca para a função listarLivros
        })
        .catch(error => console.error("Erro ao buscar livros:", error));
    });

    // Função para listar livros
    function listarLivros(livros = []) {
        listaLivros.innerHTML = ""; // Limpa a tabela antes de adicionar novos livros

        if (livros.length === 0) {
            fetch("http://localhost:8080/api/livros")
            .then(response => response.json())
            .then(livros => {
                livros.forEach(livro => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${livro.titulo}</td>
                        <td>${livro.autor}</td>
                        <td>${livro.isbn}</td>
                        <td>${livro.dataPublicacao}</td>
                    `;
                    listaLivros.appendChild(tr);
                });
            })
            .catch(error => console.error("Erro ao listar livros:", error));
        } else {
            livros.forEach(livro => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.isbn}</td>
                    <td>${livro.dataPublicacao}</td>
                `;
                listaLivros.appendChild(tr);
            });
        }
    }

    // Inicializa a lista de livros ao carregar a página
    listarLivros();
});
