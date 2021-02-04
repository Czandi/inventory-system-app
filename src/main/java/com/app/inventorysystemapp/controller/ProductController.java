package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeletedProductDto;
import com.app.inventorysystemapp.controller.dto.ProductDto;
import com.app.inventorysystemapp.controller.mapper.ProductMapper;
import com.app.inventorysystemapp.controller.requestModels.DeviceRequest;
import com.app.inventorysystemapp.exception.ResourceNotFoundException;
import com.app.inventorysystemapp.model.Product;
import com.app.inventorysystemapp.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping("/products")
  public Page<ProductDto> getDevices(@RequestParam(required = false) int page,
                                     @RequestParam(required = false) int pageSize,
                                     @RequestParam(required = false) String orderBy,
                                     @RequestParam(required = false) String sortType,
                                     @RequestParam(required = false) String search) {
    return ProductMapper.mapToProductDtos(productService.getDevices(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/products/all")
  public List<ProductDto> getAllDevices() {
    return productService.getAllDevices();
  }

  @GetMapping("/products/deleted")
  public Page<DeletedProductDto> getDeletedDevices(int page,
                                                   int pageSize,
                                                   @RequestParam(required = false) String orderBy,
                                                   @RequestParam(required = false) String sortType,
                                                   @RequestParam(required = false) String search) {
    return ProductMapper.mapToDeletedProductDtos(productService.getDeletedDevices(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/products/{id}")
  public Product getSingleDevice(@PathVariable long id) throws ResourceNotFoundException {
    return productService.getSingleDevice(id);
  }

  @GetMapping("/products/barcode/{barcode}")
  public ProductDto getDeviceByBarcode(@PathVariable long barcode) {
    return ProductMapper.mapToProductDto(productService.findByBarcode(barcode));
  }

  @GetMapping("/products/all/barcodes")
  public List<Long> getAllBarcodes() {
    return productService.getAllBarcodes();
  }

  @GetMapping("/products/count/models")
  public Page<Product> countModels(@RequestParam(required = false) int page) {
    int pageNumber = page > 0 ? page : 1;
    return productService.getCountedModels(pageNumber - 1);
  }

  @PostMapping("/products")
  public Product insertDevice(@RequestBody DeviceRequest device) {
    return productService.insertDevice(device);
  }

  @PutMapping("/products/{id}")
  public Product updateDevice(@PathVariable(value = "id") Long id, @RequestBody DeviceRequest details) throws ResourceNotFoundException {
    return productService.updateDevice(id, details);
  }

  @DeleteMapping("/products/{id}")
  public DeletedProductDto deleteDevice(@PathVariable(value = "id") Long id) {
    return ProductMapper.mapToDeletedProductDto(productService.deleteDevice(id));
  }

}
