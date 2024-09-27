import { useReducer, useRef, useState } from "react";
import { updateMenu } from "../../services/apiMenu";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import Button from "../../ui/Button";

function reducer(state, action) {
  switch (action.type) {
    case "editMorning":
      return { ...state, morning: action.payload };
    case "editNoon":
      return { ...state, noon: action.payload };
    case "editEvening":
      return { ...state, evening: action.payload };
    case "editBringToOffice":
      return { ...state, bringToOffice: action.payload };
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
  // console.log(format(parseISO(menu.date), "MM-dd-E"));
  return (
    <div>
      <div className="m-2  flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Monring</label>
        <input
          className="input grow rounded-xl px-2"
          type="text"
          id="morning"
          value={state.morning}
          onChange={(e) =>
            dispatch({ type: "editMorning", payload: e.target.value })
          }
          required
        />
      </div>

      <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Noon</label>
        <input
          className="input grow rounded-xl px-2"
          type="text"
          id="noon"
          value={state.noon}
          onChange={(e) =>
            dispatch({ type: "editNoon", payload: e.target.value })
          }
          required
        />
      </div>

      <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Evening</label>
        <input
          className="input grow rounded-xl px-2"
          type="text"
          id="evening"
          value={state.evening}
          onChange={(e) =>
            dispatch({ type: "editEvening", payload: e.target.value })
          }
        />
      </div>

      <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Bring to Office</label>
        <input
          className="input grow rounded-xl px-2"
          type="text"
          id="bringToOffice"
          value={state.bringToOffice}
          onChange={(e) =>
            dispatch({ type: "editBringToOffice", payload: e.target.value })
          }
        />
      </div>
      <div className=" flex justify-around">
        <Button disabled={isUpdating} type="primary" onClick={handleEdit}>
          {isUpdating ? "Submitting...." : `Submite`}
        </Button>
      </div>
    </div>
  );
}

export default WeekMenuItemUpdate;
