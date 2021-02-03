package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceTypeDto;
import com.app.inventorysystemapp.controller.mapper.DeviceTypeMapper;
import com.app.inventorysystemapp.model.ProductType;
import com.app.inventorysystemapp.service.ProductTypeService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductTypeController {

  private final ProductTypeService productTypeService;

  public ProductTypeController(ProductTypeService productTypeService) {
    this.productTypeService = productTypeService;
  }

  @GetMapping("/product")
  public Page<DeviceTypeDto> getDeviceTypes(int page,
                                            int pageSize,
                                            @RequestParam(required = false) String orderBy,
                                            @RequestParam(required = false) String sortType,
                                            @RequestParam( required = false) String search) {
    return DeviceTypeMapper.mapToDeviceTypeDtos(productTypeService.getDeviceTypes(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/product/{id}")
  public DeviceTypeDto getSingleDeviceSet(@PathVariable long id) {
    return DeviceTypeMapper.mapToDeviceTypeDto(productTypeService.getSingleDeviceType(id));
  }

  @GetMapping("/product/all")
  public List<ProductType> getAllDeviceTypes(){
    return productTypeService.getAllDeviceTypes();
  }

  @PostMapping("/product")
  public ProductType insertDeviceType(@RequestBody ProductType productType){
    return productTypeService.insertDeviceType(productType);
  }

  @PutMapping("/product/{id}")
  public ResponseEntity<ProductType> updateDeviceType(@PathVariable(value = "id") long id, @RequestBody String name){
    return productTypeService.updateDeviceType(id, name);
  }
}
