package Encore.EncoreBackend.BandController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.DTO.BandDTO;
import Encore.EncoreBackend.DTO.CreateDTO;
import Encore.EncoreBackend.DTO.ManagerDTO;
import Encore.EncoreBackend.Entities.Albums;
import Encore.EncoreBackend.Entities.Band;
import Encore.EncoreBackend.Entities.Managers;
import Encore.EncoreBackend.Entities.Performances;
import Encore.EncoreBackend.Entities.Users;
import Encore.EncoreBackend.Repositories.AlbumsRepository;
import Encore.EncoreBackend.Repositories.BandRepository;
import Encore.EncoreBackend.Repositories.ManagersRepository;
import Encore.EncoreBackend.Repositories.PerformancesRepository;
import Encore.EncoreBackend.Repositories.UsersRepository;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {
    public UsersRepository userRepository;
    public BandRepository bandRepository;
    public AlbumsRepository albumsRepository;
    public PerformancesRepository performancesRepository;
    public ManagersRepository managersRepository;

    public UsersController(UsersRepository userRepository, BandRepository bandRepository,
            AlbumsRepository albumsRepository, PerformancesRepository performancesRepository,
            ManagersRepository managersRepository, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.bandRepository = bandRepository;
        this.albumsRepository = albumsRepository;
        this.performancesRepository = performancesRepository;
        this.managersRepository = managersRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(String username, String password, String role) {
        Users attemptedUser = userRepository.findByUsernameAndRole(username, role);
        if (attemptedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok("Login successful for " + attemptedUser.getUsername());
    }

    @Transactional
    @PostMapping("/createAnAccount")
    public ResponseEntity<String> createAnAccount(@RequestBody CreateDTO create) {
        if (userRepository.findByUsernameAndRole(create.getUsername(), create.getRole()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User with this username and role already exists.");
        }
        if (create.getRole().equals("Manager") == false && create.getRole().equals("Band") == false) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Role did not fit");
        }

        Users userToBeSignedUp = new Users();
        userToBeSignedUp.setUsername(create.getUsername());
        String unencryptedPass = create.getPassword();
        String encryptedPass = BCrypt.hashpw(unencryptedPass, BCrypt.gensalt(12));
        userToBeSignedUp.setPassword(encryptedPass);
        userToBeSignedUp.setRole(create.getRole());
        userRepository.save(userToBeSignedUp);

        if (create instanceof BandDTO bandDTO) {
            Band bandInfo = new Band();
            bandInfo.setAboutUs(bandDTO.getAboutUs());
            bandInfo.setBandName(bandDTO.getNameOfTheBand());
            bandInfo.setElevator_pitch(bandDTO.getPitch());
            bandInfo.setGenreOfMusic(bandDTO.getGenre());
            bandInfo.setMostPlayedSong(bandDTO.getMostPlayedSong());
            bandInfo.setOrigin(bandDTO.getOrigin());
            bandInfo.setWhy_choose_us(bandDTO.getWhyWe());
            Albums bandAlbum = new Albums();
            Performances bandPerformance = new Performances();
            /*
             * Still missing:
             * chartNum → converted with Long.valueOf(bandDTO.getChartNum())
             * 
             * revenue → converted with Long.valueOf(bandDTO.getRevenue())
             * 
             * Performance-related
             * 
             * whenPlayed → parsed into a Date with
             * DateTimeFormatter.ofPattern("yyyy-MM-dd")
             * 
             * numPeople → converted with Integer.parseInt(bandDTO.getNumPeople())
             */
            bandAlbum.setAlbum_name(bandDTO.getAlbumName());
            bandPerformance.setBand(bandInfo);
            bandPerformance.setDescription(bandDTO.getHowItWent());
            bandInfo.setUser(userToBeSignedUp);
            bandRepository.save(bandInfo);
            bandAlbum.setBand(bandInfo);
            albumsRepository.save(bandAlbum);
            performancesRepository.save(bandPerformance);
            return ResponseEntity.ok("Band account created successfully");
        } else if (create instanceof ManagerDTO managerDTO) {
            Managers manager = new Managers();
            manager.setEventType(managerDTO.getEventType());
            manager.setVenueLocation(managerDTO.getVenueLocation());
            manager.setTimeSlot(managerDTO.getTimeSlot());
            manager.setDate(managerDTO.getDate());
            manager.setBandFee(managerDTO.getBandFee());
            manager.setUser(userToBeSignedUp);
            managersRepository.save(manager);

            return ResponseEntity.ok("Manager account created successfully");
        } else {
            return ResponseEntity.ok("User account created successfully (required info only)");
        }
    }
}