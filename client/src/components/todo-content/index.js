import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Label from "../Label";
import Aggrid from "../ag-grid";
import Button from "../Button";
import Dialog from "../dialog";
import Menu from "../menu";
import Chip from "../chip";
import Autocomplete from "../autocomplete";
import Textfield from "../Textfield";
import AddTodoDialogContent from "../add-todo-dialog-content";
import todoService from "../../services/todoService";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingIcon from "@mui/icons-material/Pending";
import { displaySnackbar } from "../snackbar/displaySnackbar";
import { confirmDialog } from "../dialog/confirmDialog";
import { formatDate } from "../../utils/dateUtils";
import { AppContext } from "../../AppContext";
import classes from "./index.module.css";

const TodoContent = () => {
  // const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [status, setStatus] = useState("All");
  const [searchTask, setSearchTask] = useState("");
  const [searchDate, setSearchDate] = useState(formatDate(new Date()));

  const addTodoDialogContentRef = useRef();
  const horizonIconRef = useRef();
  const taskRef = useRef();
  const addTodoRef = useRef();

  const { user } = useSelector((state) => state.user);

  const { updateLoading } = useContext(AppContext);

  const defaultColDef = { flex: 1 };

  const applyFilterHandler = useCallback(async () => {
    if (searchDate && (searchDate.length !== 10 || !searchDate.includes("/"))) {
      return displaySnackbar({
        message: "Please select a valid date.",
        type: "error",
      });
    }
    try {
      updateLoading(true);
      const payload = {
        user_id: user?.user_id,
        task: searchTask,
        created_date: searchDate,
        is_completed:
          status === "Pending" ? false : status === "Completed" ? true : null,
      };
      const response = await todoService.filterTodos(payload);
      if (response?.status === 200) {
        setTodos(response?.result);
      }
    } finally {
      updateLoading(false);
    }
  }, [searchDate, searchTask, status, updateLoading, user?.user_id]);

  const deleteTodoHandler = useCallback(() => {
    return confirmDialog({
      dialogTitle: "Delete Todo",
      dialogTitleIcon: <DeleteIcon />,
      dialogContent: (
        <Label
          variant="body1"
          labelText={`Are you sure you want to delete this ${selectedTodo?.task}?`}
        />
      ),
      okButtonLabel: "Delete",
      cancelButtonLabel: "Don't Delete",
      onOk: async () => {
        try {
          updateLoading(true);
          const response = await todoService.deleteTodo({
            id: selectedTodo?.id,
            user_id: user?.user_id,
          });
          if (response?.status === 200) {
            displaySnackbar({
              message: "Todo deleted successfully.",
              type: "success",
            });
            setSelectedTodo(null);
            setOpenMenu(false);
            applyFilterHandler();
          }
        } finally {
          updateLoading(false);
        }
      },
    });
  }, [
    applyFilterHandler,
    selectedTodo?.id,
    selectedTodo?.task,
    updateLoading,
    user?.user_id,
  ]);

  const columnDefs = useMemo(() => {
    return [
      {
        headerName: "TASK",
        field: "task",
      },
      {
        headerName: "DESCRIPTION",
        field: "description",
      },
      {
        headerName: "CREATED DATE",
        field: "created_date",
        valueGetter: (params) => {
          return formatDate(params.data?.created_date);
        },
      },
      {
        headerName: "STATUS",
        field: "is_completed",
        cellRenderer: (params) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label={params.value ? "Completed" : "Pending"}
                color={params.value ? "success" : "warning"}
              />
            </div>
          );
        },
        filter: "agTextColumnFilter",
      },
      {
        flex: 0.2,
        cellRenderer: (params) => {
          return (
            <MoreHorizIcon
              ref={horizonIconRef}
              sx={{ cursor: "pointer" }}
              onClick={(e) => {
                setOpenMenu(true);
                setSelectedTodo(params.data);
                setCoordinates({
                  left: e.clientX,
                  top: e.clientY,
                });
              }}
            />
          );
        },
      },
    ];
  }, []);

  const getTodosHandler = useCallback(async () => {
    try {
      updateLoading(true);
      const response = await todoService.getTodos(user?.user_id);
      if (response?.status === 200) {
        setTodos(response?.result);
      }
    } finally {
      updateLoading(false);
    }
  }, [updateLoading, user?.user_id]);

  const toggleIsCompletedHandler = useCallback(async () => {
    try {
      updateLoading(true);
      const payload = {
        id: selectedTodo?.id,
        is_completed: !selectedTodo?.is_completed,
      };
      const response = await todoService.updateIsCompleted(payload);
      if (response?.status === 200) {
        displaySnackbar({
          message: response?.result?.is_completed
            ? "Marked as completed."
            : "Marked as pending.",
          type: "success",
        });
        setSelectedTodo(null);
        setOpenMenu(false);
        applyFilterHandler();
      }
    } finally {
      updateLoading(false);
    }
  }, [
    applyFilterHandler,
    selectedTodo?.id,
    selectedTodo?.is_completed,
    updateLoading,
  ]);

  const menuItems = useMemo(() => {
    return [
      {
        label: "Edit",
        onClick: () => {
          setShowAddTodo(true);
        },
        icon: <EditIcon />,
      },
      {
        label: "Delete",
        onClick: deleteTodoHandler,
        icon: <DeleteIcon />,
      },
      {
        label: selectedTodo?.is_completed
          ? "Mark as pending"
          : "Mark as completed",
        onClick: toggleIsCompletedHandler,
        icon: selectedTodo?.is_completed ? <PendingIcon /> : <TaskAltIcon />,
      },
    ];
  }, [deleteTodoHandler, selectedTodo?.is_completed, toggleIsCompletedHandler]);

  const addTodoHandler = useCallback(async () => {
    if (!addTodoDialogContentRef.current?.getPayload()?.task) {
      displaySnackbar({
        message: "Please add task.",
        type: "error",
      });
      taskRef.current.focus();
      return;
    }
    try {
      updateLoading(true);
      const payload = {
        ...addTodoDialogContentRef.current.getPayload(),
        user_id: user?.user_id,
        created_date: new Date().toLocaleDateString("en-GB"),
        id: selectedTodo?.id && selectedTodo?.id,
      };
      const response = await todoService.addTodo(payload);
      if (response?.status === 200) {
        displaySnackbar({
          message: response?.result?.message,
          type: "success",
        });
        setSelectedTodo(null);
        setShowAddTodo(false);
        setOpenMenu(false);
        applyFilterHandler();
      }
    } finally {
      updateLoading(false);
    }
  }, [applyFilterHandler, selectedTodo?.id, updateLoading, user?.user_id]);

  useEffect(() => {
    getTodosHandler();
  }, [getTodosHandler]);

  return (
    <div className={classes["todo-content-container"]}>
      <Label labelText={`Welcome ${user?.name}!`} />
      <Label labelText={`TODO LIST :`} />
      <div className={classes["filter-container"]}>
        <Textfield
          label="SEARCH TASK"
          value={searchTask}
          onChange={(e) => {
            setSearchTask(e.target.value);
          }}
        />
        <Textfield
          label="SEARCH DATE"
          value={searchDate}
          onChange={(e) => {
            setSearchDate(e.target.value);
          }}
        />
        <Autocomplete
          label="STATUS"
          value={status}
          onChange={(e, values) => {
            setStatus(values);
          }}
          options={["All", "Pending", "Completed"]}
          sx={{ width: "16rem" }}
        />
        <Button label="Apply Filter" onClick={applyFilterHandler} />
      </div>
      <div className={classes["todo-list-container"]}>
        <Aggrid
          rowData={todos}
          columnDefs={columnDefs}
          suppressRowClickSelection={true}
          defaultColDef={defaultColDef}
        />
      </div>
      <div className={classes["add-todo-cta"]}>
        <Button
          label="Add TODO"
          sx={{ borderRadius: "16px" }}
          onClick={() => {
            setShowAddTodo(true);
          }}
        />
      </div>
      <Dialog
        open={showAddTodo}
        onClose={() => {
          setShowAddTodo(false);
          setSelectedTodo(null);
        }}
        dialogTitle={`${!selectedTodo ? "Add" : "Edit"} TODO`}
        dialogContent={
          <AddTodoDialogContent
            addTodoRef={addTodoRef}
            ref={addTodoDialogContentRef}
            selectedTodo={selectedTodo}
            taskRef={taskRef}
          />
        }
        dialogActions={
          <div className={classes["add-todo-dialog-cta"]}>
            <Button
              label="CANCEL"
              size="small"
              onClick={() => {
                setShowAddTodo(false);
              }}
            />
            <Button
              label={selectedTodo ? "SAVE" : "ADD"}
              size="small"
              ref={addTodoRef}
              onClick={addTodoHandler}
            />
          </div>
        }
      />
      <Menu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        menus={menuItems}
        coordinates={coordinates}
      />
    </div>
  );
};

export default TodoContent;
