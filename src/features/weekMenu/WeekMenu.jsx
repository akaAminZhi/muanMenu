import { useQuery } from "@tanstack/react-query";
import WeekMenuItem from "./WeekMenuItem";
import { getWeeksMenu } from "../../services/apiMenu";
import { format } from "date-fns";
import Loader from "../../ui/Loader";
import { useSearchParams } from "react-router-dom";

function WeekMenu() {
  const cellStyle = "flex justify-center justify-items-center border-b-2";
  // const weeks = format(new Date(), "yyyy") + format(new Date(), "I");
  const [searchParms, setSearchParms] = useSearchParams();
  const getNextWeekMenus = searchParms.get("nextweek") === "yes";
  let date = new Date();
  if (getNextWeekMenus) date.setDate(date.getDate() + 7);
  const weeks = format(date, "I");
  // console.log(weeks, getNextWeekMenus);
  const query = useQuery({
    queryKey: ["weekmenus", weeks],
    queryFn: () => getWeeksMenu(weeks),
  });
  // console.log(query);
  const weekmenu = query.data;

  if (query.status === "pending") {
    return <Loader></Loader>;
  }
  return (
    <div className="grid text-sm grid-cols-6   border-2 m-2 rounded-md border-b-0">
      <div className={cellStyle}>Date</div>
      <div className={cellStyle}>Morning</div>
      <div className={cellStyle}> Noon</div>
      <div className={cellStyle}> Evening</div>
      <div className={cellStyle}> Bring to office</div>

      <div className={cellStyle}></div>
      {weekmenu?.map((menu) => (
        <WeekMenuItem menu={menu} key={menu.date}></WeekMenuItem>
      ))}
      {/* <WeekMenuItem menu={weekmenu[0]}></WeekMenuItem> */}
    </div>
  );
}

export default WeekMenu;
