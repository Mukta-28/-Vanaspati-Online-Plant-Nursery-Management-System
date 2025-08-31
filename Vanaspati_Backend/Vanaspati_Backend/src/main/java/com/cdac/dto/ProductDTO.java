package com.cdac.dto;

import com.cdac.entities.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private Long sellerId;
    private String productName;
    private String category;
    private String description;
    private float price;
    private String image;
    private Status status;
    private Integer stock;
    
    // Convenience methods for the new controllers
    public String getName() {
        return productName;
    }
    
    public String getImageUrl() {
        return image;
    }
    
    public Double getPrice() {
        return (double) price;
    }
}

