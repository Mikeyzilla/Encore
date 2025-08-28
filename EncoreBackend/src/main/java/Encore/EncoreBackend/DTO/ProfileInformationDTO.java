package Encore.EncoreBackend.DTO;

import java.util.List;

public class ProfileInformationDTO {

    public long id;
    public String bandName;
    public String origin;
    public String mostPlayedSong;
    public String genreOfMusic;
    public String aboutUs;

    public String elevatorPitch;
    public String whyChooseUs;
    public List<String> songs;

    public List<PerformanceDTO> performances;
    public List<AlbumDTO> albums;

    public String profileType;
}