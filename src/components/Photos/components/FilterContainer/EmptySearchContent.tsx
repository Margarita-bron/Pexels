export const InfoSearchBlock: React.FC<{
  search: string;
  hasPhotos: boolean;
}> = ({ search, hasPhotos }) => {
  return (
    <div className="info-search-content">
      {hasPhotos ? (
        <>
          <h2>Photo {search} </h2>
        </>
      ) : (
        <>
          <h2>
            <pre>
              No results for the query {search} with filters applied. Please try
              to refine your search query.
            </pre>
          </h2>
          <a
            data-testid="next-link"
            className="Button_button__RDDf5 spacing_noMargin__F5u9R spacing_mr15__D66Nv spacing_mb15__4Sawg spacing_pr30__J0kZ7 spacing_pl30__01iHm Button_clickable__DqoNe Button_responsiveButton__9BBRz Button_color-shadow__0beQR Link_link__Ime8c spacing_noMargin__F5u9R"
            href="/ru-ru/"
          >
            <span className="Button_text__Yp1Qo">To the main page</span>
          </a>
        </>
      )}
    </div>
  );
};
