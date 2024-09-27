import Menu from "../features/menu/Menu";
import Button from "./Button";
import { format } from "date-fns";
import Modal from "./Modal";
import CreateMenu from "../features/menu/CreateMenu";
function Home() {
  const today = format(new Date(), "yyyy-MM-dd E I");
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <div className="flex justify-between">
        <span>🔖</span> <span>{today}</span>
      </div>
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        Today Muan's menu👶🏻
        <br />
      </h1>
      <Menu></Menu>

      <Modal>
        <Modal.Open opens="create-menu">
          <Button type="small">Create Menu</Button>
        </Modal.Open>
        <Modal.Window name="create-menu">
          <CreateMenu></CreateMenu>
        </Modal.Window>
      </Modal>

      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateMenu></CreateMenu>
        </Modal>
      )} */}
    </div>
  );
}

export default Home;
