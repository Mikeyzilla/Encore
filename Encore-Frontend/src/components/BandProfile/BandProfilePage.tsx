import { useParams } from "react-router-dom";
import BandProfile from "./BandProfile"
import "./BandProfilePage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import type { Album, PastEvents } from "../../utils/BandGenres";

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
    
    const nameOfTheBand = sessionStorage.getItem("theSpecificBandName");
    const whereTheyAreFrom = sessionStorage.getItem("specificOrigin");
    const theirHitSong = sessionStorage.getItem("theirSong");
    const descriptionOfBand = sessionStorage.getItem("aboutThem");
    const { musicStyle, bandInfo } = useParams();

    const retrieveAlbumsByBand = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/albums/bands/${bandInfo}/album`);
            setAlbum(response.data);
        } catch (err) {
            console.log("Error retreiving albums: ", err)
        }
    }

    const retrievePerformancesByBand = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/performances/bands/${bandInfo}/performance`);
            setPerformances(response.data);
        } catch (err) {
            console.log("Error retreiving performances: ", err)
        }
    }

    useEffect(() => {
        retrieveAlbumsByBand();
        retrievePerformancesByBand();
    }, [bandInfo]);

    return (
        <BandProfile bandName={nameOfTheBand ?? ""} origin={whereTheyAreFrom ?? "no data"} mostPlayedSong={theirHitSong ?? ""} genreOfMusic={musicStyle ?? ""} aboutUs={descriptionOfBand ?? ""}
            mostRecentPerformance={{
                date: performances.date,
                description: performances.description,
                venue_name: performances.venue_name,
                guest_count: performances.guest_count,
            }}
            latestAlbum={{
                album_name: album.album_name,
                chart_ranking: album.chart_ranking,
                revenue_generated: album.revenue_generated,
            }}
        ></BandProfile>
    )
}