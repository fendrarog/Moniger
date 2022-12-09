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

const itemsFromBackend = [
  {
    id: uuid(),
    content: "First task",
  },
  {
    id: uuid(),
    content: "Second task",
  },
  {
    id: uuid(),
    content: "Third task",
  },
  {
    id: uuid(),
    content: "Fourth task",
  },
  {
    id: uuid(),
    content: "Fifth task",
  },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

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

const Kanban: React.FC = () => {
  const { currentColor } = useStateContext();

  const [columns, setColumns] = useState(columnsFromBackend);
  const [lilWidth, setLilWidth] = useState(false);

  const { screenSize, setScreenSize } = useStateContext();

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
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl h-screen">
      <Header category="Page" title="Kanban" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: screenSize! >= 1406 ? "nowrap" : "wrap",
          height: "100%",
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
                              ? "#E7E5E4"
                              : "#F5F5F4",
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
                                        opacity: snapshot.isDragging ? 1 : 0.9,
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
  );
};

export default Kanban;
