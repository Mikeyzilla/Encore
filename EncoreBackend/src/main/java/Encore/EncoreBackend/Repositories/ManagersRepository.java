package Encore.EncoreBackend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Encore.EncoreBackend.DTO.EventManagerView;
import Encore.EncoreBackend.Entities.Managers;

public interface ManagersRepository extends JpaRepository<Managers, Long> {
    List<EventManagerView> findByEventTypeAndDate(String eventType, String date);
}
