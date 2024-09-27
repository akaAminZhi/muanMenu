import { useReducer, useRef, useState } from "react";
import { updateMenu } from "../../services/apiMenu";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";

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

function WeekMenuItem({ menu }) {
  const cellStyle =
    "flex min-h-28 justify-center items-center border-b-2 text-slate-800";
  const [disableTextarea, setDisableTextarea] = useState(true);
  const [hiddenButton, setHiddenButton] = useState(true);
  const initState = {
    morning: menu.morning,
    noon: menu.noon,
    evening: menu.evening,
    bringToOffice: menu.bringToOffice,
    weeks: menu.weeks,
    date: menu.date,
  };
  const [state, dispatch] = useReducer(reducer, initState);

  const textareaRef = useRef(null);
  const queryClient = useQueryClient();
  const handleEdit = function () {
    setDisableTextarea(false);
    setHiddenButton(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };
  const handleDone = function () {
    console.log(state);
    setDisableTextarea(true);
    setHiddenButton(true);
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
    <>
      {/* <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          isFocused ? "block" : "hidden"
        }`}
      ></div> */}
      <div className={cellStyle}>{format(parseISO(menu.date), "MM-dd-E")}</div>
      {/* <div className={cellStyle}> */}

      <textarea
        className={cellStyle + "  bg-transparent  p-2 resize-none "}
        disabled={disableTextarea}
        type="text"
        name="morning"
        value={state.morning}
        onChange={(e) =>
          dispatch({ type: "editMorning", payload: e.target.value })
        }
        ref={textareaRef}
        required
      />

      {/* </div> */}

      <textarea
        className={cellStyle + "  bg-transparent  p-2 resize-none "}
        disabled={disableTextarea}
        type="text"
        value={state.noon}
        onChange={(e) =>
          dispatch({ type: "editNoon", payload: e.target.value })
        }
        required
      />
      <textarea
        className={cellStyle + "  bg-transparent  p-2 resize-none "}
        disabled={disableTextarea}
        type="text"
        name="morning"
        value={state.evening}
        onChange={(e) =>
          dispatch({ type: "editEvening", payload: e.target.value })
        }
        required
      />
      <textarea
        className={cellStyle + "  bg-transparent  p-2 resize-none "}
        disabled={disableTextarea}
        type="text"
        name="morning"
        value={state.bringToOffice}
        onChange={(e) =>
          dispatch({ type: "editBringToOffice", payload: e.target.value })
        }
        required
      />
      <div className="border-b-2 flex justify-center items-center">
        <button
          onClick={() => handleEdit()}
          className={`border-1 bg-green-200 rounded-full  text-xs focus:ring focus:bg-green-400 focus:ring-green-400 focus:ring-offset-2 focus:outline-none duration-500 ${
            !hiddenButton
              ? "opacity-0 invisible h-0 px-0 py-0"
              : "opacity-100 visible h-auto px-4 py-2"
          }
          overflow-hidden
          `}
        >
          {!hiddenButton ? "" : "Edit"}
        </button>
        <button
          onClick={() => handleDone()}
          className={`border-1 bg-green-200 rounded-full   text-xs focus:ring focus:bg-green-400 focus:ring-green-400 focus:ring-offset-2 focus:outline-none duration-500 ${
            hiddenButton
              ? "opacity-0 invisible h-0 px-0 py-0"
              : "opacity-100 visible h-auto px-4 py-2"
          }
          overflow-hidden
          `}
        >
          {hiddenButton ? "" : "Done"}
        </button>
      </div>
    </>
  );
}

export default WeekMenuItem;
