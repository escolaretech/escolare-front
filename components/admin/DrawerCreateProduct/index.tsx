/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";

export default function DrawerCreateProduct({ open, setOpen }: any) {
  const [nome, setNome] = useState("");
  const [image, setImage] = useState("");
  const [descricao, setDescricao] = useState("");
  const [precoInCents, setPrecoInCents] = useState("");

  function createProduct(event: any) {
    event.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST}/products`, {
        nome,
        image,
        descricao,
        precoInCents: Number(precoInCents),
        encomenda: false,
      })
      .then((result) => {
        setOpen(!open);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {" "}
                      Cadastrar Produto{" "}
                    </Dialog.Title>
                  </div>
                  <form
                    onSubmit={createProduct}
                    className="relative mt-6 flex-1 px-4 sm:px-6"
                  >
                    {/* Replace with your content */}
                    <div className="col-span-6 sm:col-span-4 my-4">
                      <label
                        htmlFor="product-nome"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome do produto
                      </label>
                      <input
                        type="text"
                        name="nome"
                        id="product-nome"
                        autoComplete="nome"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4 my-4">
                      <label
                        htmlFor="product-imagem"
                        className="block text-sm font-medium text-gray-700"
                      >
                        URL da imagem
                      </label>
                      <input
                        type="text"
                        name="imagem"
                        id="product-imagem"
                        autoComplete="imagem"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4 my-4">
                      <label
                        htmlFor="product-descricao"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descricao
                      </label>
                      <textarea
                        name="descricao"
                        id="product-descricao"
                        autoComplete="descricao"
                        required
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>

                    <div className="col-span-6 sm:col-span-4 my-4">
                      <label
                        htmlFor="product-preco"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Preco em centavos
                      </label>
                      <input
                        type="number"
                        name="preco"
                        id="product-preco"
                        autoComplete="preco"
                        value={precoInCents}
                        onChange={(e) => setPrecoInCents(e.target.value)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cadastrar
                      </button>
                    </div>
                    {/* /End replace */}
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
