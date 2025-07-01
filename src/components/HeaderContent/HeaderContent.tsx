// import "./HeaderContent.module.css"

import { TITLE } from '../Header/constants';
import { useFetchCuratedPhotosQuery } from '../Photos/store/slices';
import React from 'react';
import { IPhoto } from '../Photos/store/types';
import { SearchBar } from '../SearchBar/SearchBar';
import { IFiltersProperties } from '../Photos/components/FilterContainer/types';
import { popularTopics } from '../Photos/store/themes';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();
  const handleSubmit = (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: string,
  ): void => {
    event.preventDefault();
    void navigate(`/search?query=${encodeURIComponent(value.trim())}`);
  };

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

  const topics = getRandomItems(popularTopics);
  const topicsToLower = topics.map((word) => (word = word.toLowerCase()));
  return (
    <div className="header" style={headerStyle}>
      <div className="header-content">
        <h1 className={`header-content_title text__color-white white-color`}>
          {TITLE}
        </h1>
        <SearchBar search={search} setSearch={setSearch} />
        <div className="topics-wrapper white-color">
          <span>Suggested: </span>
          {topicsToLower.map((word, index) => (
            <a
              key={index}
              className="topic-link"
              onClick={(event) => {
                event.preventDefault();
                handleSubmit(event, word);
              }}
            >
              {word}
              {index === 6 ? '' : <span>, </span>}
            </a>
          ))}
        </div>
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

function getRandomItems(array: string[]): string[] {
  const newArray = [...array];
  const result: string[] = [];
  for (let index = 0; index <= 6; index++) {
    if (newArray.length === 0) break;
    const randomIndex = Math.floor(Math.random() * newArray.length);
    const [item] = newArray.splice(randomIndex, 1);
    result.push(item);
  }
  return result;
}
