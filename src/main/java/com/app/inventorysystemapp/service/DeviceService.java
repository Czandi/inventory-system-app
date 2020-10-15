package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.exception.ResourceNotFoundException;
import com.app.inventorysystemapp.model.*;
import com.app.inventorysystemapp.repository.DeviceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DeviceService {

  public static final int PAGE_SIZE = 10;
  private final DeviceRepository deviceRepository;

  public DeviceService(DeviceRepository deviceRepository) {
    this.deviceRepository = deviceRepository;
  }

  public Page<Device> getDevices(int page, String orderBy, String sortType, String search) {
    Pageable paging;
    if(orderBy != null){
       if(sortType != null && sortType.equals("desc")){
         paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy).descending());
       }else{
        paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy));
       }
    }else{
      paging = PageRequest.of(page, PAGE_SIZE);
    }

    if(search == null){
      System.out.println("Nie ma kodu");
      return deviceRepository.findAllDevices(paging);
    }else{
      System.out.println("Jest kod");
      return deviceRepository.findByContaining(search, paging);
    }

  }

  public Device getSingleDevice(long id) throws ResourceNotFoundException {
    return deviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Device not found for id: " + id));
  }

  public Device insertDevice(Device device) {
    deviceRepository.save(device);
    return device;
  }

  public ResponseEntity<Device> updateDevice(long id, Device details) throws ResourceNotFoundException {
    Device device = this.getSingleDevice(id);
    device.setSerialNumber(details.getSerialNumber());
    device.setRoom(details.getRoom());
    device.setDeviceSet(details.getDeviceSet());
    device.setModel(details.getModel());
    device.setOwner(details.getOwner());
    device.setInventoryNumber(details.getInventoryNumber());
    device.setComments(details.getComments());
    device.setBarCode(details.getBarCode());
    device.setType(details.getType());
    final Device updatedDevice = deviceRepository.save(device);
    return ResponseEntity.ok(updatedDevice);
  }

  public Map<String, Boolean> deleteDevice(long id) throws ResourceNotFoundException {
    Device device = this.getSingleDevice(id);
    deviceRepository.delete(device);
    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", Boolean.TRUE);
    return response;
  }
}
