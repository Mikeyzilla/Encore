package Encore.EncoreBackend.DTO;

public class ManagerDTO extends CreateDTO {
    private String eventType;
    private String venueLocation;
    private String timeSlot;
    private String date;
    private String bandFee;

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getVenueLocation() {
        return venueLocation;
    }

    public void setVenueLocation(String venueLocation) {
        this.venueLocation = venueLocation;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getBandFee() {
        return bandFee;
    }

    public void setBandFee(String bandFee) {
        this.bandFee = bandFee;
    }
}
