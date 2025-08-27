package Encore.EncoreBackend.BandController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.Entities.Song;
import Encore.EncoreBackend.Repositories.SongRepository;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:5173")
public class SongController {
    private final SongRepository songRepository;

    public SongController(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @GetMapping("/bands/{band}/songs")
    public List<Song> getAllSongsByBand(@PathVariable String band) {
        return songRepository.findByBand_BandNameIgnoreCase(band);
    }

}
