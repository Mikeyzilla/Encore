package Encore.EncoreBackend.BandController;

import java.time.DateTimeException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.DTO.BandDTO;
import Encore.EncoreBackend.DTO.CreateDTO;
import Encore.EncoreBackend.DTO.LoginDTO;
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

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {
    public UsersRepository userRepository;
    public BandRepository bandRepository;
    public AlbumsRepository albumsRepository;
    public PerformancesRepository performancesRepository;
    public ManagersRepository managersRepository;
    private final JwtEncoder jwtEncoder;

    public UsersController(UsersRepository userRepository, BandRepository bandRepository,
            AlbumsRepository albumsRepository, PerformancesRepository performancesRepository,
            ManagersRepository managersRepository, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.bandRepository = bandRepository;
        this.albumsRepository = albumsRepository;
        this.performancesRepository = performancesRepository;
        this.managersRepository = managersRepository;
        this.jwtEncoder = jwtEncoder;
    }

    @PostMapping("/login")
    public Optional<LoginDTO> Login(String username, String password, String role) {
        Users attemptedUser = userRepository.findByUsernameAndRole(username, role);
        if (attemptedUser == null) {
            return Optional.empty();
        }
        if (BCrypt.checkpw(password, attemptedUser.getPassword()) == false) {
            return Optional.empty();
        }
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("EncoreMike")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(89450))
                .claim("accountType", attemptedUser.getRole())
                .subject(attemptedUser.getUsername())
                .build();
        String claimToAuthority = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        LoginDTO loginSuccess = new LoginDTO();
        loginSuccess.setJwtToIssue(claimToAuthority);
        loginSuccess.setRole(attemptedUser.getRole());
        loginSuccess.setUsername(attemptedUser.getUsername());
        return Optional.of(loginSuccess);
    }

    @PostMapping("/createAnAccount")
    public ResponseEntity<String> createAnAccount(@RequestBody CreateDTO create) {
        if (userRepository.findByUsernameAndRole(create.getUsername(), create.getRole()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("There's already a user that exists with that username and role.");
        } else {
            Users userToBeSignedUp = new Users();
            userToBeSignedUp.setUsername(create.getUsername());
            String unencryptedPass = create.getPassword();
            String encryptedPass = BCrypt.hashpw(unencryptedPass, "12");
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
                bandAlbum.setAlbum_name(bandDTO.getAlbumName());
                bandAlbum.setChart_ranking(Long.valueOf(bandDTO.getChartNum()));
                bandAlbum.setRevenue_generated(Long.valueOf(bandDTO.getRevenue()));
                bandAlbum.setBand(bandInfo);
                bandPerformance.setBand(bandInfo);
                String dateInDBFormat = bandDTO.getWhenPlayed();
                DateTimeFormatter calendarDateVersion = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                try {
                    LocalDate date = LocalDate.parse(dateInDBFormat, calendarDateVersion);
                    bandPerformance.setDate(date);
                } catch (DateTimeException err) {
                    System.out.println(err);
                }
                bandPerformance.setGuest_count(Integer.parseInt(bandDTO.getNumPeople()));
                bandPerformance.setDescription(bandDTO.getHowItWent());
                bandInfo.setUser(userToBeSignedUp);
                albumsRepository.save(bandAlbum);
                performancesRepository.save(bandPerformance);
                bandRepository.save(bandInfo);
            } else if (create instanceof ManagerDTO managerDTO) {
                Managers manager = new Managers();
                manager.setEventType(managerDTO.getEventType());
                manager.setVenueLocation(managerDTO.getVenueLocation());
                manager.setTimeSlot(managerDTO.getTimeSlot());
                manager.setDate(managerDTO.getDate());
                manager.setBandFee(managerDTO.getBandFee());
                manager.setUser(userToBeSignedUp);
                managersRepository.save(manager);
            } else {
                return ResponseEntity.status(404).body("Error, wrong role");
            }
            JwtClaimsSet claims = JwtClaimsSet.builder().issuer("EncoreMike").issuedAt(Instant.now())
                    .expiresAt(Instant.now().plusSeconds(89450)).claim("accountType", userToBeSignedUp.getRole())
                    .subject(userToBeSignedUp.getUsername()).build();
            String claimToAuthority = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
            return ResponseEntity.ok(claimToAuthority);
        }
    }
}
