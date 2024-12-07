package com.crudspringjvsd.alunocrud.repository;

import com.crudspringjvsd.alunocrud.entity.AlunoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<AlunoEntity, Long> {}
