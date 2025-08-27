package Encore.EncoreBackend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "albums")
public class Albums {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    private String album_name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "band_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Band band;

    @Column(nullable = false)
    private Long chart_ranking;

    @Column(nullable = false)
    private Long revenue_generated;

    public Albums() {
    }

    public Long getRevenue_generated() {
        return revenue_generated;
    }

    public void setRevenue_generated(Long revenue_generated) {
        this.revenue_generated = revenue_generated;
    }

    public Long getChart_ranking() {
        return chart_ranking;
    }

    public void setChart_ranking(Long chart_ranking) {
        this.chart_ranking = chart_ranking;
    }

    public String getAlbum_name() {
        return album_name;
    }

    public void setAlbum_name(String album_name) {
        this.album_name = album_name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Band getBand() {
        return band;
    }

    public void setBand(Band band) {
        this.band = band;
    }

}
