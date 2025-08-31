package com.cdac.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Inspection_Reports")
public class InspectionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private InspectionRequest request;

    @ManyToOne
    @JoinColumn(name = "inspector_id")
    private User inspector;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    private Product plant;

    private String remarks;

    private Integer healthRating;

    private String reportImageUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

