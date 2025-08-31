package com.cdac.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Inspection_Requests")
public class InspectionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "inspector_id")
    private User inspector;

    private LocalDateTime requestedDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        pending, completed
    }
}

