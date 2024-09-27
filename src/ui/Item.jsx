import { HiXMark } from "react-icons/hi2";

function Item({ iterms, handleOnClick, type, hasButton = true }) {
  return (
    <>
      {iterms &&
        iterms.map((item) => (
          <span
            key={item}
            className={
              item ? "rounded-lg px-1 m-1  bg-yellow-50 shadow-sm" : ""
            }
          >
            {item}
            {hasButton && (
              <button
                className="px-1"
                onClick={() => handleOnClick(type, item)}
              >
                <HiXMark></HiXMark>
              </button>
            )}
          </span>
        ))}
    </>
  );
}

export default Item;
