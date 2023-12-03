"use client";
import Image from "next/image";
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Avatar from "react-avatar";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import Board from "./Board";
import { IoMdAddCircle } from "react-icons/io";
import supabase from "@/config/supabase";
type Props = {};

const Header = (props: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [search, setSearch] = useState<string>("");
  const [isForm, setIsForm] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitForm = async () => {
    try {
      const { data, error } = await supabase.from("todos").insert([
        {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          status: "todo",
        },
      ]);

      if (error) {
        console.error("Error submitting form:", error);
      } else {
        console.log("Form submitted successfully:", data);
        // Close the form after submission
        closeForm();
        // Reset form data
        setFormData({ title: "", description: "", date: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  function openForm() {
    setIsForm(true);
  }
  function closeForm() {
    setIsForm(false);
  }
  return (
    <>
      <header>
        <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10">
          <div
            className="
            absolute
            top-0
            left-0
            w-full
            h-[36rem]
            bg-gradient-to-br
            from-pink-400
            to-[#0055D1]
            rounded-md
            filter
            blur-3xl
            opacity-50
            -z-50
        "
          />
          <Image
            src={"/trello.png"}
            alt="trello logo"
            width={200}
            height={100}
            className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
          />
          <div className="flex items-center space-x-5 flex-1 md:justify-end justify-center">
            {/* Search box */}
            <form
              action=""
              className="flex items-center space-x-5 bg-white shadow-md flex-1 md:flex-initial rounded-md"
            >
              <FaMagnifyingGlass className="w-6 h-6 text-gray-400 m-2" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none p-2 rounded-md"
              />
              <button hidden type="submit">
                Search
              </button>
            </form>
            {/* Avatar */}
            <Avatar name="Banna" round size="40" color="#0055D1" />
          </div>
        </div>
        <div className="flex items-center justify-center px-5 py-2 md:py-5">
          <p className="flex gap-2 items-center italic text-sm font-light text-[#0055D1] shadow-xl rounded-xl bg-white max-w-3xl w-fit p-5">
            <FaUserCircle className="h-10 w-10 inline-block text-[#0055D1] mr-1" />
            Your assigned tasks status...
            <IoMdAddCircle
              className="text-green-600 text-3xl cursor-pointer"
              onClick={() => openForm()}
            />
          </p>
        </div>
      </header>
      <Transition appear show={isForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeForm}>
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
                    Add Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <form
                        action=""
                        className="border-0 border-gray-400 grid grid-cols-3 gap-2"
                      >
                        <label htmlFor="title" className="p-2">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Task Title"
                          className="p-2 border rounded border-gray-400 col-span-2"
                        />
                        <label htmlFor="description" className="p-2">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Task Description"
                          className="p-2 border rounded border-gray-400 col-span-2"
                        />
                        <label htmlFor="date" className="p-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          placeholder="Task Completion Date"
                          className="p-2 border rounded border-gray-400 col-span-2"
                        />
                        <div className="col-span-3 flex-1 justify-self-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={submitForm}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Board search={search} />
    </>
  );
};

export default Header;
