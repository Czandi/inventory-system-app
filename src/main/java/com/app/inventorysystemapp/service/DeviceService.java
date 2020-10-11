package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.exception.ResourceNotFoundException;
import com.app.inventorysystemapp.model.*;
import com.app.inventorysystemapp.repository.DeviceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeviceService {

  private final DeviceRepository deviceRepository;

  public DeviceService(DeviceRepository deviceRepository) {
    this.deviceRepository = deviceRepository;
  }

  public List<Device> getDevices() {
    return deviceRepository.findAll();
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
    device.setSerial_number(details.getSerial_number());
    device.setRoom(details.getRoom());
    device.setDevicesSet(details.getDevicesSet());
    device.setModel(details.getModel());
    device.setOwner(details.getOwner());
    device.setInventory_number(details.getInventory_number());
    device.setComments(details.getComments());
    device.setBar_code(details.getBar_code());
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
