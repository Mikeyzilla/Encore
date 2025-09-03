package Encore.EncoreBackend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Encore.EncoreBackend.Entities.Band;

public interface BandRepository extends JpaRepository<Band, Long> {
    Optional<Band> findByBandName(String bandName);

    Band findByUserId(Long userId);

    List<Band> findByGenreOfMusicIgnoreCase(String genreOfMusic);
}
