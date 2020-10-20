package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.controller.mapper.ModelDtoMapper;
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
    return ModelDtoMapper.mapToModelDtos(modelService.getModels(page, pageSize, orderBy, sortType, search));
  }
}
