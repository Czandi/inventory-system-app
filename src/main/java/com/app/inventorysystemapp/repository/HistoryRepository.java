package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {


  //TODO
  @Query("Select h from History h")
  Page<History> findByContaining(String search, Pageable paging);
}
