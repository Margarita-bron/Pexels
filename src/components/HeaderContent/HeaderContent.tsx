// import "./HeaderContent.module.css"

import { TITLE } from '../Header/constants';
import { useFetchCuratedPhotosQuery } from '../Photos/store/slices';
import React from 'react';
import { IPhoto } from '../Photos/store/types';
import { SearchBar } from '../SearchBar/SearchBar';
import { IFiltersProperties } from '../Photos/components/FilterContainer/types';

export const HeaderContent: React.FC<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filters: IFiltersProperties;
}> = ({ search, setSearch, filters }) => {
  const { data } = useFetchCuratedPhotosQuery({
    page: 1,
    per_page: 10,
    ...filters,
  });

  const randomPhoto: IPhoto | null = React.useMemo(() => {
    if (!data?.photos.length) return null;
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    return data.photos[randomIndex];
  }, [data]);
  const headerStyle = randomPhoto
    ? {
        backgroundImage: `url(${randomPhoto.src.large})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <div className="header" style={headerStyle}>
      <div className="header-content">
        <h1 className="header-content_title text__color-white">{TITLE}</h1>
        <SearchBar search={search} setSearch={setSearch} />
        <a
          data-testid="author-link"
          className="photo-img_author-link"
          href={randomPhoto ? randomPhoto.photographer_url : ''}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="author-link_span text__color-white">
            <span className="photo-by_span">Photo by — </span>
            {randomPhoto ? randomPhoto.photographer : ''}
          </span>
        </a>
      </div>
    </div>
  );
};
