package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ProductDto;
import com.app.inventorysystemapp.controller.mapper.ProductMapper;
import com.app.inventorysystemapp.controller.requestModels.ProductRequest;
import com.app.inventorysystemapp.exception.ResourceNotFoundException;
import com.app.inventorysystemapp.model.DeletedProduct;
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
  public Page<ProductDto> getProducts(@RequestParam(required = false) int page,
                                      @RequestParam(required = false) int pageSize,
                                      @RequestParam(required = false) String orderBy,
                                      @RequestParam(required = false) String sortType,
                                      @RequestParam(required = false) String search) {
    return ProductMapper.mapToProductDtos(productService.getProducts(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/products/all")
  public List<ProductDto> getAllProducts(@RequestParam(required = false) String search) {
    return productService.getAllProducts(search);
  }

  @GetMapping("/products/deleted")
  public Page<DeletedProduct> getDeletedProducts(int page,
                                                    int pageSize,
                                                    @RequestParam(required = false) String orderBy,
                                                    @RequestParam(required = false) String sortType,
                                                    @RequestParam(required = false) String search) {
    return productService.getDeletedProducts(page, pageSize, orderBy, sortType, search);
  }

  @GetMapping("/products/{id}")
  public Product getSingleProduct(@PathVariable long id) throws ResourceNotFoundException {
    return productService.getSingleProduct(id);
  }

  @GetMapping("/products/barcode/{barcode}")
  public ProductDto getProductByBarcode(@PathVariable long barcode) {
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
  public Product insertProduct(@RequestBody ProductRequest device) {
    return productService.insertProduct(device);
  }

  @PutMapping("/products/{id}")
  public Product updateProduct(@PathVariable(value = "id") Long id, @RequestBody ProductRequest details) throws ResourceNotFoundException {
    return productService.updateProduct(id, details);
  }

  @DeleteMapping("/products/{id}")
  public DeletedProduct deleteDevice(@PathVariable(value = "id") Long id) {
    return productService.deleteDevice(id);
  }

  @DeleteMapping("/products/deleted/empty")
  public Boolean emptyDeleted() { return productService.emptyDeleted(); }
}
