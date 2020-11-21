package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.controller.requestModels.DeviceRequest;
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
import java.util.List;
import java.util.Map;

@Service
public class DeviceService {

  private final DeviceRepository deviceRepository;
  private final DeviceSetService deviceSetService;
  private final DeviceTypeService deviceTypeService;
  private final ModelService modelService;
  private final OwnerService ownerService;
  private final RoomService roomService;
  private final HistoryService historyService;

  private final String MARK = "US";

  public DeviceService(DeviceRepository deviceRepository,
                       DeviceSetService deviceSetService,
                       DeviceTypeService deviceTypeService,
                       ModelService modelService,
                       OwnerService ownerService,
                       RoomService roomService, HistoryService historyService) {
    this.deviceRepository = deviceRepository;
    this.deviceSetService = deviceSetService;
    this.deviceTypeService = deviceTypeService;
    this.modelService = modelService;
    this.ownerService = ownerService;
    this.roomService = roomService;
    this.historyService = historyService;
  }

  public Page<Device> getDevices(int page,
                                 int pageSize,
                                 String orderBy,
                                 String sortType,
                                 String search) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String orderValue = orderBy;

      switch(orderBy){
        case "type":
          orderValue = "model." + orderBy;
          break;
      }

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

       if(type.equals("desc")){
         paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(orderValue).descending());
       }else{
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(orderValue));
       }

    }else{
      paging = PageRequest.of(pageNumber-1, pageSize);
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

  public Device insertDevice(DeviceRequest device) {
    Room room = roomService.findRoomById(device.getIdRoom());
    Model model = modelService.findModelById(device.getIdModel());
    Owner owner = ownerService.findOwnerById(device.getIdOwner());
    DeviceSet deviceSet = deviceSetService.findDeviceSetById(device.getIdDeviceSet());
    String serialNumber = device.getSerialNumber();
    String comment = "";
    if(device.getComment() != null){
      comment = device.getComment();
    }

    Device newDevice = new Device(serialNumber, room, model, owner, deviceSet, comment);

    System.out.println("Id before: " + newDevice.getId());

    newDevice = deviceRepository.save(newDevice);

    System.out.println("Id after: " + newDevice.getId());

    newDevice.generateBarCode();

    newDevice = deviceRepository.save(newDevice);

    return newDevice;
  }

  public ResponseEntity<Device> updateDevice(long id, DeviceRequest details) throws ResourceNotFoundException {
    Room room = roomService.findRoomById(details.getIdRoom());
    Model model = modelService.findModelById(details.getIdModel());
    Owner owner = ownerService.findOwnerById(details.getIdOwner());
    DeviceSet deviceSet = deviceSetService.findDeviceSetById(details.getIdDeviceSet());
    String serialNumber = details.getSerialNumber();
    String comment = details.getComment();
    Device device = this.getSingleDevice(id);

    System.out.println("Old serialnumber: " + device.getSerialNumber());
    System.out.println("New serialnumber: " + serialNumber);

    if(device.getRoom() != room){
      historyService.insertHistory("device", device.getId(), "room", device.getRoom().getName(), room.getName());
    }

    if(device.getModel() != model){
      historyService.insertHistory("device", device.getId(), "model", device.getModel().getName(), model.getName());
    }

    if(device.getOwner() != owner){
      historyService.insertHistory("device", device.getId(), "owner", device.getOwner().getName(), owner.getName());
    }

    if(device.getDeviceSet() != deviceSet){
      historyService.insertHistory("device", device.getId(), "device_set", device.getDeviceSet().getName(), deviceSet.getName());
    }

    if(!device.getSerialNumber().equals(serialNumber)){
      historyService.insertHistory("device", device.getId(), "serial_number", device.getSerialNumber(), serialNumber);
    }

    device.setSerialNumber(serialNumber);
    device.setRoom(room);
    device.setDeviceSet(deviceSet);
    device.setModel(model);
    device.setOwner(owner);
    device.setComments(comment);
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

  public List<Long> getAllBarcodes() {
    return deviceRepository.getAllBarcodes();
  }

  public Device findByBarcode(Long barcode) {
    return deviceRepository.findByBarCode(barcode);
  }
}
