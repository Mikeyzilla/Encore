import { useParams } from "react-router-dom";
import BandProfile from "./BandProfile"
import "./BandProfilePage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import type { Album, PastEvents } from "../../utils/BandGenres";
import { defaultBand } from "../../utils/BandGenres";

export default function BandProfilePage() {
    const [performances, setPerformances] = useState<PastEvents>({
        date: "",
        description: "",
        venue_name: "",
        guest_count: 0,
    });

    const [album, setAlbum] = useState<Album>({
        songs: [],
        album_name: "",
        chart_ranking: null,
        revenue_generated: 0,
    });

    const bandIdentification = sessionStorage.getItem("bandId");
    const bandId = bandIdentification ? parseInt(bandIdentification, 10) : null;
    const nameOfTheBand = sessionStorage.getItem("theSpecificBandName");
    const whereTheyAreFrom = sessionStorage.getItem("specificOrigin");
    const theirHitSong = sessionStorage.getItem("theirSong");
    const descriptionOfBand = sessionStorage.getItem("aboutThem");
    const { genre, name } = useParams<{ genre: string; name: string }>();

    const retrieveAlbumsByBand = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/albums/bands/${bandId}/album`);
            setAlbum(response.data);
        } catch (err) {
            console.log("Error retreiving albums: ", err)
        }
    }

    const retrievePerformancesByBand = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/performances/bands/${bandId}/performance`);
            setPerformances(response.data);
        } catch (err) {
            console.log("Error retreiving performances: ", err)
        }
    }

    useEffect(() => {
        if (bandId !== null && !Number.isNaN(bandId)) {
            retrieveAlbumsByBand();
            retrievePerformancesByBand();
        }
    }, [bandId]);
    
    const hasPerf = !!(performances && (performances.date || performances.venue_name));
    const hasAlbum = !!(album && (album.album_name || (album.songs?.length ?? 0) > 0));
    const isNewBand = !hasPerf && !hasAlbum;

    return (
        <BandProfile
            newBand={isNewBand}
            bandName={nameOfTheBand ?? defaultBand.bandName}
            origin={whereTheyAreFrom ?? defaultBand.origin}
            mostPlayedSong={theirHitSong ?? defaultBand.mostPlayedSong}
            genreOfMusic={genre ?? defaultBand.genreOfMusic}
            aboutUs={descriptionOfBand ?? defaultBand.aboutUs}
            mostRecentPerformance={
                performances
                    ? {
                        date: performances.date,
                        description: performances.description,
                        venue_name: performances.venue_name,
                        guest_count: performances.guest_count,
                    }
                    : undefined
            }
            latestAlbum={
                album
                    ? {
                        album_name: album.album_name,
                        chart_ranking: album.chart_ranking ?? undefined,
                        revenue_generated: album.revenue_generated ?? 0,
                    }
                    : undefined
            }
        />
    );
}