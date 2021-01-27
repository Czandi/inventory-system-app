package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.controller.mapper.ModelMapper;
import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.controller.requestModels.ModelRequest;
import com.app.inventorysystemapp.service.DeviceService;
import com.app.inventorysystemapp.service.ModelService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ModelController {

  private final ModelService modelService;
  private final DeviceService deviceService;

  public ModelController(ModelService modelService, DeviceService deviceService) {
    this.modelService = modelService;
    this.deviceService = deviceService;
  }

  @GetMapping("/models")
  public Page<ModelDto> getModels(int page,
                               int pageSize,
                               @RequestParam(required = false) String orderBy,
                               @RequestParam(required = false) String sortType,
                               @RequestParam(required = false) String search) {
    return ModelMapper.mapToModelDtos(modelService.getModels(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/models/{id}")
  public ModelDto getSingleModel(@PathVariable long id) {
    return ModelMapper.mapToModelDto(modelService.getSingleModel(id));
  }

  @GetMapping("/models/all")
  public List<Model> getAllModels(){
    return modelService.getAllModels();
  }

  @PostMapping("/models")
  public Model insertModel(@RequestBody ModelRequest model){
    return modelService.insertModel(model);
  }

  @PutMapping("/models/{id}")
  public ResponseEntity<Model> updateModel(@PathVariable(value = "id") Long id, @RequestBody ModelRequest details) {
    return modelService.updateModel(id, details);
  }

  @DeleteMapping("/models/{id}")
  public Boolean deleteModel(@PathVariable(value = "id") Long id) {
    return deviceService.deleteModel(id);
  }
}
