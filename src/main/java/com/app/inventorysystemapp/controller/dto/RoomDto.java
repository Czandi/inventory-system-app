package com.app.inventorysystemapp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomDto {
  Long id;
  String name;
  Integer itemsInRoom;
}
