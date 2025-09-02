package Encore.EncoreBackend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Band {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    @NotBlank
    private String bandName;

    @Column(nullable = false)
    @NotBlank
    private String origin;

    @Column(nullable = false)
    @NotBlank
    private String mostPlayedSong;

    @Column(nullable = false)
    @NotBlank
    private String genreOfMusic;

    @NotBlank
    @Column(nullable = false)
    private String aboutUs;

    private String why_choose_us;

    private String elevator_pitch;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Users user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMostPlayedSong() {
        return mostPlayedSong;
    }

    public void setMostPlayedSong(String mostPlayedSong) {
        this.mostPlayedSong = mostPlayedSong;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getBandName() {
        return bandName;
    }

    public void setBandName(String bandName) {
        this.bandName = bandName;
    }

    public String getGenreOfMusic() {
        return genreOfMusic;
    }

    public void setGenreOfMusic(String genreOfMusic) {
        this.genreOfMusic = genreOfMusic;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public void setAboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
    }

    public String getWhy_choose_us() {
        return why_choose_us;
    }

    public void setWhy_choose_us(String why_choose_us) {
        this.why_choose_us = why_choose_us;
    }

    public String getElevator_pitch() {
        return elevator_pitch;
    }

    public void setElevator_pitch(String elevator_pitch) {
        this.elevator_pitch = elevator_pitch;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
