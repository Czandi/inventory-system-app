package com.app.inventorysystemapp.repository;

import com.app.inventorysystemapp.model.Owner;
import com.app.inventorysystemapp.model.interfaces.IOwner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {

  @Query("Select " +
    "o.id as ownerId, " +
    "o.name as ownerName, " +
    "count(o.id) as ownerItemsCount " +
    "from Device d " +
    "inner join d.owner o " +
    "group by o.id")
  Page<IOwner> findAllOwnersWithItemsCount(Pageable page);

  @Query("Select " +
    "o.id as ownerId, " +
    "o.name as ownerName, " +
    "count(o.id) as ownerItemsCount " +
    "from Device d " +
    "inner join d.owner o " +
    "group by o.id " +
    "having o.name like concat('%', ?1, '%') " +
    "or count(o.id) = ?1")
  Page<IOwner> findAllOwnersWithItemsCountByContaining(String search, Pageable page);

}
