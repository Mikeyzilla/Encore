export const Music_Genres = [
    "Rock","Metal","Country","Grunge","Pop","Alternative","Gospel","Latin","Punk"
];

export type musicGenres = "rock" | "metal" | "country" | "grunge" | "pop" | "alternative" | "gospel" | "latin" | "punk" 

export type Band = {
  id: number;
  bandName: string;
  origin: string;
  mostPlayedSong: string;
  genreOfMusic: string;
}