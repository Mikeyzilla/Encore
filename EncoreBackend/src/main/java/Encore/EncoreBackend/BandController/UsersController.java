package Encore.EncoreBackend.BandController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        private final JwtEncoder jwtEncoder;

        public UsersController(UsersRepository userRepository, BandRepository bandRepository,
                        AlbumsRepository albumsRepository, PerformancesRepository performancesRepository,
                        ManagersRepository managersRepository, SongRepository songRepository, JwtEncoder jwtEncoder) {
                this.userRepository = userRepository;
                this.bandRepository = bandRepository;
                this.albumsRepository = albumsRepository;
                this.performancesRepository = performancesRepository;
                this.managersRepository = managersRepository;
                this.songRepository = songRepository;
                this.jwtEncoder = jwtEncoder;
        }

        @GetMapping("/role/{userId}")
        public String getRoleByUserId(@PathVariable Long userId) {
                Users user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
                return user.getRole();
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

                LoginDTO loginSuccess = new LoginDTO();
                loginSuccess.setRole(attemptedUser.getRole());
                loginSuccess.setUsername(attemptedUser.getUsername());
                if (role.equals("band") || role.equals("Band")) {
                        Band associatedBand = bandRepository.findByUserId(attemptedUser.getId());
                        loginSuccess.setBandId(associatedBand.getId());
                }

                JwtClaimsSet claims = JwtClaimsSet.builder()
                                .issuer("EncoreApp")
                                .subject(attemptedUser.getUsername())
                                .audience(List.of("encore-api"))
                                .issuedAt(Instant.now())
                                .expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))
                                .claim("role", attemptedUser.getRole())
                                .build();
                JwsHeader header = JwsHeader.with(() -> "HS256").build();
                String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims))
                                .getTokenValue();
                loginSuccess.setJwtToIssue(token);
                loginSuccess.setUserId(attemptedUser.getId());
                return ResponseEntity.ok(loginSuccess);
        }

        @Transactional
        @PostMapping("/createAnAccount")
        public ResponseEntity<CreateAccountResult> createAnAccount(@RequestBody CreateDTO create) {
                if (userRepository.findByUsernameAndRole(create.getUsername(), create.getRole()) != null) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                        .body(new CreateAccountResult(null, null, null,
                                                        "User with this username and role already exists."));
                }
                if (create.getRole().equals("Manager") == false && create.getRole().equals("Band") == false) {
                        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                                        .body(new CreateAccountResult(null, null, null, "Role did not fit"));
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

                        JwtClaimsSet claims = JwtClaimsSet.builder()
                                        .issuer("EncoreApp")
                                        .subject(userToBeSignedUp.getUsername())
                                        .audience(List.of("encore-api"))
                                        .issuedAt(Instant.now())
                                        .expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))
                                        .claim("role", userToBeSignedUp.getRole())
                                        .build();

                        var header = JwsHeader.with(MacAlgorithm.HS256).build();
                        String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
                        return ResponseEntity.status(HttpStatus.CREATED)
                                        .body(new CreateAccountResult(bandInfo.getId(), userToBeSignedUp.getId(), token,
                                                        "Band account created successfully"));
                } else if (create instanceof ManagerDTO managerDTO) {
                        Managers manager = new Managers();
                        manager.setEventType(managerDTO.getEventType());
                        manager.setVenueLocation(managerDTO.getVenueLocation());
                        manager.setTimeSlot(managerDTO.getTimeSlot());
                        manager.setDate(managerDTO.getDate());
                        manager.setBandFee(managerDTO.getBandFee());
                        manager.setUser(userToBeSignedUp);
                        managersRepository.save(manager);
                        JwtClaimsSet claims = JwtClaimsSet.builder()
                                        .issuer("EncoreApp")
                                        .subject(userToBeSignedUp.getUsername())
                                        .audience(List.of("encore-api"))
                                        .issuedAt(Instant.now())
                                        .expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))
                                        .claim("role", userToBeSignedUp.getRole())
                                        .build();

                        var header = JwsHeader.with(MacAlgorithm.HS256).build();
                        String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
                        return ResponseEntity.status(HttpStatus.CREATED)
                                        .body(new CreateAccountResult(null, userToBeSignedUp.getId(), token,
                                                        "Manager account created successfully"));
                } else {
                        JwtClaimsSet claims = JwtClaimsSet.builder()
                                        .issuer("EncoreApp")
                                        .subject(userToBeSignedUp.getUsername())
                                        .audience(List.of("encore-api"))
                                        .issuedAt(Instant.now())
                                        .expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))
                                        .claim("role", userToBeSignedUp.getRole())
                                        .build();

                        var header = JwsHeader.with(MacAlgorithm.HS256).build();
                        String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
                        return ResponseEntity.status(HttpStatus.CREATED)
                                        .body(new CreateAccountResult(null, userToBeSignedUp.getId(), token,
                                                        "User account created successfully (required info only)"));
                }
        }

}