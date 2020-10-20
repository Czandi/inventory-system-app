package com.app.inventorysystemapp.model.interfaces;

public interface IOwner {
  Long getOwnerId();
  String getOwnerName();
  String getOwnerSurname();
  Integer getOwnerItemsCount();
}
