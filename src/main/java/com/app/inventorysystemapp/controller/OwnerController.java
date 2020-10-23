package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.OwnerDto;
import com.app.inventorysystemapp.controller.mapper.OwnerMapper;
import com.app.inventorysystemapp.model.Owner;
import com.app.inventorysystemapp.service.OwnerService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    return OwnerMapper.mapToOwnerDtos(ownerService.getOwners(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/owners/all")
  public List<Owner> getAllOwners(){
    return ownerService.getAllOwners();
  }

  @PostMapping("/owners")
  public Owner insertOwner(@RequestBody Owner owner){
    return ownerService.insertOwner(owner);
  }
}
