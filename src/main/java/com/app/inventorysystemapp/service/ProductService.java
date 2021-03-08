package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.controller.dto.ProductDto;
import com.app.inventorysystemapp.controller.mapper.ProductMapper;
import com.app.inventorysystemapp.controller.requestModels.ProductRequest;
import com.app.inventorysystemapp.exception.ResourceNotFoundException;
import com.app.inventorysystemapp.model.*;
import com.app.inventorysystemapp.repository.DeletedProductRepository;
import com.app.inventorysystemapp.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService implements com.app.inventorysystemapp.service.Service {

  private final ProductRepository productRepository;
  private final DeletedProductRepository deletedProductRepository;

  private final ProductSetService productSetService;
  private final ProductTypeService productTypeService;
  private final ModelService modelService;
  private final OwnerService ownerService;
  private final RoomService roomService;
  private final HistoryService historyService;

  private final String MARK = "US";

  public ProductService(ProductRepository productRepository,
                        DeletedProductRepository deletedProductRepository, ProductSetService productSetService,
                        ProductTypeService productTypeService,
                        ModelService modelService,
                        OwnerService ownerService,
                        RoomService roomService, HistoryService historyService) {
    this.productRepository = productRepository;
    this.deletedProductRepository = deletedProductRepository;
    this.productSetService = productSetService;
    this.productTypeService = productTypeService;
    this.modelService = modelService;
    this.ownerService = ownerService;
    this.roomService = roomService;
    this.historyService = historyService;
  }

  public Page<Product> getProducts(int page,
                                   int pageSize,
                                   String orderBy,
                                   String sortType,
                                   String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if (search == null || search == "") {
      return productRepository.findAll(paging);
    } else {
      return productRepository.findByContaining(search, paging);
    }
  }

  public List<ProductDto> getAllProducts(String search) {
    if(search == null) {
      return productRepository.findAll().stream().map(product -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());
    }else {
      return productRepository.findAllByContaining(search).stream().map(product -> ProductMapper.mapToProductDto(product)).collect(Collectors.toList());
    }
  }

  public Page<DeletedProduct> getDeletedProducts(int page, int pageSize, String orderBy, String sortType, String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    return deletedProductRepository.findAll(paging);

//    if (search == null) {
//      return deletedProductRepository.findAll(paging);
//    } else {
//      return deletedProductRepository.findByContaining(search, paging);
//    }
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch (orderBy) {
      case "type":
        return "model." + orderBy;
      case "setNumber":
        return "deviceSet";
      case "date":
        return "deletedDate";
      default:
        return orderBy;
    }
  }

  public String generateSortValue(String sortType) {
    if (sortType == null) {
      return "desc";
    } else {
      return sortType;
    }
  }

  public Product getSingleProduct(long id) throws ResourceNotFoundException {
    return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Device not found for id: " + id));
  }

  public Page<Product> getCountedModels(int page) {
    Pageable paging = PageRequest.of(page, 10);
    return productRepository.getCountedModels(paging);
  }

  public Product insertProduct(ProductRequest device) {

    Room room = roomService.findById(device.getIdRoom());
    Model model = modelService.findModelById(device.getIdModel());
    Owner owner = ownerService.findOwnerById(device.getIdOwner());
    ProductSet productSet = productSetService.findDeviceSetById(device.getIdDeviceSet());
    String serialNumber = device.getSerialNumber();
    String inventoryNumber = device.getInventoryNumber();
    String comment = "";

    if (device.getComment() != null) {
      comment = device.getComment();
    }

    Product newProduct = new Product(serialNumber, room, model, owner, productSet, inventoryNumber, comment);
    newProduct = productRepository.save(newProduct);
    newProduct.generateBarCode();
    newProduct = productRepository.save(newProduct);

    return newProduct;
  }

  public Product updateProduct(long id, ProductRequest details) throws ResourceNotFoundException {
    Room room = roomService.findById(details.getIdRoom());
    Model model = modelService.findModelById(details.getIdModel());
    Owner owner = ownerService.findOwnerById(details.getIdOwner());
    ProductSet productSet = productSetService.findDeviceSetById(details.getIdDeviceSet());
    String serialNumber = details.getSerialNumber();
    String inventoryNumber = details.getInventoryNumber();
    String comment = details.getComment();
    Product product = this.getSingleProduct(id);

    if (product.getRoom() != room) {
      historyService.insertHistory("device", product.getId(), "room", product.getRoom().getName(), room.getName());
    }

    if (product.getModel() != model) {
      historyService.insertHistory("device", product.getId(), "model", product.getModel().getName(), model.getName());
    }

    if (product.getOwner() != owner) {
      historyService.insertHistory("device", product.getId(), "owner", product.getOwner().getName(), owner.getName());
    }

    if (product.getProductSet() != productSet) {
      historyService.insertHistory("device", product.getId(), "device_set", product.getProductSet().getName(), productSet.getName());
    }

    if (!product.getSerialNumber().equals(serialNumber)) {
      historyService.insertHistory("device", product.getId(), "serial_number", product.getSerialNumber(), serialNumber);
    }

    if(!product.getInventoryNumber().equals(inventoryNumber)) {
      historyService.insertHistory("device", product.getId(), "inventory_number", product.getInventoryNumber(), inventoryNumber);
    }

    product.setSerialNumber(serialNumber);
    product.setRoom(room);
    product.setProductSet(productSet);
    product.setModel(model);
    product.setOwner(owner);
    product.setInventoryNumber(inventoryNumber);
    product.setComments(comment);
    final Product updatedProduct = productRepository.save(product);
    return updatedProduct;
  }

  public DeletedProduct deleteDevice(long id) {
    Product product = productRepository.findById(id).orElseThrow();
    DeletedProduct deletedProduct = DeletedProduct.builder()
      .productSet(product.getProductSet().getName())
      .barCode(product.getBarCode())
      .comments(product.getComments())
      .createdDate(product.getCreatedDate())
      .model(product.getModel().getName())
      .type(product.getModel().getType().getName())
      .owner(product.getOwner().getName())
      .room(product.getRoom().getName())
      .serialNumber(product.getSerialNumber())
      .build();
    productRepository.delete(product);
    return deletedProductRepository.save(deletedProduct);

  }

  public List<Long> getAllBarcodes() {
    return productRepository.getAllBarcodes();
  }

  public Product findByBarcode(Long barcode) {
    return productRepository.findByBarCode(barcode);
  }

  public List<Product> getDevicesFromRoom(Room room) {
    return productRepository.findDeviceByRoom(room);
  }

  public List<Product> getDevicesFromRoom(long id) {
    Room room = roomService.findById(id);
    return getDevicesFromRoom(room);
  }

  public Product findById(Long id) {
    return productRepository.findById(id).orElseThrow();
  }

  public Boolean deleteModel(Long id) {
    if(id != 0) {
      setModelToNull(id);
      modelService.deleteModel(id);
      return true;
    }

    return false;
  }

  private void setModelToNull(Long id) {
    Model model = modelService.findModelById(id);
    List<Product> products = productRepository.findByModel(model);
    Model nullModel = modelService.findModelById(0);

    for(int i = 0; i < products.size(); i++) {
      Product product = products.get(i);
      product.setModel(nullModel);
      productRepository.save(product);
    }

  }

  public Boolean deleteOwner(Long id) {
    if(id != 0) {
      setOwnerToNull(id);
      ownerService.deleteOwner(id);
      return true;
    }

    return false;
  }

  private void setOwnerToNull(Long id) {
    Owner owner = ownerService.findOwnerById(id);
    List<Product> products = productRepository.findByOwner(owner);
    Owner nullOwner = ownerService.findOwnerById(0);

    for(int i = 0; i < products.size(); i++) {
      Product product = products.get(i);
      product.setOwner(nullOwner);
      productRepository.save(product);
    }
  }

  public Boolean deleteRoom(long id) {
    if(id != 0) {
      setRoomToNull(id);
      roomService.deleteRoom(id);
      return true;
    }

    return false;
  }

  private void setRoomToNull(Long id) {
    Room room = roomService.findById(id);
    List<Product> products = productRepository.findByRoom(room);
    Room nullRoom = roomService.findById(0);

    for(int i = 0; i < products.size(); i++) {
      Product product = products.get(i);
      product.setRoom(nullRoom);
      productRepository.save(product);
    }
  }

  public Boolean deleteDeviceSet(Long id) {
    if(id != 0) {
      setDeviceSetToNull(id);
      productSetService.deleteDeviceSet(id);
      return true;
    }

    return false;
  }

  public Boolean deleteProductType(long id) {
    if(id != 0) {
      setProductTypeToNull(id);
      productTypeService.deleteProductType(id);
      return true;
    }
    return false;
  }

  private void setProductTypeToNull(Long id) {
    ProductType productType = productTypeService.findById(id);
    List<Model> models = modelService.findByProductType(productType);
    ProductType nullType = productTypeService.findById(0);

    for(int i = 0; i < models.size(); i++){
      Model model = models.get(i);
      model.setType(nullType);
      modelService.save(model);
    }
  }

  private void setDeviceSetToNull(Long id) {
    ProductSet productSet = productSetService.findById(id);
    List<Product> products = productRepository.findByProductSet(productSet);
    ProductSet nullProductSet = productSetService.findById(0);

    for(int i = 0; i < products.size(); i++) {
      Product product = products.get(i);
      product.setProductSet(nullProductSet);
      productRepository.save(product);
    }
  }
}
