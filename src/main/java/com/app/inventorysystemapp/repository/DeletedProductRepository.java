package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.DeletedProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeletedProductRepository extends JpaRepository<DeletedProduct, Long> {

  @Query("Select d from DeletedProduct d " +
    "inner join d.owner ow " +
    "inner join d.model md " +
    "inner join d.room rm " +
    "inner join d.productSet ps " +
    "where ow.name like %?1% " +
    "or md.name like %?1% " +
    "or rm.name like %?1% " +
    "or md.type.name like %?1% " +
    "or d.barCode like %?1% " +
    "or d.serialNumber like %?1% " +
    "or d.deletedDate like %?1%")
  Page<DeletedProduct> findByContaining(String search, Pageable paging);

}
