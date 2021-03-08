package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.History;
import com.app.inventorysystemapp.model.interfaces.IHistoryProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {


  //TODO
  @Query("Select h from History h")
  Page<History> findByContaining(String search, Pageable paging);

  @Query("Select " +
    "d.barCode as barCode, " +
    "d.serialNumber as serialNumber, " +
    "d.inventoryNumber as inventoryNumber, " +
    "h.changedAttribute as changedAttribute, " +
    "h.oldValue as oldValue, " +
    "h.newValue as newValue, " +
    "h.date as date " +
    "from History h " +
    "inner join Product d on h.idRecord=d.id " +
    "group by h.id")
  Page<IHistoryProduct> findDevicesHistory(Pageable paging);

  @Query("Select " +
    "d.barCode as barCode, " +
    "d.serialNumber as serialNumber, " +
    "d.inventoryNumber as inventoryNumber, " +
    "h.changedAttribute as changedAttribute, " +
    "h.oldValue as oldValue, " +
    "h.newValue as newValue, " +
    "h.date as date " +
    "from History h " +
    "inner join Product d on h.idRecord=d.id " +
    "group by h.id " +
    "having d.barCode like concat('%', ?1, '%') " +
    "or d.serialNumber like %?1% " +
    "or h.changedAttribute like %?1% " +
    "or h.oldValue like %?1% " +
    "or h.newValue like %?1% " +
    "or h.date like %?1% " +
    "or d.inventoryNumber like %?1%")
  Page<IHistoryProduct> findDevicesHistoryByContaining(String search, Pageable paging);

  @Query("Select " +
    "d.barCode as barCode, " +
    "d.serialNumber as serialNumber, " +
    "h.changedAttribute as changedAttribute, " +
    "h.oldValue as oldValue, " +
    "h.newValue as newValue, " +
    "h.date as date, " +
    "h.tableName, " +
    "h.idRecord " +
    "from History h " +
    "inner join Product d on h.idRecord=d.id " +
    "group by h.id, h.tableName, h.idRecord " +
    "having h.tableName like 'device' " +
    "and h.idRecord like ?1")
  Page<IHistoryProduct> findDeviceHistory(Pageable paging, long id);
}
