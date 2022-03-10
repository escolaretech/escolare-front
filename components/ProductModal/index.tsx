import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useModal, useCart } from "../../store";
import axios from "axios";

interface Product {
  id: number;
  nome: string;
  descricao: string;
  image: string;
  precoInCents: number;
  encomenda: boolean;
  category: {
    id: number;
    nome: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
  };
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductModal() {
  const { productModal, setProductModal } = useModal();
  const { addProduct } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState<string>();

  const hash = (Math.random() + 1).toString(36).substring(7);

  useEffect(() => {
    if (product) {
      const newPrice = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((product?.precoInCents ?? 0) / 100);

      setPrice(newPrice);
    }
  }, [product]);

  useEffect(() => {
    if (productModal) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_HOST}/products/${productModal}`)
        .then((result) => {
          const { data } = result;

          setProduct(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [productModal]);

  if (!product) {
    return null;
  }

  return (
    <Transition.Root show={!!productModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setProductModal(null)}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
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
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setProductModal(null)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                    <img
                      src={product?.image}
                      alt={product?.nome}
                      className="object-center object-cover"
                    />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                      {product?.nome}
                    </h2>

                    <section
                      aria-labelledby="information-heading"
                      className="mt-2"
                    >
                      <h3 id="information-heading" className="sr-only">
                        Product information
                      </h3>
                      <p className="text-2xl text-gray-900">
                        {product.encomenda ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Consulte o preço sob encomenda
                          </span>
                        ) : (
                          price
                        )}
                      </p>
                    </section>

                    <section
                      aria-labelledby="options-heading"
                      className="mt-10"
                    >
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <div>
                        {/* Colors */}
                        <div>
                          <h4 className="text-sm text-gray-900 font-medium">
                            Descrição:
                          </h4>
                          <p>{product?.descricao}</p>
                        </div>

                        {/* Sizes */}
                        <div className="mt-6">
                          <div className="">
                            <h4 className="text-sm text-gray-900 font-medium">
                              Categoria:
                            </h4>
                            <p>{product?.category?.nome || "sem categoria"}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            addProduct({ ...product, qtd: 1, hash });
                            setProductModal(null);
                          }}
                        >
                          Adicionar ao carrinho
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
