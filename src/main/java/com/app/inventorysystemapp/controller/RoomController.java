package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.RoomDto;
import com.app.inventorysystemapp.controller.mapper.RoomMapper;
import com.app.inventorysystemapp.model.Room;
import com.app.inventorysystemapp.service.RoomService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    return RoomMapper.mapToRoomDtos(roomService.getRooms(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/rooms/all")
  public List<Room> getAllRooms(){
    return roomService.getAllRooms();
  }

  @PostMapping("/rooms")
  public Room insertRoom(@RequestBody Room room) {
    return roomService.insertRoom(room);
  }
}
