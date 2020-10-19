package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.DeviceSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceSetRepository extends JpaRepository<DeviceSet, Long> {

  @Query("Select ds from DeviceSet ds where ds.id like %?1%")
  Page<DeviceSet> findByContaining(String search, Pageable paging);
}
