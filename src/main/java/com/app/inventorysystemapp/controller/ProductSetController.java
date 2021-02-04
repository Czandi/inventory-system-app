package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ProductSetDto;
import com.app.inventorysystemapp.controller.mapper.ProductSetMapper;
import com.app.inventorysystemapp.model.ProductSet;
import com.app.inventorysystemapp.service.ProductService;
import com.app.inventorysystemapp.service.ProductSetService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductSetController {

  private final ProductSetService productSetService;
  private final ProductService productService;

  public ProductSetController(ProductSetService productSetService, ProductService productService) {
    this.productSetService = productSetService;
    this.productService = productService;
  }

  @GetMapping("/product-sets")
  public Page<ProductSetDto> getProductSets(int page,
                                            int pageSize,
                                            @RequestParam(required = false) String orderBy,
                                            @RequestParam(required = false) String sortType,
                                            @RequestParam( required = false) String search) {
    return ProductSetMapper.mapToProductSetDtos(productSetService.getProductSets(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/product-sets/{id}")
  public ProductSetDto getSingleProductSet(@PathVariable long id) {
    return ProductSetMapper.mapToProductSetDto(productSetService.getSingleDeviceSet(id));
  }

  @GetMapping("/product-sets/all")
  public List<ProductSet> getAllProductSets(){
    return productSetService.getAllDeviceSets();
  }

  @PostMapping("/product-sets")
  public ProductSet insertProductSet(@RequestBody ProductSet productSet){
    return productSetService.insertDeviceSet(productSet);
  }

  @PutMapping("/product-sets/{id}")
  public ResponseEntity<ProductSet> updateProductSet(@PathVariable(value = "id") long id, @RequestBody String name) {
    return productSetService.updateDeviceSet(id, name);
  }

  @DeleteMapping("/device-sets/{id}")
  public Boolean deleteDeviceSet(@PathVariable(value = "id") Long id) {
    return productService.deleteDeviceSet(id);
  }
}
