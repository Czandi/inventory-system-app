package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceSetDto;
import com.app.inventorysystemapp.controller.mapper.DeviceSetMapper;
import com.app.inventorysystemapp.model.DeviceSet;
import com.app.inventorysystemapp.service.DeviceService;
import com.app.inventorysystemapp.service.DeviceSetService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class DeviceSetController {

  private final DeviceSetService deviceSetService;
  private final DeviceService deviceService;

  public DeviceSetController(DeviceSetService deviceSetService, DeviceService deviceService) {
    this.deviceSetService = deviceSetService;
    this.deviceService = deviceService;
  }

  @GetMapping("/device-sets")
  public Page<DeviceSetDto> getDeviceSets(int page,
                                          int pageSize,
                                          @RequestParam(required = false) String orderBy,
                                          @RequestParam(required = false) String sortType,
                                          @RequestParam( required = false) String search) {
    return DeviceSetMapper.mapToDeviceSetDtos(deviceSetService.getDeviceSets(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/device-sets/{id}")
  public DeviceSetDto getSingleDeviceSet(@PathVariable long id) {
    return DeviceSetMapper.mapToDeviceSetDto(deviceSetService.getSingleDeviceSet(id));
  }

  @GetMapping("/device-sets/all")
  public List<DeviceSet> getAllDeviceSets(){
    return deviceSetService.getAllDeviceSets();
  }

  @PostMapping("/device-sets")
  public DeviceSet insertDeviceSet(@RequestBody DeviceSet deviceSet){
    return deviceSetService.insertDeviceSet(deviceSet);
  }

  @PutMapping("/device-sets/{id}")
  public ResponseEntity<DeviceSet> updateDeviceSet(@PathVariable(value = "id") long id, @RequestBody String name) {
    return deviceSetService.updateDeviceSet(id, name);
  }

  @DeleteMapping("/device-sets/{id}")
  public Boolean deleteDeviceSet(@PathVariable(value = "id") Long id) {
    return deviceService.deleteDeviceSet(id);
  }
}
