package Encore.EncoreBackend.DTO;

public class LoginDTO {
    private String username;
    private String jwtToIssue;
    private String role;
    private Long bandId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwtToIssue() {
        return jwtToIssue;
    }

    public void setJwtToIssue(String jwtToIssue) {
        this.jwtToIssue = jwtToIssue;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }
}
