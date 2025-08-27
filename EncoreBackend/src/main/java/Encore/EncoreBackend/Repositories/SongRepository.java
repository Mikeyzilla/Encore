package Encore.EncoreBackend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Encore.EncoreBackend.Entities.Song;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findByBand_BandNameIgnoreCase(String band);
}
