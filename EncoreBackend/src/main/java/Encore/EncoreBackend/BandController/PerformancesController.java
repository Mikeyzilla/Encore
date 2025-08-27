package Encore.EncoreBackend.BandController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.Entities.Performances;
import Encore.EncoreBackend.Repositories.PerformancesRepository;

@RestController
@RequestMapping("/api/performances")
@CrossOrigin(origins = "http://localhost:5173")
public class PerformancesController {
    private final PerformancesRepository performancesRepository;

    public PerformancesController(PerformancesRepository performancesRepository) {
        this.performancesRepository = performancesRepository;
    }

    @GetMapping("/bands/{band}/performances")
    public List<Performances> getAllPerformancesByBand(@PathVariable String band) {
        return performancesRepository.findByBand_BandNameIgnoreCase(band);
    }

    @GetMapping("/bands/{bandId}/performance")
    public Performances getOnePerformanceByBand(@PathVariable Long bandId) {
        return performancesRepository.findFirstByBand_Id(bandId);
    }

}
