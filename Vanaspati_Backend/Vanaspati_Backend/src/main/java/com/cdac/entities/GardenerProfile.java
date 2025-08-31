package com.cdac.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;

@Entity
@Table(name = "Gardener_Profiles")
public class GardenerProfile {

    @Id
    private Long gardenerId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "gardener_id")
    private User gardener;

    private String serviceArea;

    @DecimalMin("0.0")
    private BigDecimal hourlyRate;

    private Integer experienceYears;

    private String skills;
}

