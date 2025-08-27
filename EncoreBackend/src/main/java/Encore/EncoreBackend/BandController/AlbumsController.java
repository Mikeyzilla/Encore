package Encore.EncoreBackend.BandController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.Entities.Albums;
import Encore.EncoreBackend.Repositories.AlbumsRepository;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin(origins = "http://localhost:5173")
public class AlbumsController {

    private final AlbumsRepository albumsRepository;

    public AlbumsController(AlbumsRepository albumsRepository) {
        this.albumsRepository = albumsRepository;
    }

    @GetMapping("/bands/{band}/albums")
    public List<Albums> getAllAlbumsByBand(@PathVariable String band) {
        return albumsRepository.findByBand_BandNameIgnoreCase(band);
    }

    @GetMapping("/bands/{bandId}/album")
    public Albums getAnAlbumByBand(@PathVariable Long bandId) {
        return albumsRepository.findFirstByBand_Id(bandId);
    }
}
