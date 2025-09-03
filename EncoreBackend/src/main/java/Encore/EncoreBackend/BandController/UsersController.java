package Encore.EncoreBackend.BandController;

import java.util.ArrayList;
import java.util.List;

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
import Encore.EncoreBackend.DTO.CreateAccountResult;
import Encore.EncoreBackend.DTO.CreateDTO;
import Encore.EncoreBackend.DTO.LoginDTO;
import Encore.EncoreBackend.DTO.ManagerDTO;
import Encore.EncoreBackend.DTO.TryLoginDTO;
import Encore.EncoreBackend.Entities.Albums;
import Encore.EncoreBackend.Entities.Band;
import Encore.EncoreBackend.Entities.Managers;
import Encore.EncoreBackend.Entities.Performances;
import Encore.EncoreBackend.Entities.Song;
import Encore.EncoreBackend.Entities.Users;
import Encore.EncoreBackend.Repositories.AlbumsRepository;
import Encore.EncoreBackend.Repositories.BandRepository;
import Encore.EncoreBackend.Repositories.ManagersRepository;
import Encore.EncoreBackend.Repositories.PerformancesRepository;
import Encore.EncoreBackend.Repositories.SongRepository;
import Encore.EncoreBackend.Repositories.UsersRepository;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersController {
    private final UsersRepository userRepository;
    private final BandRepository bandRepository;
    private final AlbumsRepository albumsRepository;
    private final PerformancesRepository performancesRepository;
    private final ManagersRepository managersRepository;
    private final SongRepository songRepository;

    public UsersController(UsersRepository userRepository, BandRepository bandRepository,
            AlbumsRepository albumsRepository, PerformancesRepository performancesRepository,
            ManagersRepository managersRepository, SongRepository songRepository, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.bandRepository = bandRepository;
        this.albumsRepository = albumsRepository;
        this.performancesRepository = performancesRepository;
        this.managersRepository = managersRepository;
        this.songRepository = songRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> Login(@RequestBody TryLoginDTO loginInfo) {
        String username = loginInfo.getUsername();
        String password = loginInfo.getPassword();
        String role = loginInfo.getRole();
        Users attemptedUser = userRepository.findByUsernameAndRole(username, role);
        if (attemptedUser == null || !BCrypt.checkpw(password, attemptedUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Add in JWT to this
        LoginDTO loginSuccess = new LoginDTO();
        loginSuccess.setRole(attemptedUser.getRole());
        loginSuccess.setJwtToIssue("Hey");
        loginSuccess.setUsername(attemptedUser.getUsername());
        if (role.equals("band") || role.equals("Band")) {
            Band associatedBand = bandRepository.findByUserId(attemptedUser.getId());
            loginSuccess.setBandId(associatedBand.getId());
        }
        return ResponseEntity.ok(loginSuccess);
    }

    @Transactional
    @PostMapping("/createAnAccount")
    public ResponseEntity<CreateAccountResult> createAnAccount(@RequestBody CreateDTO create) {
        if (userRepository.findByUsernameAndRole(create.getUsername(), create.getRole()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new CreateAccountResult(null, "User with this username and role already exists."));
        }
        if (create.getRole().equals("Manager") == false && create.getRole().equals("Band") == false) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body(new CreateAccountResult(null, "Role did not fit"));
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
            bandAlbum.setChart_ranking(bandDTO.getChartNum());
            bandAlbum.setRevenue_generated(bandDTO.getRevenue());
            bandPerformance.setDate(bandDTO.getWhenPlayed());
            bandPerformance.setVenue_name(bandDTO.getWherePlayed());
            bandPerformance.setGuest_count(
                    bandDTO.getNumPeople() != null ? bandDTO.getNumPeople() : 0);

            bandAlbum.setAlbum_name(bandDTO.getAlbumName());
            bandPerformance.setBand(bandInfo);
            bandPerformance.setDescription(bandDTO.getHowItWent());
            bandInfo.setUser(userToBeSignedUp);
            bandRepository.save(bandInfo);
            bandAlbum.setBand(bandInfo);
            albumsRepository.save(bandAlbum);
            performancesRepository.save(bandPerformance);
            List<String> newSongs = bandDTO.getNewBandSongs();

            if (newSongs != null && !newSongs.isEmpty()) {
                List<Song> bandSongs = new ArrayList<>();

                for (String songName : newSongs) {
                    Song song = new Song();
                    song.setSong_name(songName);
                    song.setBand(bandInfo);
                    bandSongs.add(song);
                }

                songRepository.saveAll(bandSongs);
            }
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CreateAccountResult(bandInfo.getId(), "Band account created successfully"));
        } else if (create instanceof ManagerDTO managerDTO) {
            Managers manager = new Managers();
            manager.setEventType(managerDTO.getEventType());
            manager.setVenueLocation(managerDTO.getVenueLocation());
            manager.setTimeSlot(managerDTO.getTimeSlot());
            manager.setDate(managerDTO.getDate());
            manager.setBandFee(managerDTO.getBandFee());
            manager.setUser(userToBeSignedUp);
            managersRepository.save(manager);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CreateAccountResult(null, "Manager account created successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CreateAccountResult(null, "User account created successfully (required info only)"));
        }
    }
}