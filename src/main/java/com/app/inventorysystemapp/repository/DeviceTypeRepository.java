package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.DeviceType;
import com.app.inventorysystemapp.model.interfaces.IDeviceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceTypeRepository extends JpaRepository<DeviceType, Long> {

  @Query("Select " +
    "dt.id as deviceTypeId, " +
    "dt.name as deviceTypeName, " +
    "count(dt) as deviceTypeCount " +
    "from Device d " +
    "inner join d.model.type dt " +
    "group by dt.id")
  Page<IDeviceType> findAllDeviceTypesWithCount(Pageable page);

  @Query("Select " +
    "dt.id as deviceTypeId, " +
    "dt.name as deviceTypeName, " +
    "count(dt) as deviceTypeCount " +
    "from Device d " +
    "inner join d.model.type dt " +
    "group by dt.id " +
    "having dt.id like ?1")
  IDeviceType findByIdWithCount(long id);

  @Query("Select " +
    "dt.id as deviceTypeId, " +
    "dt.name as deviceTypeName, " +
    "count(dt) as deviceTypeCount " +
    "from Device d " +
    "inner join d.model.type dt " +
    "group by dt.id " +
    "having dt.name like concat('%', ?1, '%') " +
    "or count(dt) = ?1")
  Page<IDeviceType> findAllDeviceTypesWithCountByContaining(String search, Pageable page);
}
