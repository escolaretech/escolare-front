import create from "zustand";

export const useModal = create((set: any) => ({
  productModal: null,
  setProductModal: (productId: number | null) =>
    set({ productModal: productId }),
}));

interface ProductAtCart {
  id: number;
  hash: string;
  nome: string;
  descricao: string;
  image: string;
  qtd: number;
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

const initialCart: ProductAtCart[] = [];

export const useCart = create((set: any, get: any) => ({
  cartOpen: false,
  handleCartOpen: (open: boolean) => set({ cartOpen: open }),
  cart: initialCart,
  addProduct: (product: ProductAtCart) =>
    set({ cart: [...get().cart, product] }),
  removeProduct: (hash: string) =>
    set({
      cart: get().cart.filter((item: ProductAtCart) => item.hash !== hash),
    }),
  emptyCart: () => set({ cart: [] }),
  addQtd: (hash: string) =>
    set({
      cart: get().cart.map((item: ProductAtCart) => {
        if (hash == item.hash) {
          return {
            ...item,
            qtd: item.qtd + 1,
          };
        }
        return item;
      }),
    }),
  removeQtd: (hash: string) =>
    set({
      cart: get().cart.map((item: ProductAtCart) => {
        if (hash == item.hash) {
          return {
            ...item,
            qtd: item.qtd - 1,
          };
        }
        return item;
      }),
    }),
}));
