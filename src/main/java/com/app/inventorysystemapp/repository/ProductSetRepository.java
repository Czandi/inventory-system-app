package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.ProductSet;
import com.app.inventorysystemapp.model.interfaces.IProductSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSetRepository extends JpaRepository<ProductSet, Long> {

//  @Query("Select " +
//    "ps.id as productSetId, " +
//    "ps.name as productSetName, " +
//    "count(ps.name) as itemsCount " +
//    "from Product p " +
//    "inner join p.productSet ps " +
//    "group by ps.id")
//  Page<IProductSet> findAllProductsSetWithCount(Pageable page);
//
//  @Query("Select " +
//    "ps.id as productSetId, " +
//    "ps.name as productSetName, " +
//    "count(ps.id) as itemsCount " +
//    "from Product p " +
//    "inner join p.productSet ps " +
//    "group by ps.id " +
//    "having ps.id like ?1")
//  IProductSet findByIdWithCount(long id);

  @Query("Select " +
    "ps.id as productSetId, " +
    "ps.name as productSetName, " +
    "count(p) as itemsCount " +
    "from ProductSet ps " +
    "left outer join Product p on p.productSet.id=ps.id " +
    "group by ps.id")
  Page<IProductSet> findAllProductsSetWithCount(Pageable page);

  @Query("Select " +
    "ps.id as productSetId, " +
    "ps.name as productSetName, " +
    "count(p) as itemsCount " +
    "from ProductSet ps " +
    "left outer join Product p on p.productSet.id=ps.id " +
    "group by ps.id " +
    "having ps.id like ?1")
  IProductSet findByIdWithCount(long id);


  @Query("Select " +
    "ps.id as productSetId, " +
    "ps.name as productSetName, " +
    "count(ps.id) as itemsCount " +
    "from Product p " +
    "inner join p.productSet ps " +
    "group by ps.id " +
    "having ps.name like concat('%', ?1, '%') " +
    "or count(ps.name) = ?1")
  Page<IProductSet> findAllProductsSetWithCountByContaining(String search, Pageable page);
}
