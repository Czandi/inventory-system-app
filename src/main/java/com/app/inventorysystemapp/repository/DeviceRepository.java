package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Device;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {

  @Query("Select d from Device d")
  List<Device> findAllDevices(Pageable page);

}
