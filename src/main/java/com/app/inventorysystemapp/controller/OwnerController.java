package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.OwnerDto;
import com.app.inventorysystemapp.controller.dto.ProductDto;
import com.app.inventorysystemapp.controller.mapper.ProductMapper;
import com.app.inventorysystemapp.controller.mapper.OwnerMapper;
import com.app.inventorysystemapp.model.Owner;
import com.app.inventorysystemapp.service.ProductService;
import com.app.inventorysystemapp.service.OwnerService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OwnerController {

  private final OwnerService ownerService;
  private final ProductService productService;

  public OwnerController(OwnerService ownerService, ProductService productService) {
    this.ownerService = ownerService;
    this.productService = productService;
  }

  @GetMapping("/owners")
  public Page<OwnerDto> getOwners(int page,
                                  int pageSize,
                                  @RequestParam(required = false) String orderBy,
                                  @RequestParam(required = false) String sortType,
                                  @RequestParam(required = false) String search) {
    return OwnerMapper.mapToOwnerDtos(ownerService.getOwners(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/owners/{id}")
  public OwnerDto getSingleOwner(@PathVariable long id){
    return OwnerMapper.mapToOwnerDto(ownerService.getSingleOwner(id));
  }

  @GetMapping("/owners/all")
  public List<Owner> getAllOwners(){
    return ownerService.getAllOwners();
  }

  @PostMapping("/owners")
  public Owner insertOwner(@RequestBody Owner owner){
    return ownerService.insertOwner(owner);
  }

  @PutMapping("/owners/{id}")
  public ResponseEntity<Owner> updateOwner(@PathVariable long id, @RequestBody String name){
    return ownerService.updateOwner(id, name);
  }

  @DeleteMapping("/owners/{id}")
  public Boolean deleteOwner(@PathVariable(value = "id") Long id) {
    return productService.deleteOwner(id);
  }

  @GetMapping("/owners/{id}/products")
  public List<ProductDto> getDevicesFromOwner(@PathVariable long id){
    return ProductMapper.mapToProductDtos(productService.getDevicesFromOwner(id));
  }
}
