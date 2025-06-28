// import "./DataTable.module.css"

export const DataTable: React.FC<{ totalResult: number }> = ({
  totalResult,
}) => {
  console.log(totalResult);
  let totalNumber = '';
  if (totalResult >= 1000) {
    totalNumber = `${(totalResult / 1000).toFixed(1)} thousand`;
  }

  return (
    <div>
      <a
        data-testid="next-link"
        className="data-table-tab data-table-tab_active"
        href="/ru-ru/search/new/"
      >
        Photo
        <span className="tab_number">{totalNumber}</span>
      </a>
      <a
        data-testid="next-link"
        className="data-table-tab"
        href="/ru-ru/search/new/"
      >
        Video
        <span className="tab_number">0</span>
      </a>
      <a
        data-testid="next-link"
        className="data-table-tab"
        href="/ru-ru/search/new/"
      >
        Users
        <span className="tab_number">0</span>
      </a>
    </div>
  );
};
