package com.example.livraria.repository;

import com.example.livraria.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByTituloContaining(String titulo);
    List<Livro> findByAutorContaining(String autor);
}
