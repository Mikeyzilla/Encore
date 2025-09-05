package Encore.EncoreBackend.DTO;

public record EventInformationDTO(
        Long id,
        String eventType,
        String venueLocation,
        String timeSlot,
        String date,
        String bandFee,
        String bandName) {
}