"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BreadcrumbSection from "../common/BreadcrumbSection";
import { useUserStore } from "@/Store/UserStore";
import PageHeader from "../common/PageHeader";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import Select from "react-select";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomPagination from "../CustomPagination/CustomPagination";
import { debounce } from "lodash";

// Crumbs Array
const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Users",
    link: "/users",
  },
];

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Salesman", value: "salesman" },
];
const UsersContent: React.FC = () => {
  // Hooks and States
  const router = useRouter();
  const pathname = usePathname();
  const { fetchUsersData, userData, loading } = useUserStore();
  const [allUsers, setAllUsers] = useState<any>([]);
  const [loader, setLoader] = useState(true);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const data = useMemo(() => allUsers, [allUsers]);
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<any>({
    role: [],
  });
  const [isUpdated, setIsUpdated] = useState(false);

  if (data === "Only admins can access this resource") {
    router.push("/auth/login");
  }

  useEffect(() => {
    if (
      userData === "Invalid refresh token" ||
      userData === "User not found" ||
      userData === "Invalid User Access Token" ||
      userData === "Invalid access token" ||
      userData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setAllUsers(userData?.users ? userData?.users || [] : []);
      setTotalPages(userData?.totalPages);
    }
  }, [userData, router]);

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString()); // ✅ Convert to string first

    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  // ==========================
  useEffect(() => {
    if (searchInput !== "") {
      setPage(1);
    }
  }, [searchInput]);

  const debouncedSearch = useCallback(
    debounce((searchInput) => {
      fetchUsersData({
        page,
        limit,
        searchInput,
        filters,
      });
    }, 500),
    [fetchUsersData, filters, page, limit]
  );

  useEffect(() => {
    fetchUsersData({
      page,
      limit,
      searchInput,
      filters,
    });
  }, [page, limit, searchInput, filters, fetchUsersData]);

  useEffect(() => {
    if (searchInput !== "") {
      debouncedSearch(searchInput);
    } else {
      fetchUsersData({ page, limit, searchInput, filters });
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch, page, limit, filters, fetchUsersData]);
  // ==========================

  const tableInstance = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 25, //custom default page size
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
      columnFilters,
    },
    onGlobalFilterChange: setFiltering,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="px-4 py-1 relative">
      {/* <div className="text-xl font-semibold absolute top-[-52px]">Users</div> */}
      {/* <div className="mb-1">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}

      <div className="w-[300px] lg:absolute pt-2 lg:mt-0 z-[100]">
        {/* <Select onValueChange={(value: any) => setRoleValue(value)} name="role">
          <SelectTrigger className="border-[#73819c] boxShadow">
            <SelectValue
              placeholder="Select a Role"
              className="text-[0.8rem] text-gray-50"
            />
          </SelectTrigger>
          <SelectContent className="text-[0.8rem]">
            <SelectGroup>
              <SelectLabel className="text-[0.8rem]">Select</SelectLabel>
              <SelectItem value="all" className="text-[0.8rem] ">
                All
              </SelectItem>
              <SelectItem value="admin" className="text-[0.8rem] ">
                Admin
              </SelectItem>
              <SelectItem value="salesman" className="text-[0.8rem] ">
                Sales Person
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <Select
          className="text-[0.8rem] boxShadow border-none"
          classNamePrefix="react-select-custom-styling"
          closeMenuOnSelect={false}
          isClearable
          components={animatedComponents}
          options={roleOptions}
          // value={filters.outcome}
          onChange={(selectedOption: any) => {
            const selectedValues = selectedOption ? selectedOption.value : [];
            setFilters((prev: any) => ({
              ...prev,
              role: selectedValues,
            }));
            setPage(1);
          }}
          placeholder="Select a Status"
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        {/* {allUsers?.length || allUsers.length > 0 ? (
          <PageHeader tableInstance={tableInstance} />
        ) : (
          ""
        )} */}
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />

        <div className="flex justify-normal lg:justify-end">
          <Link href={"/users/addUser"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#0f464a] hover:bg-[#fff] hover:text-[#0f464a] hover:border-[#004d4b]"
            >
              Add New User
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        text="users"
        queryParams={queryParams ? queryParams : ""}
        columns={columns}
        tableInstance={tableInstance}
        loading={loading}
      />
      <CustomPagination
        setLimit={setLimit}
        limit={limit}
        page={page}
        onPageChange={onPageChange}
        data={allUsers}
        totalPages={totalPages}
      />
    </div>
  );
};

export default UsersContent;
