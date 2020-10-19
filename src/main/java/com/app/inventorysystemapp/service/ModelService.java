package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.controller.ModelDtoMapper;
import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.repository.DeviceRepository;
import com.app.inventorysystemapp.repository.ModelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.TypedQuery;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ModelService {

  private final ModelRepository modelRepository;

  public ModelService(ModelRepository modelRepository) {
    this.modelRepository = modelRepository;
  }

  public Page<Model> getModels(int page, int pageSize, String orderBy, String sortType, String search){
    Pageable paging;

    if(orderBy != null){

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(page, pageSize, Sort.by(orderBy).descending());
      }else{
        paging = PageRequest.of(page, pageSize, Sort.by(orderBy));
      }

    }else{
      paging = PageRequest.of(page, pageSize);
    }

    if(search == null) {
      return modelRepository.findAll(paging);
    }else{
      return modelRepository.findByContaining(search, paging);
    }
  }

  public int getCount(long id){
    return modelRepository.countModelById(id);
  }
//
//  public Page<ModelDto> getCountedModels(int page, String orderBy, String sortType, String search){
//    Pageable paging;
//    if(orderBy != null){
//      if(sortType != null && sortType.equals("desc")){
//        paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy).descending());
//      }else{
//        paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy));
//      }
//    }else{
//      paging = PageRequest.of(page, PAGE_SIZE);
//    }
//
//    List<Model> allModels = modelRepository.findAllModels(paging).getContent();
//    List<Long> ids = allModels.stream().map(model -> getCount(model.getId())).collect(Collectors.toList());
//    ModelDtoMapper.mapToModelDtos(allModels, ids);
//
//  }
}
