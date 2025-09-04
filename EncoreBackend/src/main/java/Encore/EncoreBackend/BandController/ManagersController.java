package Encore.EncoreBackend.BandController;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import Encore.EncoreBackend.DTO.EventManagerView;
import Encore.EncoreBackend.Repositories.ManagersRepository;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagersController {
    private final ManagersRepository managerRepository;

    public ManagersController(ManagersRepository managerRepository) {
        this.managerRepository = managerRepository;
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

}
