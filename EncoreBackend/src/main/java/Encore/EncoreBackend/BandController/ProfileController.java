package Encore.EncoreBackend.BandController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.DTO.ProfileInformationDTO;
import Encore.EncoreBackend.Services.ProfileService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile/{bandId}")
    public ProfileInformationDTO getProfile(@PathVariable long bandId) {
        return profileService.getProfile(bandId);
    }
}