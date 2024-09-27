import { format, parseISO } from "date-fns";
import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import WeekMenuItemUpdate from "./WeekMenuItemUpdate";
import Item from "../../ui/Item";

function WeekMenuItemClapesVersion({ menu }) {
  const [showDetail, setShowDetail] = useState(false);
  const itemStyle = "";
  const menuItemStyle = "flex gap-x-1";

  const morning = menu.morning.split("+");
  const noon = menu.noon.split(/[+， ]/).join("，");
  const evening = menu.evening.split(/[+， ]/);
  const bringToOffice = menu.bringToOffice.split(/[+， ]/);
  console.log(noon);
  return (
    <>
      <div className="flex max-w-5xl   px-4 py-2 flex-col">
        {/* <Button type={"round"}>←</Button> */}
        <button
          className="bg-yellow-500 rounded-lg"
          onClick={() => setShowDetail((state) => !state)}
        >
          <div className={itemStyle}>
            {<span>{format(parseISO(menu.date), "MM-dd-E")}</span>}
            <span className="px-2">{showDetail ? "-" : "+"}</span>
          </div>
        </button>
        {showDetail && (
          <div className="grow">
            <div className={menuItemStyle}>
              🥐 Moring:
              {/* {morning &&
                morning.map((item) => (
                  <span
                    key={item}
                    className={
                      item ? "rounded-lg px-1 m-1  bg-yellow-50 shadow-md" : ""
                    }
                  >
                    {item}
                  </span>
                ))} */}
              <Item iterms={morning} hasButton={false}></Item>
            </div>
            <div className={menuItemStyle}>
              🍚 Noon:<span>{noon}</span>
              {/* {noon?.map((item) => (
                <span
                  key={item}
                  className={
                    item ? "rounded-lg px-1 m-1  bg-yellow-50 shadow-md" : ""
                  }
                >
                  {item}
                </span>
              ))} */}
              {/* <Item iterms={noon} hasButton={false}></Item> */}
            </div>
            <div className={menuItemStyle}>
              🎃 Evening: <Item iterms={evening} hasButton={false}></Item>
            </div>
            <div className={menuItemStyle}>
              🥙 Bring to Office:{" "}
              <Item iterms={bringToOffice} hasButton={false}></Item>
            </div>
            <div className="flex justify-center">
              <Modal>
                <Modal.Open opens="create-menu">
                  <Button type="small">Update</Button>
                </Modal.Open>
                <Modal.Window name="create-menu">
                  <WeekMenuItemUpdate menu={menu}></WeekMenuItemUpdate>
                </Modal.Window>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WeekMenuItemClapesVersion;
