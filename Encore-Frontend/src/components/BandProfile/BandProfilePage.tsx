import BandProfile from "./BandProfile"
import "./BandProfilePage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import type { ProfileInformation, ProfileDTO } from "../../utils/BandGenres";

export default function BandProfilePage() {
  const bandIdentification = sessionStorage.getItem("bandId");
  const bandId = bandIdentification ? parseInt(bandIdentification, 10) : null;

  const [profile, setProfile] = useState<ProfileInformation | null>(null);

  const retrieveProfileInfo = async () => {
    if (bandId == null || Number.isNaN(bandId)) return;

    try {
      const { data } = await axios.get<ProfileDTO>(`http://localhost:8080/api/profile/${bandId}`);

      if (data.profileType === "new") {
        setProfile({
          profileType: "new",
          bandName: data.bandName,
          origin: data.origin,
          mostPlayedSong: data.mostPlayedSong,
          genreOfMusic: data.genreOfMusic,
          aboutUs: data.aboutUs,
          elevatorPitch: data.elevatorPitch ?? "",
          whyChooseUs: data.whyChooseUs ?? "",
          newBandSongs: (data.songs ?? []).filter(Boolean),
        });
      } else {
        const p = data.performances?.[0];
        const a = data.albums?.[0];

        setProfile({
          profileType: "experienced",
          bandName: data.bandName,
          origin: data.origin,
          mostPlayedSong: data.mostPlayedSong,
          genreOfMusic: data.genreOfMusic,
          aboutUs: data.aboutUs,
          performances: (data.performances ?? []).map(p => ({
            date: p.date ?? "",
            description: p.description ?? "",
            venue_name: p.venueName ?? "",
            guest_count: p.guestCount ?? 0,
          })),
          latestAlbum: a
            ? {
                songs: data.songs ?? [],
                album_name: a.albumName ?? "",
                chart_ranking: a.chartRanking ?? null,
                revenue_generated: a.revenueGenerated ?? 0,
              }
            : undefined,
        });
      }
    } catch (err) {
      console.log("Error retrieving profile information: ", err);
    }
  };

  useEffect(() => {
    retrieveProfileInfo();
  }, [bandId]);

  if (!profile) return <div>Loading…</div>;
  return <BandProfile {...profile} />;
}
