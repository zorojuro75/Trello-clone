import supabase from "@/config/supabase";

export const getTodosGroupedByColumn = async () => {
  try {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
      console.error("Error fetching todos:", error);
      return null; // Or handle the error accordingly
    }

    const tasks = data;
    const todoTasks = tasks?.filter((task) => task.status === "todo");
    const inProgressTasks = tasks?.filter((task) => task.status === "inprogress");
    const doneTasks = tasks?.filter((task) => task.status === "done");
    const allTasks = { todo: todoTasks, inProgress: inProgressTasks, done: doneTasks };

    console.log("All Tasks:", allTasks);
    return allTasks;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null; // Or handle the error accordingly
  }
};