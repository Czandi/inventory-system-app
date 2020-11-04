package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Room;
import com.app.inventorysystemapp.model.interfaces.IRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

  @Query("Select " +
    "r.id as roomId, " +
    "r.name as roomName, " +
    "count(r.id) as count " +
    "from Device d " +
    "inner join d.room r " +
    "group by r.id")
  Page<IRoom> findAllRoomsWithItemsCount(Pageable page);

  @Query("Select " +
    "r.id as roomId, " +
    "r.name as roomName, " +
    "count(r.id) as count " +
    "from Device d " +
    "inner join d.room r " +
    "group by r.id " +
    "having r.id like ?1")
  IRoom findByIdWithCount(long id);

  @Query("Select " +
    "r.id as roomId, " +
    "r.name as roomName, " +
    "count(r.id) as count " +
    "from Device d " +
    "inner join d.room r " +
    "group by r.id " +
    "having r.name like concat('%', ?1, '%') " +
    "or count(r.id) = ?1")
  Page<IRoom> findAllRoomsWithItemsCountByContaining(String search, Pageable page);
}
