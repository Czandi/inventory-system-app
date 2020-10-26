package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceTypeDto;
import com.app.inventorysystemapp.controller.mapper.DeviceTypeMapper;
import com.app.inventorysystemapp.model.DeviceType;
import com.app.inventorysystemapp.service.DeviceTypeService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class DeviceTypeController {

  private final DeviceTypeService deviceTypeService;

  public DeviceTypeController(DeviceTypeService deviceTypeService) {
    this.deviceTypeService = deviceTypeService;
  }

  @GetMapping("/device-types")
  public Page<DeviceTypeDto> getDeviceTypes(int page,
                                            int pageSize,
                                            @RequestParam(required = false) String orderBy,
                                            @RequestParam(required = false) String sortType,
                                            @RequestParam( required = false) String search) {
    return DeviceTypeMapper.mapToDeviceTypeDtos(deviceTypeService.getDeviceTypes(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/device-types/all")
  public List<DeviceType> getAllDeviceTypes(){
    return deviceTypeService.getAllDeviceTypes();
  }

  @PostMapping("/device-types")
  public DeviceType insertDeviceType(@RequestBody DeviceType deviceType){
    return deviceTypeService.insertDeviceType(deviceType);
  }
}
