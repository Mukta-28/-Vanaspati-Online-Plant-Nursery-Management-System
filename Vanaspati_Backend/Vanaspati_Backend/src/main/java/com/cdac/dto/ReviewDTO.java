package com.cdac.dto;

import java.time.LocalDateTime;

public class ReviewDTO {
    public Long reviewId;
    public Long buyerId;
    public Long productId;
    public Integer rating;
    public String comment;
    public LocalDateTime createdAt;
}
