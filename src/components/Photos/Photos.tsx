import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useFetchCuratedPhotosQuery,
  useSearchPhotosQuery,
} from './store/slices';
import { PER_PAGE } from './constants';
import '../../styles/index';
import {
  IParameters,
  IPhoto,
  IPhotoSize,
  ISearchParameters,
  PhotoImage,
} from './store/types';

export const Photos: React.FC = () => {
  const [search] = useState('');
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<
    (IPhoto & { size: keyof IPhotoSize })[]
  >([]);
  const [likedPhotoIds, setLikedPhotoIds] = useState<Set<number>>(new Set());

  const searchParameters = useMemo<ISearchParameters>(() => {
    return { query: search, page, per_page: PER_PAGE };
  }, [search, page]);

  const curatedParameters = useMemo<IParameters>(() => {
    return { page, per_page: PER_PAGE };
  }, [page]);

  const {
    data: curatedData,
    isFetching: isCuratedFetching,
    isLoading: isCuratedLoading,
    error: curatedError,
  } = useFetchCuratedPhotosQuery(curatedParameters);

  const {
    data: searchData,
    isFetching: isSearchFetching,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchPhotosQuery(searchParameters);

  const photos =
    search.trim() === ''
      ? (curatedData?.photos ?? [])
      : (searchData?.photos ?? []);

  const isInitialLoading =
    search.length > 0 ? isSearchLoading : isCuratedLoading;
  const isFetching = search.length > 0 ? isSearchFetching : isCuratedFetching;
  const error = search.length > 0 ? searchError : curatedError;

  const observer = useRef<IntersectionObserver | null>(null);
  const firstLoad = useRef(true);
  const container = useRef<HTMLDivElement | null>(null);

  const columns = React.useMemo(() => {
    const cols: { photo: IPhoto; size: keyof IPhotoSize }[][] = [[], [], []];
    for (const [index, photoWithSize] of allPhotos.entries()) {
      cols[index % 3].push({
        photo: photoWithSize,
        size: photoWithSize.size,
      });
    }
    return cols;
  }, [allPhotos]);

  useEffect(() => {
    if (photos.length === 0) return;

    if (page === 1) {
      const photosWithSize = photos.map((p) => ({
        ...p,
        size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
      }));
      setAllPhotos(photosWithSize);
    } else {
      setAllPhotos((previous) => {
        const newPhotos = photos
          .filter((p) => !previous.some((previous_) => previous_.id === p.id))
          .map((p) => ({
            ...p,
            size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
          }));
        return [...previous, ...newPhotos];
      });
    }
  }, [photos, page]);

  useEffect(() => {
    const stored = localStorage.getItem('likedPhotoIds');
    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every((item) => typeof item === 'number')
        ) {
          setLikedPhotoIds(new Set(parsed));
        }
      } catch (error_) {
        console.error(
          'Failed to parse likedPhotoIds from localStorage',
          error_,
        );
      }
    }
  }, []);

  const toggleLike = (photoId: string): void => {
    setLikedPhotoIds((previous) => {
      const photo = Number(photoId);
      const newSet = new Set(previous);
      if (newSet.has(photo)) {
        newSet.delete(photo);
      } else {
        newSet.add(photo);
      }
      localStorage.setItem('likedPhotoIds', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

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
        { threshold: 0.5 },
      );

      if (node) observer.current.observe(node);
    },
    [isFetching],
  );

  const DownloadUrl: React.FC<{ photo: IPhoto }> = ({ photo }) => {
    const buttonHandle = async (): Promise<void> => {
      try {
        const response = await fetch(photo.download_url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const temporaryLink = document.createElement('a');
        temporaryLink.href = objectUrl;
        temporaryLink.download = `photo-${photo.id}.jpg`;
        document.body.append(temporaryLink);
        temporaryLink.click();
        temporaryLink.remove();

        URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('download failed', error);
      }
    };
    return (
      <button
        title="Download"
        className="button download-button"
        onClick={() => {
          void buttonHandle();
        }}
      >
        <span className="download-button-container">
          <svg
            className="download-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="m12 17.5-6.875-6.875L7.05 8.63125l3.575 3.57505V1h2.75v11.2063l3.575-3.57505 1.925 1.99375L12 17.5ZM3.75 23c-.75625 0-1.40365-.2693-1.94219-.8078C1.26927 21.6536 1 21.0063 1 20.25v-4.125h2.75v4.125h16.5v-4.125H23v4.125c0 .7563-.2693 1.4036-.8078 1.9422-.5386.5385-1.1859.8078-1.9422.8078H3.75Z" />
          </svg>
          <span className="download-button_text">Download</span>
        </span>
      </button>
    );
  };

  const PhotoImage: React.FC<PhotoImage> = ({
    photo,
    size /*aspectRatio*/,
  }) => {
    return (
      <img className="photo" src={photo.src[size]} alt={photo.photographer} />
    );
  };
  //const aspectRatios = ['3/2', '3/4'];
  const sizeOptions: (keyof IPhotoSize)[] = ['medium', 'tiny'];
  const lastPhotoId =
    allPhotos.length > 0 ? allPhotos[allPhotos.length - 1].id : null;

  return (
    <div className="catalog">
      {error && <p className="error-loading">Loading</p>}

      <div ref={container} className="photos-wrapper">
        {columns.map((columnPhotos, colIndex) => (
          <div key={colIndex} className="photo-column">
            {columnPhotos.map(({ photo, size }) => {
              const isLastPhoto = photo.id === lastPhotoId;

              return (
                <div
                  key={photo.id}
                  className="photo-img"
                  ref={isLastPhoto ? lastPhotoReference : null}
                >
                  <PhotoImage photo={photo} size={size} />
                  <div className="overlay"></div>
                  <div className="upper-media_overlay">
                    <button
                      title="Collect"
                      data-hoveronly="true"
                      className="media-button button"
                    >
                      <svg
                        className="icon__color-white"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M19.8474 22.9996c-.2869 0-.5698-.102-.7908-.2969l-7.2934-6.4323-7.29346 6.4323c-.3454.3053-.8421.3829-1.26908.1982-.42631-.1841-.70066-.5958-.70066-1.0505V2.14923C2.5 1.51433 3.02763 1 3.67895 1H21.0263v2.29847H4.8579V19.2608l6.1145-5.3928c.4486-.3964 1.1328-.3964 1.5816 0l6.1144 5.3928V5.92529h2.3579V21.8504c0 .4547-.2743.8664-.7006 1.0505-.1533.0667-.3165.0987-.4783.0987Z" />
                      </svg>
                    </button>
                    <button
                      className={`media-button button ${likedPhotoIds.has(Number(photo.id)) ? 'button_color-strawberry' : ''}`}
                      aria-disabled="false"
                      title="Like"
                      data-hoveronly={
                        likedPhotoIds.has(Number(photo.id)) ? '' : 'true'
                      }
                      onClick={(): void => {
                        toggleLike(photo.id);
                      }}
                    >
                      <span className="">
                        <svg
                          className="icon__color-white"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path d="M12.0001 21.6125c-.3065 0-.6003-.1225-.8158-.3399l-8.16405-8.2294C1.54327 11.5661.835892 9.73644 1.03214 7.89391c.19368-1.82393 1.23712-3.47214 2.86224-4.52264 2.50438-1.61935 6.41002-1.5302 9.06512 2.49348l.9774 1.51097-1.9304 1.24802-.9716-1.50199C9.23852 4.39804 6.77971 4.24476 5.1424 5.30167c-1.03959.67147-1.70465 1.70529-1.82457 2.83467-.12314 1.15502.33733 2.29086 1.33075 3.28486l7.35152 7.4105 7.3476-7.4073c.9967-.9966 1.4571-2.1324 1.3346-3.28742-.1198-1.13002-.7849-2.16321-1.8245-2.83531-.9767-.63171-2.1651-.776-3.256-.40083-.213.07375-.6151.26936-.9152.44508l-1.1634-1.9817c.3643-.2142.9165-.49382 1.3289-.63619 1.7668-.60798 3.6806-.3739 5.2537.64324 1.6252 1.0505 2.6686 2.69934 2.8622 4.52328.1957 1.84189-.5117 3.67155-1.9919 5.15175l-8.1602 8.2263c-.2155.2174-.5092.3399-.8158.3399Z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div data-hoveronly="true" className="lower-media_overlay">
                    <a
                      data-testid="next-link"
                      title={photo.photographer}
                      className="photographer-link"
                      href={photo.photographer_url}
                    >
                      <div
                        className="photographer-link_wrapper"
                        data-open="false"
                      >
                        {photo.photographer}
                      </div>
                    </a>

                    <DownloadUrl photo={photo} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="spinner-wrapper">
        {isInitialLoading ||
          (isFetching && (
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          ))}
      </div>
    </div>
  );
};
