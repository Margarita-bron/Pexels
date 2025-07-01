// import "./SerchBar.module.css"

import React from 'react';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}> = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(search);

  React.useEffect(() => {
    setInputValue(search);
  }, [search]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSearch(inputValue.trim());
    if (inputValue.trim() !== '') {
      void navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <form role="search" autoComplete="off" onSubmit={handleSubmit}>
      <div className="search-form-wrapper">
        <button type="button" className="search-form_menu-button">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M21.8507 1H2.14924C1.51428 1 1 1.51464 1 2.14924V16.9254c0 .4713.28789.8946.72599 1.0684.43605.1732.9369.0622 1.26078-.2809l6.46644-6.8782 7.25469 7.7151 1.6746-1.5744-2.9638-3.1517 2.3595-1.7872 2.9232 2.2141v6.4509H1V23h20.8507C22.4856 23 23 22.4856 23 21.8507V2.14924C23 1.51464 22.4856 1 21.8507 1Zm-3.3785 8.6787c-.4104-.31103-.9774-.31103-1.3878 0l-3.2493 2.4609-3.5449-3.76983c-.43353-.46241-1.23965-.46174-1.67453 0l-5.3172 5.65553V3.29851H20.7014v8.06859l-2.2292-1.6884Z"></path>
          </svg>
          <span>Photo</span>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M24 24H0V0h24v24z" fill="none" />
            <path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"></path>
          </svg>
        </button>
        <input
          id="search"
          type="search"
          placeholder="Search for free images"
          value={inputValue}
          onChange={handleInputChange}
          className="search-form_input"
        />
        <button type="submit" className="search-form_button-icon clicable-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M17.2146 15.5642c-.0007-.0007-.0013-.0013-.002-.0026 0-.0006-.0013-.0006-.0013-.0006 0-.0006-.0013-.0013-.0013-.0013s-.0006-.0013-.0013-.0013c0 0-.0006-.0013-.0013-.0013 0-.0006-.0013-.0013-.0013-.0013 0-.0006-.0014-.0013-.0014-.0013l-.0013-.0013-.0013-.0013-.0012-.0013c-.002-.0026-.0013-.0013-.0013-.0013-.002-.0027-.0013-.0013-.0013-.0013-.002-.0021-.0013-.0014-.0013-.0014-.0026 0-.0013-.0013-.0013-.0013-.0005-.0004-.0009-.0007-.0013-.0007 0-.0019-.0007-.0013-.0013-.0013 0-.0019-.0013-.0013-.0013-.0013 0-.0007-.0013-.0013-.0013-.0013 0-.0006-.0013-.0012-.0013-.0012l-.0013-.0013-.0014-.0013c-.0026-.002-.0013-.0013-.0013-.0013-.0019-.002-.0013-.0013-.0013-.0013-.0004-.0005-.0008-.0007-.0013-.0007.0007-.0019-.0013-.0013-.0013-.0019 0-.0027-.0019-.0013-.0019-.0013l-.0013-.0014c-.4585-.4207-1.1704-.409-1.6139.0352-.0391.0385-.0743.0795-.1069.1224-1.3396 1.2824-3.0929 1.9865-4.9536 1.9865-1.9142 0-3.71502-.7457-5.06971-2.0998-1.35402-1.3547-2.09976-3.1555-2.09976-5.0696 0-2.01319.8545-3.94622 2.34465-5.30286 1.32147-1.20359 3.03501-1.86661 4.82482-1.86661 1.5832 0 3.0844.50541 4.3402 1.46151 1.7982 1.37031 2.8292 3.45119 2.8292 5.70796 0 .4083-.0345.8167-.1023 1.2133l2.3017.3921c.0892-.5263.1348-1.0662.1348-1.6054 0-2.99143-1.3664-5.74835-3.7489-7.5648C14.5925 1.67083 12.6028 1 10.5037 1c-2.37271 0-4.64441.87925-6.39639 2.47492C2.1326 5.27313 1 7.83467 1 10.5037c0 2.5381.98866 4.9244 2.78362 6.72 1.79562 1.7949 4.18195 2.7836 6.72008 2.7836 2.1453 0 4.1819-.706 5.8446-2.0079L21.3496 23 23 21.3496l-5.7854-5.7854Z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};
