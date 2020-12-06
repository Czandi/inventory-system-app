package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.Room;
import com.app.inventorysystemapp.model.interfaces.IRoom;
import com.app.inventorysystemapp.repository.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService implements com.app.inventorysystemapp.service.Service {

  private final RoomRepository roomRepository;
  private final HistoryService historyService;

  public RoomService(RoomRepository roomRepository, HistoryService historyService) {
    this.roomRepository = roomRepository;
    this.historyService = historyService;
  }

  public Page<IRoom> getRooms(int page,
                              int pageSize,
                              String orderBy,
                              String sortType,
                              String search) {
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if(search == null) {
      return roomRepository.findAllRoomsWithItemsCount(paging);
    }else{
      return roomRepository.findAllRoomsWithItemsCountByContaining(search, paging);
    }
  }

  public List<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public Room insertRoom(Room room) {
    return roomRepository.save(room);
  }

  public Room findRoomById(long id){
    return roomRepository.findById(id).orElseThrow();
  }

  public IRoom getSingleRoom(long id) {
    return roomRepository.findByIdWithCount(id);
  }

  public ResponseEntity<Room> updateRoom(long id, String name) {
    Room room = roomRepository.findById(id).orElseThrow();

    if(!room.getName().equals(name)){
      historyService.insertHistory("room", room.getId(), "name", room.getName(), name);
    }

    room.setName(name);

    final Room updatedRoom = roomRepository.save(room);
    return ResponseEntity.ok(updatedRoom);
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch(orderBy){
      case "name":
        return "roomName";
      case "count":
        return "itemsInRoomCount";
      default:
        return orderBy;
    }
  }
}
