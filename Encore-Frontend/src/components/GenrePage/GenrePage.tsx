import "./GenrePage.css";

export default function GenrePage() {
  let musicGenreArray: string[] = [
    "Rock",
    "Metal",
    "Country",
    "Grunge",
    "Pop",
    "Alternative",
    "Gospel",
    "Latin",
    "Punk"
  ];

  return (
    <div className="GenrePage">
      <div className="BrandTitle">Encore</div>
      <div className="GenreGrid">
        {musicGenreArray.map((genre) => (
          <div key={genre} className={`genre ${genre.toLowerCase().replace(/\s+/g, "-")}`}>
            <span>{genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
