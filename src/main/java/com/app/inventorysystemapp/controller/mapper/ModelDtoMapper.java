package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.ModelDto;
import com.app.inventorysystemapp.model.interfaces.IModel;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;


@Data
@Builder
public class ModelDtoMapper {

  public static Page<ModelDto> mapToModelDtos(Page<IModel> models){
    return models.map(model -> mapToModelDto(model));
  }

  private static ModelDto mapToModelDto(IModel model) {
    return ModelDto.builder()
      .id(model.getModelId())
      .name(model.getModelName())
      .type(model.getTypeName())
      .count(model.getModelCount())
      .build();
  }
}
