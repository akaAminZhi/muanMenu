import toast from "react-hot-toast";
// const API_URL = "http://129.211.24.58:8000";

const API_URL = "http://192.168.1.161:8000";

export async function getTodayMenu() {
  const res = await fetch(`${API_URL}/todaymenu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (res.status === 500) return "data not found";

  if (!res.ok) throw Error("Failed getting menu");

  const { menu } = await res.json();
  return menu;
}

export async function createMenu(newMenu) {
  try {
    const res = await fetch(`${API_URL}/createmenu`, {
      method: "POST",
      body: JSON.stringify(newMenu),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // throw Error();
      const data = await res.json();
      if (data.code === 400) return data;
      throw Error();
    }
    const data = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateMenu(updateObj) {
  try {
    const localUpdateObj = {
      menu: updateObj.updateMenuObj,
    };
    // console.log(updateObj);
    // console.log("id:", id);
    const res = await fetch(`${API_URL}/updatemenu/${updateObj.id}`, {
      method: "PATCH",
      body: JSON.stringify(localUpdateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    toast.success("Update Done");
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}

export async function getWeeksMenu(weeks) {
  // console.log(weeks);

  const res = await fetch(`${API_URL}/weekmenu/${weeks}`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (res.status === 500) return "data not found";

  if (!res.ok) throw Error("Failed getting menu");

  const { menus } = await res.json();

  return menus;
}
