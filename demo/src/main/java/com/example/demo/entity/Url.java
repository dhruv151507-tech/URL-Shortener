package com.example.demo.entity;
// import lombok.Data;
import jakarta.persistence.*;

@Entity
// @Data
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String originalUrl;
    @Column(unique = true)
    private String shortCode;
// getters and setters
public String getOriginalUrl() {
    return originalUrl;
}

public void setOriginalUrl(String originalUrl) {
    this.originalUrl = originalUrl;
}

public String getShortCode() {
    return shortCode;
}

public void setShortCode(String shortCode) {
    this.shortCode = shortCode;
}
  
}