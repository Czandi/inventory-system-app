package com.app.inventorysystemapp.service;

public class DeviceIdGenerator {
  private static long ID = 1000;

  public static Long getNextId() {
    return ID++;
  }
}
