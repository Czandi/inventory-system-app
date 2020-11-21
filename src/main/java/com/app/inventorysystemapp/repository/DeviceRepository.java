package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

  @Query("Select d from Device d " +
    "inner join d.owner ow " +
    "inner join d.model md " +
    "inner join d.room rm " +
    "inner join d.deviceSet ds " +
    "where ow.name like %?1% " +
    "or md.name like %?1% " +
    "or rm.name like %?1% " +
    "or md.type.name like %?1% " +
    "or ds.name like %?1% " +
    "or d.barCode like %?1% " +
    "or d.serialNumber like %?1%")
  Page<Device> findByContaining(String contain, Pageable page);

  @Query("Select distinct d.model from Device d " +
    "where d.model.name like '%xiaomi%'")
  Page<Device> getCountedModels(Pageable page);

  @Query("Select d.barCode from Device d")
  List<Long> getAllBarcodes();

  Device findByBarCode(Long barcode);
}
