package Encore.EncoreBackend.DTO;

public interface EventManagerView {
  Long getId();

  String getEventType();

  String getVenueLocation();

  String getTimeSlot();

  String getDate();

  String getBandFee();
}
