package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.service.ModelService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ModelController {

  private final ModelService modelService;

  public ModelController(ModelService modelService) {
    this.modelService = modelService;
  }

  @GetMapping("/models")
  public Page<Model> getModels(@RequestParam(required = false) Integer page,
                               @RequestParam(required = false) String orderBy,
                               @RequestParam(required = false) String sortType,
                               @RequestParam(required = false) String search){
    int pageNumber = page > 0 ? page : 1;
    return modelService.getModels(pageNumber-1, orderBy, sortType, search);
  }
//
//  @GetMapping("/models/counted")
//  public Page<Model> getCountedModels(@RequestParam(required = false) int page,
//                                         @RequestParam(required = false) String orderBy,
//                                         @RequestParam(required = false) String sortType,
//                                         @RequestParam(required = false) String search){
//    int pageNumber = page > 0 ? page : 1;
//    return modelService.getCountedModels(pageNumber-1, orderBy, sortType, search);
//  }
}
