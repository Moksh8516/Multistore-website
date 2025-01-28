import React, { useEffect, Fragment, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../app/constant.js";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandAsync,
  fetchCategoryAsync,
  fetchProductsByFilterAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
} from "./ProductSlice";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: false },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "XS", label: "XS", checked: false },
        { value: "S", label: "S", checked: false },
        { value: "M", label: "M", checked: false },
        { value: "L", label: "L", checked: false },
        { value: "XL", label: "XL", checked: false },
        { value: "2XL", label: "2XL", checked: false },
      ],
    },
    {
      id: "Price",
      name: "Price",
      options: [
        { value: "50", label: "50", checked: false },
        { value: "100000", label: "100000", checked: false },
      ],
    },
  ];

  const handleFilter = (e, section, option) => {
    // update according to backend
    const newFilter = { ...filter };
    // console.log(e.target.checked);
    if (e.target.checked) {
      newFilter[section.id] = option.value;
    } else {
      delete newFilter[section.id];
    }
    // ToDo: support multiple categories sorting
    setFilter(newFilter);
  };

  const handleSorting = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    // console.log(pagination);
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    dispatch(fetchBrandAsync());
    dispatch(fetchCategoryAsync());
  }, []);

  return (
    <div className="bg-white ">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <p
                              onClick={(e) => handleSorting(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop responsive */}
          <section aria-labelledby="products-heading" className="pb-16 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <SortingSection filters={filters} handleFilter={handleFilter} />

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Product content */}
                <ProductContent products={products} filters={filters} />
              </div>
            </div>
          </section>

          {/* Pagination  */}
          <div className="flex justify-center m-4">
            <PaginationStack Page={handlePage} page={page} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductList;

function SortingSection({ filters, handleFilter }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        onChange={(e) => handleFilter(e, section, option)}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
      {/* new add items */}
    </form>
  );
}

function ProductContent({ products, filters }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8 xl:max-w-[90rem]">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4 2xl:gap-x-12">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product._id}`}
              className="group shadow-lg shadow-gray-300 rounded-lg  pb-2"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 xl:aspect-h-8 xl:aspect-w-7 2xl:aspect-h-12 2xl:aspect-w-10 ">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:opacity-75 "
                />
              </div>
              <h3 className="mt-4 pl-3 text-sm font-bold text-gray-700 md:text-base xl:text-lg 2xl:text-xl">
                {product.brand}
              </h3>
              <h3 className="mt-4 pl-3 text-sm text-gray-700 md:text-base xl:text-lg 2xl:text-xl">
                {product.title}
              </h3>
              <div className="flex p-1 gap-1 items-center ">
                <p className="mt-1 pl-3 text-sm font-medium text-gray-700 2xl:text-xl">
                  M.R.P :
                </p>
                <p className="mt-1 pl-1 text-lg font-medium line-through text-gray-500 2xl:text-xl">
                  ₹ {parseInt(product.price)}
                </p>
                <p className="mt-1 pl-1 text-lg font-medium text-red-600 2xl:text-xl">
                  -{product.discountPercentage}%
                </p>
              </div>
              <p className="mt-1 pl-3 text-lg font-medium  text-gray-900 2xl:text-xl">
                ₹ $
                {Math.round(
                  product.price * (1 - product.discountPercentage / 100)
                )}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaginationStack({ Page }) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={3}
        color="primary"
        onChange={(e, value) => Page(e, value)}
      />
    </Stack>
  );
}
