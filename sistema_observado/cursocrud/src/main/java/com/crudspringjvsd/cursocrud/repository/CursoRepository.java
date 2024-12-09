package com.crudspringjvsd.cursocrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crudspringjvsd.cursocrud.entity.CursoEntity;

public interface CursoRepository extends JpaRepository<CursoEntity, Long> {
}
