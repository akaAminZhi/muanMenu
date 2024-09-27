import { getTodayMenu } from "../../services/apiMenu";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";

function Menu() {
  const query = useQuery({
    queryKey: ["todaymenu"],
    queryFn: () => getTodayMenu(),
  });
  if (query.status === "pending") {
    return <Loader></Loader>;
  }
  const { morning, noon, evening, bringToOffice } = query.data;
  const divStyle = "flex justify-between border-gray-400 border-b-2";

  return (
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
    </div>
  );
}

export async function loader() {
  const menu = await getTodayMenu();
  return menu;
}

export default Menu;
