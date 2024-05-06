import React from "react";

const Hotbar = ({ category, handleHotbarclick }) => {
  return (
    <>
      <div className="flex-between gap-5 w-full flex-wrap">
        <ul className="custom-scrollbar flex gap-2 overflow-auto">
          {category.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleHotbarclick && handleHotbarclick(item)}
              className="px-4 py-3 rounded-lg capitalize whitespace-nowrap"
            >{item}</button>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Hotbar;