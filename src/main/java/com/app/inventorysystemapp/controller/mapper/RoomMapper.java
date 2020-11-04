package com.app.inventorysystemapp.controller.mapper;

import com.app.inventorysystemapp.controller.dto.RoomDto;
import com.app.inventorysystemapp.model.interfaces.IRoom;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

@Data
@Builder
public class RoomMapper {

  public static Page<RoomDto> mapToRoomDtos(Page<IRoom> rooms) {
    return rooms.map(room -> mapToRoomDto(room));
  }

  public static RoomDto mapToRoomDto(IRoom room) {
    return RoomDto.builder()
      .id(room.getRoomId())
      .name(room.getRoomName())
      .count(room.getCount())
      .build();
  }

}
