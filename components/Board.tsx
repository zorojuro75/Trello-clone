"use client";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedbyColumn";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import supabase from "@/config/supabase";

type Props = {
  search: string;
};

interface TaskState {
  todo: any[];
  inProgress: any[];
  done: any[];
}

const Board = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [allTasks, setAllTasks] = useState<TaskState | null>(null);

  function closeModal() {
    setIsOpen(false);
    setModalTask(null);
  }
  function openModal(task: any) {
    setModalTask(task);
    setIsOpen(true);
  }
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getTodosGroupedByColumn();
      setAllTasks(tasks);
    };

    fetchData();
  }, []);

  async function updateTaskStatus(taskId: string, newStatus: string) {
    const { data, error } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("title", taskId);
  
    if (error) {
      console.error("Error updating task status:", error);
    }
    const updatedTasks = await getTodosGroupedByColumn();
    setAllTasks(updatedTasks);
    return data;
  }

  return (
    <div>
      {allTasks ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
          <div className="shadow-2xl rounded-lg p-5 flex flex-col mx-5 md:mx-0 h-min">
            <div className="flex justify-between items-center pb-2 font-bold">
              <div>To Do</div>
              
            </div>
            {allTasks.todo.map((task, index) => {
              if (
                props.search &&
                !task.title
                  .toLowerCase()
                  .includes(props.search.toLocaleLowerCase())
              )
                return null;
              return (
                <div
                  key={index}
                  className="border-b py-2 flex justify-between items-center"
                >
                    <div>{task.title}</div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateTaskStatus(task.title, "inprogress")}
                        className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        Update Status
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(task)}
                        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                      >
                        Details
                      </button>
                    </div>
                    
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black/25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                {modalTask?.title}
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  {modalTask?.description}
                                </p>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Close
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                  
                </div>
              );
            })}
          </div>
          <div className="shadow-2xl rounded-lg p-5 flex flex-col mx-5 md:mx-0 h-min">
            <div className="flex justify-between items-center pb-2 font-bold">
              <div>In Progress</div>
            </div>
            {allTasks.inProgress.map((task, index) => {
              if (
                props.search &&
                !task.title
                  .toLowerCase()
                  .includes(props.search.toLocaleLowerCase())
              )
                return null;
              return (
                <div
                  key={index}
                  className="border-b py-2 flex justify-between items-center"
                >
                  <div>{task.title}</div>
                  <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateTaskStatus(task.title, "done")}
                        className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        Update Status
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(task)}
                        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                      >
                        Details
                      </button>
                    </div>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black/25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                {modalTask?.title}
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  {modalTask?.description}
                                </p>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Close
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </div>
              );
            })}
          </div>
          <div className="shadow-2xl rounded-lg p-5 flex flex-col mx-5 md:mx-0 h-min">
            <div className="flex justify-between items-center pb-2 font-bold">
              <div>Done</div>
            </div>
            {allTasks.done.map((task, index) => {
              if (
                props.search &&
                !task.title
                  .toLowerCase()
                  .includes(props.search.toLocaleLowerCase())
              )
                return null;
              return (
                <div
                  key={index}
                  className="border-b py-2 flex justify-between items-center"
                >
                  <div>{task.title}</div>
                  <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateTaskStatus(task.title, "inprogress")}
                        className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        Update Status
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(task)}
                        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                      >
                        Details
                      </button>
                    </div>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black/25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                {modalTask?.title}
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  {modalTask?.description}
                                </p>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Close
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Board;
