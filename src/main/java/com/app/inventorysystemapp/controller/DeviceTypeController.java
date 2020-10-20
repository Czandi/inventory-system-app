package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceTypeDto;
import com.app.inventorysystemapp.controller.mapper.DeviceTypeDtoMapper;
import com.app.inventorysystemapp.service.DeviceTypeService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    return DeviceTypeDtoMapper.mapToDeviceTypeDtos(deviceTypeService.getDeviceTypes(page, pageSize, orderBy, sortType, search));
  }
}
