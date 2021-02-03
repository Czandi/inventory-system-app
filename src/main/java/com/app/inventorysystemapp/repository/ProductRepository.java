package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  @Query("Select p from Product p " +
    "inner join p.owner ow " +
    "inner join p.model md " +
    "inner join p.room rm " +
    "inner join p.productSet ps " +
    "where ow.name like %?1% " +
    "or md.name like %?1% " +
    "or rm.name like %?1% " +
    "or md.type.name like %?1% " +
    "or ps.name like %?1% " +
    "or p.barCode like %?1% " +
    "or p.serialNumber like %?1%")
  Page<Product> findByContaining(String contain, Pageable page);

  @Query("Select distinct d.model from Product d " +
    "where d.model.name like '%xiaomi%'")
  Page<Product> getCountedModels(Pageable page);

  @Query("Select d.barCode from Product d")
  List<Long> getAllBarcodes();

  Product findByBarCode(Long barCode);

  List<Product> findDeviceByRoom(Room room);

  ArrayList<Product> findByModel(Model model);

  List<Product> findByOwner(Owner owner);

  List<Product> findByRoom(Room room);

  List<Product> findByProductSet(ProductSet productSet);
}
