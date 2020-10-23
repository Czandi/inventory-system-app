package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.RoomDto;
import com.app.inventorysystemapp.controller.mapper.RoomDtoMapper;
import com.app.inventorysystemapp.model.Room;
import com.app.inventorysystemapp.service.RoomService;
import jdk.jfr.Frequency;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RoomController {

  private final RoomService roomService;

  public RoomController(RoomService roomService) {
    this.roomService = roomService;
  }

  @GetMapping("/rooms")
  public Page<RoomDto> getRooms(int page,
                                int pageSize,
                                @RequestParam(required = false) String orderBy,
                                @RequestParam(required = false) String sortType,
                                @RequestParam(required = false) String search) {
    return RoomDtoMapper.mapToRoomDtos(roomService.getRooms(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/rooms/all")
  public List<Room> getAllRooms(){
    return roomService.getAllRooms();
  }
}
