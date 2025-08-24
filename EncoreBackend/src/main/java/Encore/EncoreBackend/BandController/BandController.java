package Encore.EncoreBackend.BandController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.Entities.Band;
import Encore.EncoreBackend.Repositories.BandRepository;

@RestController
@RequestMapping("/api/bands")
@CrossOrigin(origins = "http://localhost:5173")
public class BandController {
    private final BandRepository bandRepository;

    public BandController(BandRepository bandRepository) {
        this.bandRepository = bandRepository;
    }

    @GetMapping("/genre/{genre}")
    public List<Band> getAllBandsByGenre(@PathVariable String genre) {
        String genreName = genre.replace("-", " ");
        return bandRepository.findByGenreOfMusicIgnoreCase(genreName);
    }

    @GetMapping("/{id}")
    public Band getBandById(@PathVariable long id) {
        return bandRepository.findById(id).orElseThrow();
    }
}
