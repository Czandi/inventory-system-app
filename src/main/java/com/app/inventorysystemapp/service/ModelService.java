package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.repository.ModelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ModelService {

  public static final int PAGE_SIZE = 10;
  private final ModelRepository modelRepository;

  public ModelService(ModelRepository modelRepository) {
    this.modelRepository = modelRepository;
  }

  public Page<Model> getModels(int page, String orderBy, String sortType, String search){
    Pageable paging;
    if(orderBy != null){
      if(sortType != null && sortType.equals("desc")){
        paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy).descending());
      }else{
        paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy));
      }
    }else{
      paging = PageRequest.of(page, PAGE_SIZE);
    }
    System.out.println("Nie ma kodu");
    return modelRepository.findAllModels(paging);
//    if(search == null){
//
//    }else{
//      System.out.println("Jest kod");
//      return modelRepository.findByContaining(search, paging);
//    }
  }

//  public Page<Model> getCountedModels(int page, String orderBy, String sortType, String search){
//    Pageable paging = PageRequest.of(page, PAGE_SIZE, Sort.by(orderBy));
//    return modelRepository.getCountedModels(paging);
//  }
}
