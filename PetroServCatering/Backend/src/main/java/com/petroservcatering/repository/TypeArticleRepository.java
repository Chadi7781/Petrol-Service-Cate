package com.petroservcatering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.TypeArticle;

@Repository
public interface TypeArticleRepository extends JpaRepository<TypeArticle, Long> {
	List<TypeArticle> findAll();
}
