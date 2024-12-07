package com.crudspringjvsd.alunocrud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "aluno")
public class AlunoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String matricula;
    @Column(nullable = false)
    private String first_name;
    @Column(nullable = false)
    private String last_name;
    @Column(nullable = false)
    @DateTimeFormat
    private Date date_birth;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column( nullable = false, updatable = false)
    private Date created;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column( nullable = false)
    private LocalDateTime lastModified;
}
