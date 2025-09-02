package Encore.EncoreBackend.BandController;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Encore.EncoreBackend.Entities.Band;
import Encore.EncoreBackend.Entities.Song;
import Encore.EncoreBackend.Repositories.BandRepository;
import Encore.EncoreBackend.Repositories.SongRepository;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:5173")
public class SongController {
    private final SongRepository songRepository;
    private final BandRepository bandRepository;

    public SongController(SongRepository songRepository, BandRepository bandRepository) {
        this.songRepository = songRepository;
        this.bandRepository = bandRepository;
    }

    @GetMapping("/bands/{bandId}/songs")
    public List<Song> getAllSongsByBand(@PathVariable Long bandId) {
        return songRepository.findByBand_Id(bandId);
    }

    @PostMapping("/bands/{bandId}/addSong")
    public Optional<Song> addSongToBand(@PathVariable Long bandId, @RequestBody Song newSong) {
        Optional<Band> maybeBand = bandRepository.findById(bandId);
        if (!maybeBand.isPresent()) {
            return Optional.empty();
        }
        Band bandToAddSongTo = maybeBand.get();
        newSong.setBand(bandToAddSongTo);
        Song savedSong = songRepository.save(newSong);
        return Optional.of(savedSong);
    }

    @DeleteMapping("/bands/{bandId}/removeSong")
    public ResponseEntity<String> removeSongFromBand(@PathVariable Long bandId) {
        Optional<Band> maybeBand = bandRepository.findById(bandId);
        if (!maybeBand.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Band bandToRemoveSongFrom = maybeBand.get();
        Song latestAddedSong = songRepository.findTopByBandOrderByIdDesc(bandToRemoveSongFrom);
        songRepository.delete(latestAddedSong);
        return ResponseEntity.status(200).body("Successful Deletion of Song");
    }

}
