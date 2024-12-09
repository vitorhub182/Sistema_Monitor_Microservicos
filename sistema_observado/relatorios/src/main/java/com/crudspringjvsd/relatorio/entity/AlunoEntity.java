package com.crudspringjvsd.relatorio.entity;

import jdk.jfr.Timestamp;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoEntity {
    private long id;
    private String matricula;
    private String first_name;
    private String last_name;
    @DateTimeFormat
    private Date date_birth;

    @DateTimeFormat
    private Date created;
    @DateTimeFormat
    private Date lastModified;
}