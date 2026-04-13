package com.example.demo.service;
import com.example.demo.Exception.UrlNotFoundException;
import com.example.demo.entity.Url;
import com.example.demo.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {

    @Autowired
    private UrlRepository repository;

    private static final String CHAR_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int LENGTH = 6;

   public String shortenUrl(String originalUrl) {

    // Check if URL already exists
    Optional<Url> existing = repository.findByOriginalUrl(originalUrl);
    if (existing.isPresent()) {
        return existing.get().getShortCode();
    }

    // Generate unique short code
    String shortCode;
    do {
        shortCode = generateShortCode();
    } while (repository.findByShortCode(shortCode).isPresent());

    // Save new entry
    Url url = new Url();
    url.setOriginalUrl(originalUrl);
    url.setShortCode(shortCode);

    repository.save(url);

    return shortCode;
}

   public String getOriginalUrl(String shortCode) {
    return repository.findByShortCode(shortCode)
            .map(Url::getOriginalUrl)
            .orElseThrow(() -> new UrlNotFoundException("Short code not found: " + shortCode));
}

    private String generateShortCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < LENGTH; i++) {
            sb.append(CHAR_SET.charAt(random.nextInt(CHAR_SET.length())));
        }

        return sb.toString();
    }
}