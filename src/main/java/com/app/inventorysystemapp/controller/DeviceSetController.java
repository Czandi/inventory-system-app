package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceSetDto;
import com.app.inventorysystemapp.controller.mapper.DeviceSetMapper;
import com.app.inventorysystemapp.model.DeviceSet;
import com.app.inventorysystemapp.service.DeviceSetService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class DeviceSetController {

  private final DeviceSetService deviceSetService;

  public DeviceSetController(DeviceSetService deviceSetService) {
    this.deviceSetService = deviceSetService;
  }

  @GetMapping("/device-sets")
  public Page<DeviceSetDto> getDeviceSets(int page,
                                          int pageSize,
                                          @RequestParam(required = false) String orderBy,
                                          @RequestParam(required = false) String sortType,
                                          @RequestParam( required = false) String search) {
    return DeviceSetMapper.mapToDeviceSetDtos(deviceSetService.getDeviceSets(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/device-sets/all")
  public List<DeviceSet> getAllDeviceSets(){
    return deviceSetService.getAllDeviceSets();
  }

  @PostMapping("/device-sets")
  public DeviceSet insertDeviceSet(@RequestBody DeviceSet deviceSet){
    return deviceSetService.insertDeviceSet(deviceSet);
  }
}
