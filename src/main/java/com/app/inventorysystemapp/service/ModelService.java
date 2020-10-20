package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.interfaces.IModel;
import com.app.inventorysystemapp.repository.ModelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ModelService {

  private final ModelRepository modelRepository;

  public ModelService(ModelRepository modelRepository) {
    this.modelRepository = modelRepository;
  }

  public Page<IModel> getModels(int page, int pageSize, String orderBy, String sortType, String search){
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String order = orderBy;

      switch(orderBy){
        case "name":
          order = "modelName";
          break;
        case "type":
          order = "typeName";
          break;
        case "count":
          order = "modelCount";
          break;
      }

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(order).descending());
      }else{
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(order));
      }

    }else{
      paging = PageRequest.of(pageNumber-1, pageSize);
    }

    if(search == null) {
      return modelRepository.findAllModelsWithCount(paging);
    }else{
      return modelRepository.findAllModelsWithCountByContaining(search, paging);
    }
  }

}
