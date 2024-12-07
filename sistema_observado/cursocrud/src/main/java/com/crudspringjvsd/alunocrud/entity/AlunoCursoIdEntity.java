package com.crudspringjvsd.alunocrud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

public class AlunoCursoIdEntity implements Serializable {
    private long idaluno;
    private long idcurso;
}