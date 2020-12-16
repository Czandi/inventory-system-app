package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.DeletedDevice;
import com.app.inventorysystemapp.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeletedDeviceRepository extends JpaRepository<DeletedDevice, Long> {

  @Query("Select d from DeletedDevice d " +
    "inner join d.owner ow " +
    "inner join d.model md " +
    "inner join d.room rm " +
    "inner join d.deviceSet ds " +
    "where ow.name like %?1% " +
    "or md.name like %?1% " +
    "or rm.name like %?1% " +
    "or md.type.name like %?1% " +
    "or d.barCode like %?1% " +
    "or d.serialNumber like %?1% " +
    "or d.deletedDate like %?1%")
  Page<DeletedDevice> findByContaining(String search, Pageable paging);

}
