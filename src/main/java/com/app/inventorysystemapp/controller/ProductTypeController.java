package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ProductTypeDto;
import com.app.inventorysystemapp.controller.mapper.ProductTypeMapper;
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

  @GetMapping("/product-types")
  public Page<ProductTypeDto> getDeviceTypes(int page,
                                             int pageSize,
                                             @RequestParam(required = false) String orderBy,
                                             @RequestParam(required = false) String sortType,
                                             @RequestParam( required = false) String search) {
    return ProductTypeMapper.mapToProductTypeDtos(productTypeService.getDeviceTypes(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/product-types/{id}")
  public ProductTypeDto getSingleDeviceSet(@PathVariable long id) {
    return ProductTypeMapper.mapToProductTypeDto(productTypeService.getSingleDeviceType(id));
  }

  @GetMapping("/product-types/all")
  public List<ProductType> getAllDeviceTypes(){
    return productTypeService.getAllDeviceTypes();
  }

  @PostMapping("/product-types")
  public ProductType insertDeviceType(@RequestBody ProductType productType){
    return productTypeService.insertDeviceType(productType);
  }

  @PutMapping("/product-types/{id}")
  public ResponseEntity<ProductType> updateDeviceType(@PathVariable(value = "id") long id, @RequestBody String name){
    return productTypeService.updateDeviceType(id, name);
  }
}
