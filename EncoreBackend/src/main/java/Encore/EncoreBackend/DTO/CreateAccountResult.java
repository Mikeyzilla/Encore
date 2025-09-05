package Encore.EncoreBackend.DTO;

public record CreateAccountResult(Long bandId, Long userId, String jwt, String message) {
}
