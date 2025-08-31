package com.cdac.repository;

import com.cdac.entities.SellersProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SellerProfileRepository extends JpaRepository<SellersProfile, Long> {
    @Query("SELECT sp FROM SellersProfile sp WHERE sp.seller.id = :sellerId")
    Optional<SellersProfile> findBySellerIdEquals(@Param("sellerId") Long sellerId);
}

