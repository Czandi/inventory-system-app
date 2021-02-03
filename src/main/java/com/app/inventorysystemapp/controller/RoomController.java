package com.app.inventorysystemapp.controller;

import com.app.inventorysystemapp.controller.dto.DeviceDto;
import com.app.inventorysystemapp.controller.dto.RoomDto;
import com.app.inventorysystemapp.controller.mapper.DeviceMapper;
import com.app.inventorysystemapp.controller.mapper.RoomMapper;
import com.app.inventorysystemapp.model.Room;
import com.app.inventorysystemapp.service.ProductService;
import com.app.inventorysystemapp.service.RoomService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RoomController {

  private final RoomService roomService;
  private final ProductService productService;

  public RoomController(RoomService roomService, ProductService productService) {
    this.roomService = roomService;
    this.productService = productService;
  }

  @GetMapping("/rooms")
  public Page<RoomDto> getRooms(int page,
                                int pageSize,
                                @RequestParam(required = false) String orderBy,
                                @RequestParam(required = false) String sortType,
                                @RequestParam(required = false) String search) {
    return RoomMapper.mapToRoomDtos(roomService.getRooms(page, pageSize, orderBy, sortType, search));
  }

  @GetMapping("/rooms/{id}")
  public RoomDto getSingleRoom(@PathVariable long id){
    return RoomMapper.mapToRoomDto(roomService.getSingleRoom(id));
  }

  @GetMapping("/rooms/{id}/products")
  public List<DeviceDto> getDevicesFromRoom(@PathVariable long id){
    return DeviceMapper.mapToDeviceDtos(productService.getDevicesFromRoom(id));
  }

  @GetMapping("/rooms/all")
  public List<Room> getAllRooms(){
    return roomService.getAllRooms();
  }

  @PostMapping("/rooms")
  public Room insertRoom(@RequestBody Room room) {
    return roomService.insertRoom(room);
  }

  @PutMapping("/rooms/{id}")
  public ResponseEntity<Room> updateRoom(@PathVariable long id, @RequestBody String name){
    return roomService.updateRoom(id, name);
  }

  @DeleteMapping("/rooms/{id}")
  public Boolean deleteRoom(@PathVariable long id) {
    return productService.deleteRoom(id);
  }
}
