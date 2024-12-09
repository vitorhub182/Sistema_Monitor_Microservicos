package com.crudspringjvsd.relatorio.interfaces;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import com.crudspringjvsd.relatorio.entity.CursoEntity;

//@FeignClient(name = "crudcurso", url = "http://localhost:8088")
@FeignClient(name = "crudcurso", url = "http://web-service-curso:8080")
public interface CursoClient {
    @GetMapping("/curso")
    List<CursoEntity> getAllCursos();
}