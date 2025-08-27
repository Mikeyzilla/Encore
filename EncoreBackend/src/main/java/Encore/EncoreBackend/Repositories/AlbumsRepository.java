package Encore.EncoreBackend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Encore.EncoreBackend.Entities.Albums;

public interface AlbumsRepository extends JpaRepository<Albums, Long> {
    List<Albums> findByBand_BandNameIgnoreCase(String bandName);

    Albums findFirstByBand_Id(Long bandId);
}
