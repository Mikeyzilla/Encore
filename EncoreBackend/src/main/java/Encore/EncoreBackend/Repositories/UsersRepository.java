package Encore.EncoreBackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import Encore.EncoreBackend.Entities.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUsernameAndRole(String username, String role);

    Users findByIdAndRole(Long id, String role);

}
