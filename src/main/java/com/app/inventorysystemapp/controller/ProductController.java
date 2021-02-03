package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeletedDeviceDto;
import com.app.inventorysystemapp.controller.dto.DeviceDto;
import com.app.inventorysystemapp.controller.mapper.DeviceMapper;
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
  public Page<DeviceDto> getDevices(@RequestParam(required = false) int page,
                                    @RequestParam(required = false) int pageSize,
                                    @RequestParam(required = false) String orderBy,
                                    @RequestParam(required = false) String sortType,
                                    @RequestParam(required = false) String search) {
    return DeviceMapper.mapToDeviceDtos(productService.getDevices(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/products/all")
  public List<DeviceDto> getAllDevices() {
    return productService.getAllDevices();
  }

  @GetMapping("/products/deleted")
  public Page<DeletedDeviceDto> getDeletedDevices(int page,
                                                  int pageSize,
                                                  @RequestParam(required = false) String orderBy,
                                                  @RequestParam(required = false) String sortType,
                                                  @RequestParam(required = false) String search) {
    return DeviceMapper.mapToDeletedDeviceDtos(productService.getDeletedDevices(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/products/{id}")
  public Product getSingleDevice(@PathVariable long id) throws ResourceNotFoundException {
    return productService.getSingleDevice(id);
  }

  @GetMapping("/products/barcode/{barcode}")
  public DeviceDto getDeviceByBarcode(@PathVariable long barcode) {
    return DeviceMapper.mapToDeviceDto(productService.findByBarcode(barcode));
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
  public DeletedDeviceDto deleteDevice(@PathVariable(value = "id") Long id) {
    return DeviceMapper.mapToDeletedDeviceDto(productService.deleteDevice(id));
  }

}
