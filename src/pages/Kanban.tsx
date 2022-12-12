import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addTodo, refreshColumns } from "../redux/kanbanSlice";

const Kanban: React.FC = () => {
  const { screenSize, setScreenSize, currentColor, currentMode } =
    useStateContext();

  const { columnsFromBackend } = useAppSelector((state) => state.kanban);

  const dispatch = useAppDispatch();

  const [columns, setColumns] = useState(columnsFromBackend);
  const [lilWidth, setLilWidth] = useState(false);
  const [animationAddButton, setAnimationAddButton] = useState(false);

  useEffect(() => {
    setColumns(columnsFromBackend);
  }, [columnsFromBackend]);

  useEffect(() => {
    dispatch(refreshColumns(columns));
  }, [columns, dispatch]);

  const onDragEnd = (
    result: DropResult,
    columns: typeof columnsFromBackend,
    setColumns: React.Dispatch<React.SetStateAction<typeof columnsFromBackend>>
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize) {
      if (screenSize >= 1406 && screenSize < 1730) {
        setLilWidth(true);
      } else {
        setLilWidth(false);
      }
    }
  }, [screenSize]);

  return (
    <div className="p-2 md:p-10 dark:bg-[#20232a]">
      <div className="p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl min-h-screen">
        <Header category="Page" title="Kanban" />
        <div className="relative mb-[110px]">
          <button
            className="absolute flex items-center text-xl rounded-full ease-linear duration-300 overflow-hidden"
            style={{
              backgroundColor: currentColor,
              maxWidth: `${animationAddButton ? "400px" : "35px"}`,
            }}
            onMouseEnter={() => setAnimationAddButton(true)}
            onMouseLeave={() => setAnimationAddButton(false)}
            onClick={() => dispatch(addTodo())}
          >
            <div
              className="absolute top-0 left-0 bottom-0 w-[35px] rounded-full z-10"
              style={{
                backgroundColor: currentColor,
              }}
            ></div>
            <AddCircleOutlineOutlinedIcon
              fontSize="large"
              className="absolute z-20"
              sx={{
                position: "relative",
                color: "white",
                transition: "all 0.3s linear",
                transform: `${animationAddButton && "rotate(-180deg)"}`,
              }}
            />
            <p
              className="whitespace-nowrap ml-2 pr-5 ease-linear duration-300"
              style={{
                fontSize: "18px",
                fontWeight: "400",
                fontFamily: "Open Sans, sans-serif",
                color: "white",
                transform: `${
                  animationAddButton ? "translate(0px)" : "translate(-200px)"
                }`,
                opacity: `${animationAddButton ? "1" : "0"}`,
              }}
            >
              Add kanban todo
            </p>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: screenSize! >= 1406 ? "nowrap" : "wrap",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: lilWidth ? "0 0 190px" : "0 0 300px",
                    margin: 10,
                    maxWidth: lilWidth ? 190 : 300,
                  }}
                  key={columnId}
                >
                  <h2 className="font-semibold text-slate-900 dark:text-slate-200">
                    {column.name}
                  </h2>
                  <div style={{ margin: 8, width: "100%" }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? `${
                                    currentMode === "Light"
                                      ? "#E7E5E4"
                                      : "#272a30"
                                  }`
                                : `${
                                    currentMode === "Light"
                                      ? "#F5F5F4"
                                      : "#2c2f36"
                                  }`,
                              padding: 8,
                              paddingBottom: 50,
                              borderRadius: 10,
                              minHeight: "100%",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          borderRadius: 10,
                                          backgroundColor: `${currentColor}`,
                                          color: "white",
                                          opacity: snapshot.isDragging
                                            ? 1
                                            : 0.9,
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
