package com.app.inventorysystemapp.model;

import com.app.inventorysystemapp.service.DeviceIdGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
public class Device {
  @Id
  private long id;
  @JoinColumn(name = "serial_number")
  private String serialNumber;
  @ManyToOne
  @JoinColumn(name = "id_room")
  private Room room;
  @ManyToOne
  @JoinColumn(name = "id_model")
  private Model model;
  @ManyToOne
  @JoinColumn(name = "id_owner")
  private Owner owner;
  @ManyToOne
  @JoinColumn(name = "id_device_set", referencedColumnName = "id")
  private DeviceSet deviceSet;
  private long barCode;
  private String comments;
  @CreationTimestamp
  private LocalDateTime createdDate;

  public Device(){}

  public Device(String serialNumber,
                Room room,
                Model model,
                Owner owner,
                DeviceSet deviceSet,
                String comments){
    this.serialNumber = serialNumber;
    this.room = room;
    this.model = model;
    this.owner = owner;
    this.deviceSet = deviceSet;
    this.comments = comments;
    this.id = DeviceIdGenerator.getNextId();
    this.barCode = generateBarCode();
  }

  public long generateBarCode(){
    return Long.parseLong(420 + String.valueOf(this.model.getType().getId()) + String.valueOf(this.model.getId()) + String.valueOf(this.id));
  }


}
