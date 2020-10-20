package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.OwnerDto;
import com.app.inventorysystemapp.controller.mapper.OwnerDtoMapper;
import com.app.inventorysystemapp.service.OwnerService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OwnerController {

  private final OwnerService ownerService;

  public OwnerController(OwnerService ownerService) {
    this.ownerService = ownerService;
  }

  @GetMapping("/owners")
  public Page<OwnerDto> getOwners(int page,
                                  int pageSize,
                                  @RequestParam(required = false) String orderBy,
                                  @RequestParam(required = false) String sortType,
                                  @RequestParam(required = false) String search) {
    return OwnerDtoMapper.mapToOwnerDtos(ownerService.getOwners(page, pageSize, orderBy, sortType, search));
  }
}
