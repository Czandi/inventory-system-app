package com.app.inventorysystemapp.service;

import com.app.inventorysystemapp.model.DeviceType;
import com.app.inventorysystemapp.model.Model;
import com.app.inventorysystemapp.model.interfaces.IModel;
import com.app.inventorysystemapp.controller.requestModels.ModelRequest;
import com.app.inventorysystemapp.repository.ModelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModelService implements com.app.inventorysystemapp.service.Service {

  private final ModelRepository modelRepository;
  private final DeviceTypeService deviceTypeService;
  private final HistoryService historyService;

  public ModelService(ModelRepository modelRepository, DeviceTypeService deviceTypeService, HistoryService historyService) {
    this.modelRepository = modelRepository;
    this.deviceTypeService = deviceTypeService;
    this.historyService = historyService;
  }

  public Page<IModel> getModels(int page, int pageSize, String orderBy, String sortType, String search){
    int pageNumber = page > 0 ? page : 1;

    Pageable paging = generatePageRequest(pageNumber, pageSize, orderBy, sortType);

    if(search == null) {
      return modelRepository.findAllModelsWithCount(paging);
    }else{
      return modelRepository.findAllModelsWithCountByContaining(search, paging);
    }
  }

  public List<Model> getAllModels() {
    return modelRepository.findAll();
  }

  public Model insertModel(ModelRequest model) {
    System.out.println(model);
    DeviceType deviceType = deviceTypeService.findTypeById(model.getIdType());
    String name = model.getName();

    Model newModel = new Model(name, deviceType);
    return modelRepository.save(newModel);
  }

  public Model findModelById(long id){
    return modelRepository.findById(id).orElseThrow();
  }

  public IModel getSingleModel(long id) {
    return modelRepository.findByIdWithCount(id);
  }

  public ResponseEntity<Model> updateModel(Long id, ModelRequest details) {

    DeviceType deviceType = deviceTypeService.findTypeById(details.getIdType());

    Model model = modelRepository.findById(id).orElseThrow();

    if(model.getName().toLowerCase() != details.getName().toLowerCase()){
      historyService.insertHistory("model", model.getId(), "name", model.getName(), details.getName());
    }

    if(!model.getType().equals(deviceType)){
      historyService.insertHistory("model", model.getId(), "type", model.getType().getName(), deviceType.getName());
    }

    model.setName(details.getName());
    model.setType(deviceType);

    final Model updatedModel = modelRepository.save(model);
    return ResponseEntity.ok(updatedModel);
  }

  @Override
  public String generateOrderValue(String orderBy) {
    switch(orderBy){
      case "name":
        return "modelName";
      case "type":
        return "typeName";
      case "count":
        return "modelCount";
      default:
        return orderBy;
    }
  }

  public void deleteModel(Long id) {
    Model model = findModelById(id);
    modelRepository.delete(model);
  }

  public Model findModelByName(String name) {
    return modelRepository.findByName(name);
  }
}
