import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  useFetchCuratedPhotosQuery,
  useSearchPhotosQuery,
} from './store/slices';
import { PER_PAGE } from './constants';
import './photo.css';
import { IPhoto, IPhotoSize, PhotoImage } from './store/types';

const Photos: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<IPhoto[]>([]);

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

  const photos =
    search.length > 0
      ? (searchData?.photos ?? [])
      : (curatedData?.photos ?? []);

  useEffect(() => {
    if (page === 1) {
      setAllPhotos(photos);
    } else {
      setAllPhotos((previous) => {
        const newPhotos = photos.filter(
          (p) => !previous.some((previousP) => previousP.id === p.id),
        );
        return [...previous, ...newPhotos];
      });
    }
  }, [photos, page]);

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

  const PhotoImage: React.FC<PhotoImage> = ({
    photo,
    size /*aspectRatio*/,
  }) => {
    return (
      <img
        style={{
          /*aspectRatio: aspectRatio,*/
          overflow: 'hidden',
          borderRadius: 8,
        }}
        src={photo.src[size]}
        alt={photo.photographer}
      />
    );
  };
  //const aspectRatios = ['3/2', '3/4'];
  const size: (keyof IPhotoSize)[] = ['medium', 'tiny'];
  const columns: IPhoto[][] = [[], [], []];
  for (const [index, photo] of allPhotos.entries()) {
    columns[index % 3].push(photo);
  }

  const lastPhotoId =
    allPhotos.length > 0 ? allPhotos[allPhotos.length - 1].id : null;

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
        {columns.map((columnPhotos, colIndex) => (
          <div key={colIndex} className="photo-column">
            {columnPhotos.map((photo) => {
              const randomIndex = Math.floor(Math.random() * size.length);
              const randomSize = size[randomIndex];
              const isLastPhoto = photo.id === lastPhotoId;
              //const randomAspectRatio = aspectRatios[randomIndex % aspectRatios.length];

              return (
                <div
                  key={photo.id}
                  className="photo-img"
                  ref={isLastPhoto ? lastPhotoReference : null}
                >
                  <PhotoImage photo={photo} size={randomSize} />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {(isLoading || isFetching) && <p className="loading">Загрузка...</p>}
    </div>
  );
};

export default Photos;
