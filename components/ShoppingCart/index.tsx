import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useCart } from "../../store";
import axios from "axios";

export default function ShoppingCart() {
  const {
    cart,
    cartOpen,
    handleCartOpen,
    removeProduct,
    emptyCart,
    addQtd,
    removeQtd,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientMail, setClientMail] = useState("");

  function createOrder(e: any) {
    e.preventDefault();

    const sanCart = cart.map((product) => {
      return {
        price: product.encomenda
          ? "Sob encomenda"
          : new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((product?.precoInCents ?? 0) / 100),
        name: product.nome,
        qtd: product.qtd,
      };
    });

    setIsLoading(true);

    axios
      .post(`http://localhost:3007/order`, {
        clientName,
        clientMail,
        products: sanCart,
      })
      .then((result) => {
        emptyCart();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={() => handleCartOpen(false)}
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

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Carrinho de compras
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => handleCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.map((product) => (
                            <li key={product.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.image}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.nome}</h3>
                                    <p className="ml-4">
                                      {product.encomenda ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          Sob encomenda
                                        </span>
                                      ) : (
                                        new Intl.NumberFormat("pt-BR", {
                                          style: "currency",
                                          currency: "BRL",
                                        }).format(
                                          (product?.precoInCents ?? 0) / 100
                                        )
                                      )}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product?.category.nome}
                                  </p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <div className="flex justify-center items-center space-x-2">
                                    <button
                                      className="px-2 py-1 rounded shadow"
                                      onClick={() => removeQtd(product.hash)}
                                      disabled={product.qtd <= 1}
                                    >
                                      -
                                    </button>
                                    <p className="text-gray-500">
                                      {product.qtd}
                                    </p>
                                    <button
                                      className="px-2 py-1 rounded shadow"
                                      onClick={() => addQtd(product.hash)}
                                    >
                                      +
                                    </button>
                                  </div>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={() =>
                                        removeProduct(product.hash)
                                      }
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => createOrder(e)}
                    className="border-t border-gray-200 py-6 px-4 sm:px-6"
                  >
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                      <p>Orçamento</p>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        className="w-full bg-purple-white shadow rounded border-0 px-3 py-2"
                        placeholder="Nome"
                        disabled={isLoading}
                        value={clientName}
                        onChange={(val) => setClientName(val.target.value)}
                        required
                      />
                      <input
                        type="email"
                        className="w-full bg-purple-white shadow rounded border-0 px-3 py-2"
                        placeholder="E-mail para contato"
                        disabled={isLoading}
                        value={clientMail}
                        onChange={(val) => setClientMail(val.target.value)}
                        required
                      />
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className={`flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                          isLoading
                            ? "bg-gray-600 hover:bg-gray-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? "Enviando dados" : "Fazer orçamento"}
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        ou{" "}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={() => handleCartOpen(false)}
                        >
                          Continuar comprando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
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
