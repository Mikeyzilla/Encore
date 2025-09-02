package Encore.EncoreBackend.DTO;

import java.util.List;

public class BandDTO extends CreateDTO {
    private String nameOfTheBand;
    private String genre;
    private String origin;
    private String bandSocial;
    private String mostPlayedSong;
    private String aboutUs;
    private List<String> newBandSongs;

    private String wherePlayed;
    private String whenPlayed;
    private String howItWent;
    private String numPeople;

    private String albumName;
    private String chartNum;
    private String revenue;

    private String pitch;
    private String whyWe;

    public String getNameOfTheBand() {
        return nameOfTheBand;
    }

    public void setNameOfTheBand(String nameOfTheBand) {
        this.nameOfTheBand = nameOfTheBand;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getBandSocial() {
        return bandSocial;
    }

    public void setBandSocial(String bandSocial) {
        this.bandSocial = bandSocial;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getMostPlayedSong() {
        return mostPlayedSong;
    }

    public void setMostPlayedSong(String mostPlayedSong) {
        this.mostPlayedSong = mostPlayedSong;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public void setAboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
    }

    public List<String> getNewBandSongs() {
        return newBandSongs;
    }

    public void setNewBandSongs(List<String> newBandSongs) {
        this.newBandSongs = newBandSongs;
    }

    public String getWherePlayed() {
        return wherePlayed;
    }

    public void setWherePlayed(String wherePlayed) {
        this.wherePlayed = wherePlayed;
    }

    public String getWhenPlayed() {
        return whenPlayed;
    }

    public void setWhenPlayed(String whenPlayed) {
        this.whenPlayed = whenPlayed;
    }

    public String getHowItWent() {
        return howItWent;
    }

    public void setHowItWent(String howItWent) {
        this.howItWent = howItWent;
    }

    public String getNumPeople() {
        return numPeople;
    }

    public void setNumPeople(String numPeople) {
        this.numPeople = numPeople;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getChartNum() {
        return chartNum;
    }

    public void setChartNum(String chartNum) {
        this.chartNum = chartNum;
    }

    public String getRevenue() {
        return revenue;
    }

    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }

    public String getPitch() {
        return pitch;
    }

    public void setPitch(String pitch) {
        this.pitch = pitch;
    }

    public String getWhyWe() {
        return whyWe;
    }

    public void setWhyWe(String whyWe) {
        this.whyWe = whyWe;
    }
}
