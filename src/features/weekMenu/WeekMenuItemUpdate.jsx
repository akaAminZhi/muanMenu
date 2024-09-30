import { useReducer, useRef, useState } from "react";
import { updateMenu } from "../../services/apiMenu";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { HiOutlinePlusSmall, HiCheck } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Item from "../../ui/Item";

function reducer(state, action) {
  switch (action.type) {
    case "editMorning":
      return { ...state, morning: action.payload };
    case "deleteMorningItem":
      const newMonrning = state.morning
        .split(/[+， ]/)
        .filter((item) => item !== action.payload)
        .join("+");
      // console.log(newMonrning);
      return { ...state, morning: newMonrning };
    case "addMorningItem":
      return {
        ...state,
        morning: [
          ...state.morning.split(/[+， ]/).filter((item) => item !== ""),
          action.payload,
        ].join("+"),
      };
    case "editNoon":
      return { ...state, noon: action.payload };
    case "deleteNoonItem":
      return {
        ...state,
        noon: state.noon
          .split(/[+， ]/)
          .filter((item) => item !== action.payload)
          .join("+"),
      };
    case "addNoonItem":
      return {
        ...state,
        noon: [
          ...state.noon.split(/[+， ]/).filter((item) => item !== ""),
          action.payload,
        ].join("+"),
      };
    case "editEvening":
      return { ...state, evening: action.payload };
    case "deleteEveningItem":
      return {
        ...state,
        evening: state.evening
          .split(/[+， ]/)
          .filter((item) => item !== action.payload)
          .join("+"),
      };
    case "addEveningItem":
      return {
        ...state,
        evening: [
          ...state.evening.split(/[+， ]/).filter((item) => item !== ""),
          action.payload,
        ].join("+"),
      };
    case "editBringToOffice":
      return { ...state, bringToOffice: action.payload };
    case "deleteBringToOfficeItem":
      return {
        ...state,
        bringToOffice: state.bringToOffice
          .split(/[+， ]/)
          .filter((item) => item !== action.payload)
          .join("+"),
      };
    case "addBringToOfficeItem":
      return {
        ...state,
        bringToOffice: [
          ...state.bringToOffice.split(/[+， ]/).filter((item) => item !== ""),
          action.payload,
        ].join("+"),
      };
    default:
      throw new Error(" action.type is wrong!");
  }
}

function WeekMenuItemUpdate({ menu }) {
  const cellStyle =
    "flex min-h-28 justify-center items-center border-b-2 text-slate-800";
  const initState = {
    morning: menu.morning,
    noon: menu.noon,
    evening: menu.evening,
    bringToOffice: menu.bringToOffice,
    weeks: menu.weeks,
    date: menu.date,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const [addItem, setAddItem] = useState("");
  const queryClient = useQueryClient();

  const handleEdit = function () {
    mutate({ id: menu.id, updateMenuObj: state });
  };

  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: (id, updateMenuObj) => updateMenu(id, updateMenuObj),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["weekmenus"] });
    },
  });

  const morning =
    state.morning.split(/[+， ]/)[0] === ""
      ? []
      : state.morning.split(/[+， ]/);
  const noon =
    state.noon.split(/[+， ]/)[0] === "" ? [] : state.noon.split(/[+， ]/);
  const evening =
    state.evening.split(/[+， ]/)[0] === ""
      ? []
      : state.evening.split(/[+， ]/);

  const bringToOffice =
    state.bringToOffice.split(/[+， ]/)[0] === ""
      ? []
      : state.bringToOffice.split(/[+， ]/);
  // console.log(morning.length && morning[0] === "");
  // console.log(state.noon.split(/[+， ]/));
  function handleAddItem(type) {
    dispatch({ type: type, payload: addItem });
    setAddItem("");
  }
  function handleOnClick(type, item) {
    dispatch({ type: type, payload: item });
  }
  // console.log(format(parseISO(menu.date), "MM-dd-E"));
  return (
    <div>
      <div className="m-2  flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Monring</label>
        <Item
          iterms={morning}
          handleOnClick={handleOnClick}
          type={"deleteMorningItem"}
        ></Item>
        <UpdateModal
          addItem={addItem}
          setAddItem={setAddItem}
          handleAddItem={() => handleAddItem("addMorningItem")}
        ></UpdateModal>
        {/* <Modal>
          <Modal.Open opens="add-item">
            <button>
              <HiOutlinePlusSmall></HiOutlinePlusSmall>
            </button>
          </Modal.Open>
          <Modal.Window name="add-item">
            <input
              className="input grow rounded-xl px-2"
              type="text"
              value={addItem}
              onChange={(e) => setAddItem(e.target.value)}
            ></input>
            <button onClick={() => handleAddItem("addMorningItem")}>
              <HiCheck></HiCheck>
            </button>
          </Modal.Window>
        </Modal> */}
      </div>

      <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Noon</label>
        <Item
          iterms={noon}
          handleOnClick={handleOnClick}
          type={"deleteNoonItem"}
        ></Item>
        <UpdateModal
          addItem={addItem}
          setAddItem={setAddItem}
          handleAddItem={() => handleAddItem("addNoonItem")}
        ></UpdateModal>
      </div>

      <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Evening</label>
        <Item
          iterms={evening}
          handleOnClick={handleOnClick}
          type={"deleteEveningItem"}
        ></Item>
        <UpdateModal
          addItem={addItem}
          setAddItem={setAddItem}
          handleAddItem={() => handleAddItem("addEveningItem")}
        ></UpdateModal>
      </div>

      <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Bring to Office</label>
        <Item
          iterms={bringToOffice}
          handleOnClick={handleOnClick}
          type={"deleteBringToOfficeItem"}
        ></Item>
        <UpdateModal
          addItem={addItem}
          setAddItem={setAddItem}
          handleAddItem={() => handleAddItem("addBringToOfficeItem")}
        ></UpdateModal>
        {/* <input
          className="input grow rounded-xl px-2"
          type="text"
          id="bringToOffice"
          value={state.bringToOffice}
          onChange={(e) =>
            dispatch({ type: "editBringToOffice", payload: e.target.value })
          }
        /> */}
      </div>
      <div className=" flex justify-around">
        <Button disabled={isUpdating} type="primary" onClick={handleEdit}>
          {isUpdating ? "Submitting...." : `Submite`}
        </Button>
      </div>
    </div>
  );
}

function UpdateModal({ addItem, setAddItem, handleAddItem }) {
  const inputRef = useRef(null);
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [inputRef]);
  return (
    <Modal>
      <Modal.Open opens="add-item" inputRef={inputRef}>
        <button>
          <HiOutlinePlusSmall></HiOutlinePlusSmall>
        </button>
      </Modal.Open>
      <Modal.Window name="add-item">
        <div className="flex justify-between">
          <input
            ref={inputRef}
            className="input  rounded-xl px-2"
            type="text"
            value={addItem}
            onChange={(e) => setAddItem(e.target.value)}
          ></input>
          <button onClick={() => handleAddItem()}>
            <HiCheck></HiCheck>
          </button>
        </div>
      </Modal.Window>
    </Modal>
  );
}
export default WeekMenuItemUpdate;
