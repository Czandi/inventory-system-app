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
public class RoomService {

  private final RoomRepository roomRepository;

  public RoomService(RoomRepository roomRepository) {
    this.roomRepository = roomRepository;
  }

  public Page<IRoom> getRooms(int page,
                              int pageSize,
                              String orderBy,
                              String sortType,
                              String search) {
    Pageable paging;
    int pageNumber = page > 0 ? page : 1;

    if(orderBy != null){

      String order = orderBy;

      switch(orderBy){
        case "name":
          order = "roomName";
          break;
        case "count":
          order = "itemsInRoomCount";
          break;
      }

      String type = "";

      if(sortType == null){
        type = "desc";
      }else{
        type = sortType;
      }

      if(type.equals("desc")){
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(order).descending());
      }else{
        paging = PageRequest.of(pageNumber-1, pageSize, Sort.by(order));
      }

    }else{
      paging = PageRequest.of(pageNumber-1, pageSize);
    }

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
    room.setName(name);

    final Room updatedRoom = roomRepository.save(room);
    return ResponseEntity.ok(updatedRoom);
  }
}
