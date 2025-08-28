package Encore.EncoreBackend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Encore.EncoreBackend.Entities.Performances;

public interface PerformancesRepository extends JpaRepository<Performances, Long> {
    List<Performances> findByBand_BandNameIgnoreCase(String band);

    List<Performances> findByBand_Id(Long bandId);

    Performances findFirstByBand_Id(Long bandId);
}
