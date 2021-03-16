package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.ProductType;
import com.app.inventorysystemapp.model.interfaces.IProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {

  @Query("Select " +
    "dt.id as deviceTypeId, " +
    "dt.name as deviceTypeName, " +
    "count(dt) as deviceTypeCount " +
    "from Product d " +
    "inner join d.model.type dt " +
    "group by dt.id")
  Page<IProductType> findAllDeviceTypesWithCount(Pageable page);

  @Query("Select " +
    "dt.id as deviceTypeId, " +
    "dt.name as deviceTypeName, " +
    "count(dt) as deviceTypeCount " +
    "from Product d " +
    "inner join d.model.type dt " +
    "group by dt.id " +
    "having dt.id like ?1")
  IProductType findByIdWithCount(long id);

//  @Query("Select " +
//    "pt.id as deviceTypeId, " +
//    "pt.name as deviceTypeName, " +
//    "count(p) as deviceTypeCount " +
//    "from ProductType pt " +
//    "left outer join Product p on p.model.type=pt.id " +
//    "group by pt.id")
//  Page<IProductType> findAllDeviceTypesWithCount(Pageable page);
//
//  @Query("Select " +
//    "pt.id as deviceTypeId, " +
//    "pt.name as deviceTypeName, " +
//    "count(p) as deviceTypeCount " +
//    "from ProductType pt " +
//    "left outer join Product p on p.model.type=pt.id " +
//    "group by pt.id " +
//    "having pt.id like ?1")
//  IProductType findByIdWithCount(long id);

  @Query("Select " +
    "dt.id as deviceTypeId, " +
    "dt.name as deviceTypeName, " +
    "count(dt) as deviceTypeCount " +
    "from Product d " +
    "inner join d.model.type dt " +
    "group by dt.id " +
    "having dt.name like concat('%', ?1, '%') " +
    "or count(dt) = ?1")
  Page<IProductType> findAllDeviceTypesWithCountByContaining(String search, Pageable page);
}
