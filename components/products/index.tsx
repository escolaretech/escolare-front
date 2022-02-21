import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useModal } from "../../store";

const Products = () => {
  const [categorias, setCategorias] = useState<any>([]);
  const { productModal, setProductModal } = useModal();

  useEffect(() => {
    axios
      .get("http://localhost:3007/categorywithproducts")
      .then((result) => {
        const { data } = result;

        setCategorias(data.categorias);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="bg-white">
      {productModal}
      {categorias.map((categoria: any, index: number) => (
        <Fragment key={index}>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-800">
              {categoria.nome}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {categoria.products.map((product: any) => (
                <div
                  key={product.id}
                  className="group relative"
                  onClick={() => setProductModal(product.id)}
                >
                  <div className="w-full bg-gray-50 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <Image
                      src={product.image}
                      alt={product.nome}
                      layout="fill"
                      objectFit="contain"
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.nome}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    {product.encomenda ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Sob encomenda
                      </span>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format((product?.precoInCents ?? 0) / 100)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Products;
