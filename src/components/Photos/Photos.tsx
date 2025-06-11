import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  useFetchCuratedPhotosQuery,
  useSearchPhotosQuery,
} from './store/slices';
import { PER_PAGE } from './constants';
import './photo.css';
import { PhotoImage } from './store/types';

const Photos: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const {
    data: curatedData,
    isFetching: isCuratedFetching,
    isLoading: isCuratedLoading,
    error: curatedError,
  } = useFetchCuratedPhotosQuery(
    { page, per_page: PER_PAGE },
    { skip: search.length > 0 },
  );

  const {
    data: searchData,
    isFetching: isSearchFetching,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchPhotosQuery(
    { query: search, page, per_page: PER_PAGE },
    { skip: search.length === 0 },
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  const photos =
    search.length > 0
      ? (searchData?.photos ?? [])
      : (curatedData?.photos ?? []);
  const isLoading = search.length > 0 ? isSearchLoading : isCuratedLoading;
  const isFetching = search.length > 0 ? isSearchFetching : isCuratedFetching;
  const error = search.length > 0 ? searchError : curatedError;

  const observer = useRef<IntersectionObserver | null>(null);
  const firstLoad = useRef(true);
  const container = useRef<HTMLDivElement | null>(null);

  const lastPhotoReference = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (firstLoad.current) {
              firstLoad.current = false;
              return;
            }
            console.log('next page load');
            setPage((previous) => previous + 1);
          }
        },
        { threshold: 0.5, root: container.current },
      );

      if (node) observer.current.observe(node);
    },
    [isFetching],
  );

  const PhotoImage: React.FC<PhotoImage> = ({ photo }) => {
    return <img src={photo.src.medium} alt={photo.photographer} />;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск бесплатных изображений"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className="search-input"
      />

      {error && <p className="error-loading">Ошибка загрузки фотографий</p>}

      <div ref={container} className="photos-wrapper">
        {photos.map((photo, index) => {
          if (index === photos.length - 1) {
            return (
              <div
                key={photo.id}
                ref={lastPhotoReference}
                className="photo-img"
              >
                <PhotoImage photo={photo} />
              </div>
            );
          }
          return (
            <div key={photo.id} className="photo-img">
              <PhotoImage photo={photo} />
            </div>
          );
        })}
      </div>

      {(isLoading || isFetching) && <p className="loading">Загрузка...</p>}
    </div>
  );
};

export default Photos;
