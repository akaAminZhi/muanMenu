import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "../../ui/Button";
import { createMenu } from "../../services/apiMenu";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CreateMenu() {
  const [date, setDate] = useState(new Date());

  const weeks = format(date, "I");
  const selectDate = format(date, "yyyy-MM-dd");

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm({});

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createMenu,
    onSuccess: (data) => {
      if (data.code === 400) {
        toast.error(data.message);
        return;
      }
      toast.success("New menu successfully created");
      queryClient.invalidateQueries({ queryKey: ["todaymenu"] });
      reset({
        morning: "",
        noon: "",
        evening: "",
        bringToOffice: "",
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  function onSubmit(menu) {
    // console.log(date);
    // console.log({ ...menu, date: selectDate, weeks });
    mutate({ ...menu, date: selectDate, weeks });
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <div>
      <form id="create-menu" onSubmit={handleSubmit(onSubmit, onError)}>
        <DatePicker
          id="date"
          className="m-2 text-center rounded-xl px-6"
          selected={date}
          onChange={(date) => setDate(date)}
        ></DatePicker>
        <div className="m-2  flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Monring</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            id="morning"
            {...register("morning", {
              required: "This field is required",
            })}
            defaultValue=""
            required
          />
        </div>

        <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Noon</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            id="noon"
            {...register("noon", {
              required: "This field is required",
            })}
            defaultValue=""
            required
          />
        </div>

        <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Evening</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            id="evening"
            {...register("evening")}
            defaultValue=""
          />
        </div>

        <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Bring to Office</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            id="bringToOffice"
            {...register("bringToOffice")}
            defaultValue=""
          />
        </div>
        <div className=" flex justify-around">
          <Button disabled={isCreating} type="primary">
            {isCreating ? "Submitting...." : `Submite`}
          </Button>
          <button
            className="px-4 py-3 md:px-6 md:py-4 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
            type="reset"
            id="reset"
          >
            Reset
          </button>
        </div>
        <input type="hidden" name="weeks" value={weeks} id="weeks" />
      </form>
    </div>
  );
}

export default CreateMenu;
