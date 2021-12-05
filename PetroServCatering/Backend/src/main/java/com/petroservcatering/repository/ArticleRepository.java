
package com.petroservcatering.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petroservcatering.model.Articles;

@Repository
public interface ArticleRepository extends JpaRepository<Articles, Long>{

}
