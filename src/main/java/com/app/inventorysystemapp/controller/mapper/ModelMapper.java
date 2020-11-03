package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.model.DeviceType;
import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.model.interfaces.IModel;
import org.springframework.data.domain.Page;

public class ModelMapper {

  public static Page<ModelDto> mapToModelDtos(Page<IModel> models){
    return models.map(model -> mapToModelDto(model));
  }

  public static ModelDto mapToModelDto(IModel model) {
    return ModelDto.builder()
      .id(model.getModelId())
      .name(model.getModelName())
      .type(model.getTypeName())
      .count(model.getModelCount())
      .build();
  }

}
