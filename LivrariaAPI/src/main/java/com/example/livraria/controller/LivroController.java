package com.example.livraria.controller;

import com.example.livraria.model.Livro;
import com.example.livraria.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroRepository livroRepository;

    @PostMapping
    public Livro cadastrarLivro(@RequestBody Livro livro) {
        return livroRepository.save(livro);
    }

    @GetMapping
    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    @GetMapping("/buscar")
    public List<Livro> buscarPorTituloOuAutor(@RequestParam(required = false) String titulo,
                                              @RequestParam(required = false) String autor) {
        if (titulo != null) {
            return livroRepository.findByTituloContaining(titulo);
        } else if (autor != null) {
            return livroRepository.findByAutorContaining(autor);
        }
        return listarLivros();
    }
}
