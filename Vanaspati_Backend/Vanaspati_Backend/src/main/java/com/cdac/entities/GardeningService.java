package com.cdac.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;

@Entity
@Table(name = "Gardening_Services")
public class GardeningService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @ManyToOne
    @JoinColumn(name = "gardener_id")
    private User gardener;

    private String serviceType;

    private String description;

    @DecimalMin("0.0")
    private BigDecimal price;
}

