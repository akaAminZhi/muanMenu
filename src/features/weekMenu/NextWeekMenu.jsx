import { useQuery } from "@tanstack/react-query";
import WeekMenuItem from "./WeekMenuItem";
import { getWeeksMenu } from "../../services/apiMenu";
import { format } from "date-fns";
import Loader from "../../ui/Loader";

// const weekmenu = [
//   {
//     weeks: 36,
//     morning: "香蕉松饼",
//     noon: "西兰花拌胡萝卜，三文鱼玉米海苔拌饭",
//     evening: "清炖羊肉",
//     bringToOffice: "",
//     needBuy: "羊肉，西兰花，香蕉",
//     date: "09-05-2024",
//     notes: "",
//   },
//   {
//     weeks: 36,
//     morning: "香蕉松饼",
//     noon: "西兰花拌胡萝卜，三文鱼玉米海苔拌饭",
//     evening: "清炖羊肉",
//     bringToOffice: "",
//     needBuy: "羊肉，西兰花，香蕉",
//     date: "09-06-2024",
//     notes: "",
//   },
//   {
//     weeks: 36,
//     morning: "香蕉松饼",
//     noon: "西兰花拌胡萝卜，三文鱼玉米海苔拌饭",
//     evening: "清炖羊肉",
//     bringToOffice: "",
//     needBuy: "羊肉，西兰花，香蕉",
//     date: "09-07-2024",
//     notes: "",
//   },
//   {
//     weeks: 36,
//     morning: "香蕉松饼",
//     noon: "西兰花拌胡萝卜，三文鱼玉米海苔拌饭",
//     evening: "清炖羊肉",
//     bringToOffice: "",
//     needBuy: "羊肉，西兰花，香蕉",
//     date: "09-02-2024",
//     notes: "",
//   },
// ];
function NextWeekMenu() {
  const cellStyle = "flex justify-center justify-items-center border-b-2";
  // const weeks = format(new Date(), "yyyy") + format(new Date(), "I");
  let date = new Date();
  date.setDate(date.getDate() + 7);
  const weeks = format(date, "I");
  console.log("next week:", weeks);
  const query = useQuery({
    queryKey: ["weekmenus"],
    queryFn: () => getWeeksMenu(weeks),
  });
  console.log(query);
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

export default NextWeekMenu;
