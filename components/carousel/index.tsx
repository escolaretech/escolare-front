import { NextPage } from "next";
import { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Carousel: NextPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="carousel rounded relative overflow-hidden">
      <div className="carousel-inner relative overflow-hidden w-full">
        <input
          className="carousel-open"
          type="radio"
          id="carousel-1"
          name="carousel"
          aria-hidden="true"
          hidden
          defaultChecked={true}
        />
        <div
          className="carousel-item absolute opacity-0 bg-center bg-no-repeat h-80"
          style={{
            backgroundImage:
              "url(https://castronaves.vteximg.com.br/arquivos/ids/372917/IBBLskdkbnsdbnkk.jpg)",
          }}
        ></div>
        <label
          htmlFor="carousel-3"
          className="
        control-1
        w-10
        h-10
        ml-2
        md:ml-10
        absolute
        cursor-pointer
        font-bold
        text-black
        hover:text-white
        rounded-full
        bg-white
        hover:bg-blue-700
        leading-tight
        text-center
        z-0
        inset-y-0
        left-0
        my-auto
        flex
        justify-center
        items-center
        overflow-hidden
        border
      "
        >
          <ChevronLeftIcon className="p-1 h-9 w-9" aria-hidden="true" />
        </label>
        <label
          htmlFor="carousel-2"
          className="
        next
        control-1
        w-10
        h-10
        mr-2
        md:mr-10
        absolute
        cursor-pointer
        hidden
        font-bold
        text-black
        hover:text-white
        rounded-full
        bg-white
        hover:bg-blue-700
        leading-tight
        text-center
        z-0
        inset-y-0
        right-0
        my-auto
        overflow-hidden
        border
      "
        >
          <ChevronRightIcon className="p-1 h-9 w-9" aria-hidden="true" />
        </label>

        <input
          className="carousel-open"
          type="radio"
          id="carousel-2"
          name="carousel"
          aria-hidden="true"
          hidden
        />
        <div
          className="carousel-item absolute opacity-0 bg-center bg-no-repeat h-80"
          style={{
            backgroundImage:
              "url(https://castronaves.vteximg.com.br/arquivos/ids/372939/NOVOEPIHFKSDBJ,BJ.jpg)",
          }}
        ></div>
        <label
          htmlFor="carousel-1"
          className="
        control-2
        w-10
        h-10
        ml-2
        md:ml-10
        absolute
        cursor-pointer
        hidden
        font-bold
        text-black
        hover:text-white
        rounded-full
        bg-white
        hover:bg-blue-700
        leading-tight
        text-center
        z-0
        inset-y-0
        left-0
        my-auto
        overflow-hidden
        border
      "
        >
          <ChevronLeftIcon className="p-1 h-9 w-9" aria-hidden="true" />
        </label>
        <label
          htmlFor="carousel-3"
          className="
        next
        control-2
        w-10
        h-10
        mr-2
        md:mr-10
        absolute
        cursor-pointer
        hidden
        font-bold
        text-black
        hover:text-white
        rounded-full
        bg-white
        hover:bg-blue-700
        leading-tight
        text-center
        z-0
        inset-y-0
        right-0
        my-auto
        overflow-hidden
        border
      "
        >
          <ChevronRightIcon className="p-1 h-9 w-9" aria-hidden="true" />
        </label>

        <input
          className="carousel-open"
          type="radio"
          id="carousel-3"
          name="carousel"
          aria-hidden="true"
          hidden
        />
        <div
          className="carousel-item absolute opacity-0 bg-center bg-no-repeat h-80"
          style={{
            backgroundImage:
              "url(https://castronaves.vteximg.com.br/arquivos/ids/372833/testeshimidt.jpg)",
          }}
        ></div>
        <label
          htmlFor="carousel-2"
          className="
        control-3
        w-10
        h-10
        ml-2
        md:ml-10
        absolute
        cursor-pointer
        hidden
        font-bold
        text-black
        hover:text-white
        rounded-full
        bg-white
        hover:bg-blue-700
        leading-tight
        text-center
        z-0
        inset-y-0
        left-0
        my-auto
        overflow-hidden
        border
      "
        >
          <ChevronLeftIcon className="p-1 h-9 w-9" aria-hidden="true" />
        </label>
        <label
          htmlFor="carousel-1"
          className="
        next
        control-3
        w-10
        h-10
        mr-2
        md:mr-10
        absolute
        cursor-pointer
        hidden
        font-bold
        text-black
        hover:text-white
        rounded-full
        bg-white
        hover:bg-blue-700
        leading-tight
        text-center
        z-0
        inset-y-0
        right-0
        my-auto
        overflow-hidden
        border
      "
        >
          <ChevronRightIcon className="p-1 h-9 w-9" aria-hidden="true" />
        </label>

        <ol className="carousel-indicators">
          <li className="inline-block mr-3">
            <label
              htmlFor="carousel-1"
              className="
            carousel-bullet
            cursor-pointer
            block
            text-4xl text-white
            hover:text-blue-700
          "
            >
              •
            </label>
          </li>
          <li className="inline-block mr-3">
            <label
              htmlFor="carousel-2"
              className="
            carousel-bullet
            cursor-pointer
            block
            text-4xl text-white
            hover:text-blue-700
          "
            >
              •
            </label>
          </li>
          <li className="inline-block mr-3">
            <label
              htmlFor="carousel-3"
              className="
            carousel-bullet
            cursor-pointer
            block
            text-4xl text-white
            hover:text-blue-700
          "
            >
              •
            </label>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Carousel;
