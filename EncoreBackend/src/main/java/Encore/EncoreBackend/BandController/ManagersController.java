package Encore.EncoreBackend.BandController;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import Encore.EncoreBackend.DTO.EventInformationDTO;
import Encore.EncoreBackend.DTO.EventLineupDTO;
import Encore.EncoreBackend.DTO.EventManagerView;
import Encore.EncoreBackend.DTO.ManagerDTO;
import Encore.EncoreBackend.Entities.Managers;
import Encore.EncoreBackend.Entities.Users;
import Encore.EncoreBackend.Repositories.ManagersRepository;
import Encore.EncoreBackend.Repositories.UsersRepository;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagersController {
    private final ManagersRepository managerRepository;
    private final UsersRepository usersRepository;

    public ManagersController(ManagersRepository managerRepository,
            UsersRepository usersRepository) {
        this.managerRepository = managerRepository;
        this.usersRepository = usersRepository;
    }

    @GetMapping("/{type}/{year}/{month}/{day}")
    public List<EventManagerView> getEventsForDay(@PathVariable String type,
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day) {
        try {
            LocalDate date = LocalDate.of(year, month, day);
            return managerRepository.findByEventTypeAndDate(type, date.toString());
        } catch (DateTimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid date");
        }
    }

    @GetMapping("/viewAllEvents/{role}/{userId}")
    public List<EventInformationDTO> getAllEvents(@AuthenticationPrincipal Jwt jwt, @PathVariable String role,
            @PathVariable String userId) {
        Long id = Long.parseLong(userId);
        Users user = usersRepository.findByIdAndRole(id, role);
        return managerRepository.findAllForUser(user.getId());
    }

    @GetMapping("/viewEvents/lineup")
    public List<EventLineupDTO> getEventLineupForEvent(
            @RequestParam String venue,
            @RequestParam String date,
            @RequestParam String type) {
        return managerRepository.findByEventTypeAndDateAndVenueLocation(type, date, venue);
    }

    @PostMapping("/uploadEvent")
    public ResponseEntity<String> createANewEvent(@RequestBody ManagerDTO managerEventInfo,
            @AuthenticationPrincipal Jwt jwt) {
        Managers createdEvent = new Managers();
        createdEvent.setBandFee(managerEventInfo.getBandFee());
        createdEvent.setDate(managerEventInfo.getDate());
        createdEvent.setEventType(managerEventInfo.getEventType());
        createdEvent.setTimeSlot(managerEventInfo.getTimeSlot());
        createdEvent.setVenueLocation(managerEventInfo.getVenueLocation());
        String ourUser = jwt.getSubject();
        String roleOfOurUser = jwt.getClaimAsString("role");
        Users userTryingToAdd = usersRepository.findByUsernameAndRole(ourUser, roleOfOurUser);
        if (userTryingToAdd == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("We didn't find a user with that name and role");
        }
        createdEvent.setUser(userTryingToAdd);
        createdEvent.setBandSignedUp(null);
        managerRepository.save(createdEvent);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Event created successfully!");
    }
}
