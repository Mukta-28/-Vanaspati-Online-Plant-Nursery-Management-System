package com.cdac.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;

    private int rating;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // ✅ Make sure this is correctly typed

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Optional: If review is tied to user
}
