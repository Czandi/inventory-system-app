package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.service.ModelService;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Data
@Builder
@Component
public class ModelDtoMapper {

  private static ModelService modelService;
  @Autowired
  private ModelService tModelSerivce;

  @PostConstruct
  public void init() {
    ModelDtoMapper.modelService = tModelSerivce;
  }

  public static Page<ModelDto> mapToModelDtos(Page<Model> models){
    return models.map(model -> mapToModelDto(model));
  }

  private static ModelDto mapToModelDto(Model model) {
    return ModelDto.builder()
      .id(model.getId())
      .name(model.getName())
      .type(model.getType().getName())
      .count(modelService.getCount(model.getId()))
      .build();
  }
}
