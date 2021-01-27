package com.app.inventorysystemapp.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(DeviceController.class)
class DeviceControllerTest {

  @Autowired
  private MockMvc mvc;

  @Test
  void getDevices() {
  }

  @Test
  void getAllDevices() {
  }

  @Test
  void getDeletedDevices() {
  }

//  @Test
//  void getSingleDevice() {
//    mvc.perform(get("/devices/1")).andExpect(device.get)
//
//  }

  @Test
  void getDeviceByBarcode() {
  }

  @Test
  void getAllBarcodes() {
  }

  @Test
  void countModels() {
  }

  @Test
  void insertDevice() {
  }

  @Test
  void updateDevice() {
  }

  @Test
  void deleteDevice() {
  }
}
