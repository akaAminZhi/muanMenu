import { Link } from "react-router-dom";
// import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header className="flex items-center justify-between  border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest border-b">
        Muan menu Co.
      </Link>

      <Link
        to="/weekmenu"
        className="hover:text-slate-500 tracking-widest text-sm capitalize "
      >
        This week menus
      </Link>
      <Link
        to="/weekmenu?nextweek=yes"
        className="hover:text-slate-500 tracking-widest text-sm capitalize "
      >
        Next week menus
      </Link>

      {/* <SearchOrder /> */}
    </header>
  );
}

export default Header;
