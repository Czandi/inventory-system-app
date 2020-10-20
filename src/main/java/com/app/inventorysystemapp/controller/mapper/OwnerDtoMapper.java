package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.OwnerDto;
import com.app.inventorysystemapp.model.interfaces.IOwner;
import org.springframework.data.domain.Page;

public class OwnerDtoMapper {

  public static Page<OwnerDto> mapToOwnerDtos(Page<IOwner> owners) {
    return owners.map(owner -> mapToOwnerDto(owner));
  }

  private static OwnerDto mapToOwnerDto(IOwner owner) {
    return OwnerDto.builder()
      .id(owner.getOwnerId())
      .name(owner.getOwnerName())
      .surname(owner.getOwnerSurname())
      .itemsCount(owner.getOwnerItemsCount())
      .build();
  }
}
