package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.RoomDto;
import com.app.inventorysystemapp.model.interfaces.IRoom;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class RoomDtoMapper {

  public static Page<RoomDto> mapToRoomDtos(Page<IRoom> rooms) {
    return rooms.map(room -> mapToRoomDto(room));
  }

  private static RoomDto mapToRoomDto(IRoom room) {
    return RoomDto.builder()
      .id(room.getRoomId())
      .name(room.getRoomName())
      .itemsInRoom(room.getItemsInRoomCount())
      .build();
  }

}
