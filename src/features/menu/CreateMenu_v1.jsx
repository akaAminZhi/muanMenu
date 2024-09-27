import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, redirect, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { createMenu } from "../../services/apiMenu";
import { format } from "date-fns";

function CreateMenu() {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  const weeks = format(new Date(), "I");
  const isSubmitting = navigation.state === "submitting";

  //   const [morning, setMorning] = useState("")
  //   const [noon, setNoon] = useState("")
  //   const [evning, setEvning] = useState("")
  //   const [bringToOffice, setBrtingToOffice] = useState("")

  return (
    <div>
      <Form method="POST">
        <DatePicker
          className="m-2 text-center rounded-xl px-6"
          name="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd"
        ></DatePicker>
        <div className="m-2  flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Monring</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            name="morning"
            defaultValue=""
            required
          />
        </div>

        <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Noon</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            name="noon"
            defaultValue=""
            required
          />
        </div>

        <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Evening</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            name="evening"
            defaultValue=""
          />
        </div>

        <div className="m-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Bring to Office</label>
          <input
            className="input grow rounded-xl px-2"
            type="text"
            name="bringToOffice"
            defaultValue=""
          />
        </div>
        <div className=" flex justify-around">
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Submitting...." : `Submite`}
          </Button>
          <input
            className="px-4 py-3 md:px-6 md:py-4 inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
            type="reset"
            value="Reset"
          />
        </div>
        <input type="hidden" name="weeks" value={weeks} />
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
  };
  //   console.log(order);
  const returnData = await createMenu(order);
  //   console.log(returnData);

  // If everything is okay, create new order and redirect
  //   return redirect("/createmenu");
  return null;
}

export default CreateMenu;
