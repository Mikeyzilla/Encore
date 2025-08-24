package Encore.EncoreBackend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
}
