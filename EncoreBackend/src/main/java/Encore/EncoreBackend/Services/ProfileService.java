package Encore.EncoreBackend.Services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

import org.springframework.stereotype.Service;

import Encore.EncoreBackend.DTO.AlbumDTO;
import Encore.EncoreBackend.DTO.PerformanceDTO;
import Encore.EncoreBackend.DTO.ProfileInformationDTO;
import Encore.EncoreBackend.Entities.Albums;
import Encore.EncoreBackend.Entities.Band;
import Encore.EncoreBackend.Entities.Performances;
import Encore.EncoreBackend.Entities.Song;
import Encore.EncoreBackend.Repositories.AlbumsRepository;
import Encore.EncoreBackend.Repositories.BandRepository;
import Encore.EncoreBackend.Repositories.PerformancesRepository;
import Encore.EncoreBackend.Repositories.SongRepository;

@Service
public class ProfileService {
        private final BandRepository bandRepo;
        private final PerformancesRepository perfRepo;
        private final AlbumsRepository albumRepo;
        private final SongRepository songRepo;

        public ProfileService(
                        BandRepository bandRepo,
                        PerformancesRepository perfRepo,
                        AlbumsRepository albumRepo,
                        SongRepository songRepo) {
                this.bandRepo = bandRepo;
                this.perfRepo = perfRepo;
                this.albumRepo = albumRepo;
                this.songRepo = songRepo;
        }

        public ProfileInformationDTO getProfile(long bandId) {
                Band ourBand = bandRepo.findById(bandId)
                                .orElseThrow(() -> new NoSuchElementException("Band not found: " + bandId));

                List<Performances> ourPerformanceData = perfRepo.findByBand_Id(bandId);

                List<Albums> ourAlbumData = albumRepo.findByBand_Id(bandId);

                List<Song> ourSongData = songRepo.findByBand_Id(bandId);

                ProfileInformationDTO ourProfileData = new ProfileInformationDTO();

                ourProfileData.id = ourBand.getId();
                ourProfileData.bandName = ourBand.getBandName();
                ourProfileData.origin = ourBand.getOrigin();
                ourProfileData.mostPlayedSong = ourBand.getMostPlayedSong();
                ourProfileData.genreOfMusic = ourBand.getGenreOfMusic();
                ourProfileData.aboutUs = ourBand.getAboutUs();

                String elevator = ourBand.getElevator_pitch();
                ourProfileData.elevatorPitch = (elevator != null && !elevator.trim().isEmpty()) ? elevator.trim()
                                : null;

                String why = ourBand.getWhy_choose_us();
                ourProfileData.whyChooseUs = (why != null && !why.trim().isEmpty()) ? why.trim() : null;

                ourProfileData.songs = ourSongData.stream()
                                .map(Song::getSong_name)
                                .filter(Objects::nonNull)
                                .map(String::trim)
                                .filter(s -> !s.isEmpty())
                                .toList();

                ourProfileData.performances = ourPerformanceData.stream()
                                .map(p -> {
                                        PerformanceDTO d = new PerformanceDTO();
                                        d.date = (p.getDate() == null) ? null : p.getDate().toString();
                                        d.description = p.getDescription();
                                        d.venueName = p.getVenue_name();
                                        d.guestCount = p.getGuest_count();
                                        return d;
                                })
                                .toList();

                ourProfileData.albums = ourAlbumData.stream()
                                .map(a -> {
                                        AlbumDTO d = new AlbumDTO();
                                        d.albumName = a.getAlbum_name();
                                        d.chartRanking = (a.getChart_ranking() == null) ? null : a.getChart_ranking();
                                        d.revenueGenerated = a.getRevenue_generated();
                                        return d;
                                })
                                .toList();

                ourProfileData.profileType = (ourPerformanceData.isEmpty() && ourAlbumData.isEmpty())
                                ? "new"
                                : "experienced";

                return ourProfileData;
        }
}
