package Encore.EncoreBackend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Encore.EncoreBackend.DTO.EventInformationDTO;
import Encore.EncoreBackend.DTO.EventLineupDTO;
import Encore.EncoreBackend.DTO.EventManagerView;
import Encore.EncoreBackend.DTO.ManagerDTO;
import Encore.EncoreBackend.Entities.Managers;

public interface ManagersRepository extends JpaRepository<Managers, Long> {
        List<EventManagerView> findByEventTypeAndDate(String eventType, String date);

        @Query("SELECT new Encore.EncoreBackend.DTO.EventLineupDTO(b.bandName, m.timeSlot, m.bandFee) " +
                        "FROM Managers m LEFT JOIN m.bandSignedUp b " +
                        "WHERE m.eventType = :eventType " +
                        "AND m.date = :date " +
                        "AND m.venueLocation = :venueLocation" +
                        " ORDER BY m.timeSlot")
        List<EventLineupDTO> findByEventTypeAndDateAndVenueLocation(@Param("eventType") String eventType,
                        @Param("date") String date,
                        @Param("venueLocation") String venueLocation);

        List<ManagerDTO> findAllById(Long id);

        @Query("""
                          SELECT new Encore.EncoreBackend.DTO.EventInformationDTO(
                            m.id, m.eventType, m.venueLocation, m.timeSlot, m.date, m.bandFee, b.bandName
                          )
                          FROM Managers m
                            LEFT JOIN m.bandSignedUp b
                          WHERE m.user.id = :userId
                          ORDER BY m.date DESC, m.venueLocation ASC, m.timeSlot ASC
                        """)
        List<EventInformationDTO> findAllForUser(@Param("userId") Long userId);
}
