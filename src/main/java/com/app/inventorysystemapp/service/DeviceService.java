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

  private final DeviceRepository deviceRepository;

  public DeviceService(DeviceRepository deviceRepository) {
    this.deviceRepository = deviceRepository;
  }

  public Page<Device> getDevices(int page, int pageSize, String orderBy, String sortType, String search) {
    Pageable paging;

    if(orderBy != null){

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

       if(type.equals("desc")){
         paging = PageRequest.of(page, pageSize, Sort.by(orderBy).descending());
       }else{
        paging = PageRequest.of(page, pageSize, Sort.by(orderBy));
       }

    }else{
      paging = PageRequest.of(page, pageSize);
    }

    if(search == null){
      return deviceRepository.findAll(paging);
    }else{
      return deviceRepository.findByContaining(search, paging);
    }
  }

  public Device getSingleDevice(long id) throws ResourceNotFoundException {
    return deviceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Device not found for id: " + id));
  }

  public Page<Device> getCountedModels(int page) {
    Pageable paging = PageRequest.of(page, 10);
    return deviceRepository.getCountedModels(paging);
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
    device.setComments(details.getComments());
    device.setBarCode(details.getBarCode());
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
