package com.crudspringjvsd.relatorio.service;

import com.crudspringjvsd.relatorio.entity.AlunoEntity;
import com.crudspringjvsd.relatorio.entity.CursoEntity;
import com.crudspringjvsd.relatorio.interfaces.AlunoClient;
import com.crudspringjvsd.relatorio.interfaces.CursoClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class AlunoCursoService {
    @Autowired
    private AlunoClient alunoClient;
    @Autowired
    private CursoClient cursoClient;

    @Async
    public CompletableFuture<List<AlunoEntity>> fetchAlunos() {
        List<AlunoEntity> alunos = alunoClient.getAllAlunos();
        return CompletableFuture.completedFuture(alunos);
    }

    @Async
    public CompletableFuture<List<CursoEntity>> fetchCursos() {
        List<CursoEntity> cursos = cursoClient.getAllCursos();
        return CompletableFuture.completedFuture(cursos);
    }

    public Map<String, List<?>> listAll() throws ExecutionException, InterruptedException {
        CompletableFuture<List<AlunoEntity>> alunosFuture = fetchAlunos();
        CompletableFuture<List<CursoEntity>> cursosFuture = fetchCursos();

        CompletableFuture.allOf(alunosFuture, cursosFuture).join();

        List<AlunoEntity> alunos = alunosFuture.get();
        List<CursoEntity> cursos = cursosFuture.get();
        Map<String, List<?>> result = new HashMap<>();
        result.put("alunos", alunos);
        result.put("cursos", cursos);
        return result;
    }
}
