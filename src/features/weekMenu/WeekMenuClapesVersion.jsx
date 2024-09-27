import { useQuery } from "@tanstack/react-query";
import WeekMenuItemClapesVersion from "./WeekMenuItemClapesVersion";
import { getWeeksMenu } from "../../services/apiMenu";
import { format } from "date-fns";
import Loader from "../../ui/Loader";
import { useSearchParams } from "react-router-dom";

function WeekMenuClapesVersion() {
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
    <div className="grid text-sm grid-cols-2  ">
      {weekmenu?.map((menu) => (
        <WeekMenuItemClapesVersion
          menu={menu}
          key={menu.date}
        ></WeekMenuItemClapesVersion>
      ))}
    </div>
  );
}

export default WeekMenuClapesVersion;
