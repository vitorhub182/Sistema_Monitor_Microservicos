package com.crudspringjvsd.relatorio.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CursoEntity {

    private long id;

    @NonNull
    private String nome;

    @NonNull
    String descricao;
}
