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
    "ds.id as deviceTypeId, " +
    "ds.name as deviceTypeName, " +
    "count(ds) as deviceTypeCount " +
    "from Device d " +
    "inner join d.deviceSet ds " +
    "group by ds.id")
  Page<IDeviceType> findAllDeviceTypesWithCount(Pageable page);

  @Query("Select " +
    "ds.id as deviceTypeId, " +
    "ds.name as deviceTypeName, " +
    "count(ds) as deviceTypeCount " +
    "from Device d " +
    "inner join d.deviceSet ds " +
    "group by ds.id " +
    "having ds.name like concat('%', ?1, '%') " +
    "or count(ds) = ?1")
  Page<IDeviceType> findAllDeviceTypesWithCountByContaining(String search, Pageable page);

}
