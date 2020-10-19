package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.service.ModelService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ModelController {

  private final ModelService modelService;

  public ModelController(ModelService modelService) {
    this.modelService = modelService;
  }

  @GetMapping("/models")
  public Page<ModelDto> getModels(int page,
                               int pageSize,
                               @RequestParam(required = false) String orderBy,
                               @RequestParam(required = false) String sortType,
                               @RequestParam(required = false) String search) {
    int pageNumber = page > 0 ? page : 1;
    return ModelDtoMapper.mapToModelDtos(modelService.getModels(pageNumber-1, pageSize, orderBy, sortType, search));
  }

//  @GetMapping("/models/count/{id}")
//  public List<Integer> getModels(@PathVariable long id, @RequestParam(required = false) int page) {
//    int pageNumber = page > 0 ? page : 1;
//    return modelService.getCountedModels(id, pageNumber-1);
//  }
}
