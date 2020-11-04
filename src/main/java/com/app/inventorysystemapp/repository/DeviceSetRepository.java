package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.DeviceSet;
import com.app.inventorysystemapp.model.interfaces.IDeviceSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceSetRepository extends JpaRepository<DeviceSet, Long> {

  @Query("Select " +
    "ds.id as deviceSetId, " +
    "ds.name as deviceSetName, " +
    "count(ds.name) as itemsCount " +
    "from Device d " +
    "inner join d.deviceSet ds " +
    "group by ds.id")
  Page<IDeviceSet> findAllDevicesSetWithCount(Pageable page);

  @Query("Select " +
    "ds.id as deviceSetId, " +
    "ds.name as deviceSetName, " +
    "count(ds.id) as itemsCount " +
    "from Device d " +
    "inner join d.deviceSet ds " +
    "group by ds.id " +
    "having ds.id like ?1")
  IDeviceSet findByIdWithCount(long id);

  @Query("Select " +
    "ds.id as deviceSetId, " +
    "ds.name as deviceSetName, " +
    "count(ds.id) as itemsCount " +
    "from Device d " +
    "inner join d.deviceSet ds " +
    "group by ds.id " +
    "having ds.name like concat('%', ?1, '%') " +
    "or count(ds.name) = ?1")
  Page<IDeviceSet> findAllDevicesSetWithCountByContaining(String search, Pageable page);
}
