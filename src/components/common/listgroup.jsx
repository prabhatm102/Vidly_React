import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  textProperty,
  valueProperty,
  onItemSelect,
}) => {
  return (
    <ul className="list-group mt-5">
      {items.map((genre) => {
        return (
          <li
            key={genre[valueProperty]}
            className={
              genre.name === selectedItem.name ||
              (genre[textProperty] === "All Genres" &&
                Object.keys(selectedItem).length === 0)
                ? "list-group-item clickable active"
                : "list-group-item clickable"
            }
            onClick={() => onItemSelect(genre)}
          >
            {genre[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
