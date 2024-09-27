import { Link, useLoaderData } from "react-router-dom";
import { getTodayMenu } from "../../services/apiMenu";
import MenuItem from "./MenuItem";
import Button from "../../ui/Button";

function Menu() {
  const { morning, noon, evening, bringToOffice } = useLoaderData();
  //   console.log(menu);
  const divStyle = "flex justify-between border-gray-400 border-b-2";
  // if (!morning && !noon && !evening)
  //   return (
  //     <Link
  //       to="/createmenu"
  //       className="border-2 rounded-xl px-2 py-2 bg-yellow-500"
  //     >
  //       Click Here To Create Menu😎
  //     </Link>
  //   );
  return (
    // <ul className="divide-y divide-stone-200 px-2">
    //   {menu.map((pizza) => (
    //     <MenuItem pizza={pizza} key={pizza.id} />
    //   ))}
    // </ul>
    <div className="flex max-w-lg m-auto shadow-2xl border-x-4 px-4 py-2 rounded-2xl">
      {/* <Button type={"round"}>←</Button> */}
      <div className="grow">
        <div className={divStyle}>
          🥐Moring <span>{morning}</span>
        </div>
        <div className={divStyle}>
          🍚Noon <span>{noon}</span>
        </div>
        <div className={divStyle}>
          🎃Evening <span>{evening}</span>
        </div>
        <div className={divStyle}>
          🥙Bring to Office <span>{bringToOffice}</span>
        </div>
      </div>
      {/* <Button type="round">→</Button> */}
    </div>
  );
}

export async function loader() {
  const menu = await getTodayMenu();
  return menu;
}

export default Menu;
