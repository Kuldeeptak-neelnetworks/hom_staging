"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import AddLeadDialoge from "./components/AddLeadDialoge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BreadcrumbSection from "../common/BreadcrumbSection";
import { useLeadStore } from "@/Store/LeadStore";
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

import Select from "react-select";
import PageHeader from "../common/PageHeader";
import makeAnimated from "react-select/animated";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomPagination from "../CustomPagination/CustomPagination";
import { debounce } from "lodash";

const animatedComponents = makeAnimated();

const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Leads",
    link: "/leads",
  },
];

const LeadsContent: React.FC = () => {
  const { fetchAllLeadData, leadData, loading }: any = useLeadStore();
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");
  const router = useRouter();
  const [allLeads, setAllLeads] = useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");

  const [filters, setFilters] = useState<any>({
    outcome: [],
  });

  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const pathname = usePathname();

  const outcome = [
    { label: "Appointement Made", value: "Appointement Made" },
    { label: "Callback", value: "Callback" },
    { label: "Not Interseted", value: "Not Interseted" },
    { label: "Old Client", value: "Old Client" },
    { label: "Arrange an Appointment", value: "Arrange an Appointment" },
  ];

  useEffect(() => {
    if (
      leadData === "Invalid refresh token" ||
      leadData === "User not found" ||
      leadData === "Invalid User Access Token" ||
      leadData === "Invalid access token" ||
      leadData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setAllLeads(leadData ? leadData?.leads || [] : []);
      setTotalPages(leadData?.totalPages);
    }
  }, [leadData?.leads, leadData, router]);

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
      fetchAllLeadData({
        page,
        limit,
        searchInput,
        filters,
      });
    }, 500),
    [fetchAllLeadData, filters, page, limit]
  );

  useEffect(() => {
    fetchAllLeadData({
      page,
      limit,
      searchInput,
      filters,
    });
  }, [page, limit, searchInput, filters, fetchAllLeadData]);

  useEffect(() => {
    if (searchInput !== "") {
      debouncedSearch(searchInput);
    } else {
      fetchAllLeadData({ page, limit, searchInput, filters });
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch, page, limit, filters, fetchAllLeadData]);
  // ==========================================================

  const data = useMemo(() => allLeads, [allLeads]);
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
    <div className="px-4 py-2 relative">
      {/* <div className="mb-1">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}

      <div className="w-[300px] lg:absolute z-[50] mt-2">
        <Select
          className="text-[0.8rem] boxShadow"
          classNamePrefix="react-select-custom-styling"
          closeMenuOnSelect={true}
          isClearable
          components={animatedComponents}
          options={outcome}
          // value={filters.outcome}
          onChange={(selectedOption: any) => {
            const selectedValues = selectedOption ? selectedOption.value : [];
            setFilters((prev: any) => ({
              ...prev,
              outcome: selectedValues,
            }));
            setPage(1);
          }}
          placeholder="Select an Outcome"
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />
        <div className="flex justify-normal lg:justify-end ">
          <Link href={"/leads/addLead"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#004d4b] hover:bg-[#fff] hover:text-[#29354f] boxShadow hover:border-[#004d4b]"
            >
              New Lead
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        text="lead"
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
        data={allLeads}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LeadsContent;
