package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceSetDto;
import com.app.inventorysystemapp.controller.mapper.DeviceSetDtoMapper;
import com.app.inventorysystemapp.service.DeviceSetService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    return DeviceSetDtoMapper.mapToDeviceSetDtos(deviceSetService.getDeviceSets(page, pageSize, orderBy, sortType, search));
  }
}
