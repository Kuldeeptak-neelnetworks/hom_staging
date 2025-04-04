"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadcrumbSection from "@/components/common/BreadcrumbSection";
import {
  BuildingIconSVG,
  EmailIconSVG,
  MobileIconSVG,
  PhoneIconSVG,
  UserIconSVG,
} from "@/utils/SVGs/SVGs";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TimezoneSelect, { type ITimezone } from "react-timezone-select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  baseInstance,
  errorToastingFunction,
  successToastingFunction,
} from "@/common/commonFunctions";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import AnimationForm from "@/components/common/Animation/AnimationForm";

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
  {
    id: 3,
    title: "Edit User Details",
    link: "",
  },
];

interface UserDetailType {
  id: number;
  fullName: string;
  email: string;
  role: string;
  mobileNo: string;
  address: string;
  jobtitle: string;
  timeZone: string;
  avatar: string;
  // password: string;
}

const EditUserContent = () => {
  const router = useRouter();
  const { userId } = useParams();

  const [isUserValid, setIsUserValid] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailType | null>(null);
  const [userPreview, setUserPreview] = useState<string>("");
  const [userPic, setUserPic] = useState<string>("");
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone | any>({
    label: "",
    value: "",
  });

  useEffect(() => {
    if (userDetails?.avatar) {
      setUserPreview(userDetails?.avatar);
    }
  }, [userDetails]);

  const handleAvtarChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserPic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPreview(reader.result as string);
        formik.setFieldValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getAbbreviation = (timezone: string): string | null => {
    if (timezone.includes("GMT")) {
      return "gmt";
    } else if (timezone.includes("IST")) {
      return "ist";
    } else if (timezone.includes("CET")) {
      return "cet";
    } else if (timezone.includes("EST")) {
      return "est";
    } else if (timezone.includes("CST")) {
      return "cst";
    } else if (timezone.includes("MST")) {
      return "mst";
    } else if (timezone.includes("PST")) {
      return "pst";
    } else {
      return null;
    }
  };

  const getUserDetails = async () => {
    try {
      const result = await baseInstance.get(`/users/${userId}`);
      if (result.status === 200) {
        const userData = result?.data?.data as UserDetailType;
        setUserDetails(userData);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        errorToastingFunction(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (userDetails?.timeZone) {
      setSelectedTimezone({
        label: userDetails.timeZone,
        value: userDetails.timeZone, // Adjust as per your TimezoneSelect component requirements
      });
    }
  }, [userDetails]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: userDetails?.fullName || "",
      email: userDetails?.email || "",
      role: userDetails?.role || "",
      mobileNo: userDetails?.mobileNo || "",
      address: userDetails?.address || "",
      jobtitle: userDetails?.jobtitle || "",
      timeZone: userDetails?.timeZone || "",
      avatar: userDetails?.avatar || "",
      // password: userDetails?.password ? "********" : "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Name Required"),
      // password: Yup.string()
      //   .min(8, "Must be 8 characters or more")
      //   .max(20, "Not More than 20 Characters")
      //   .required("Password Required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("Email Required"),
      role: Yup.string().required("User Role Required"),
      // timeZone: Yup.string().required("Time Zone Required"),
      // mobileNo: Yup.string()
      //   .required("Contact No. Required")
      //   .matches(/^[0-9]{10}$/, "Must be a 10-digit number"),
      jobtitle: Yup.string().required("Job title Required"),
      // address: Yup.string().required("Address Required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsUserValid(() => true);
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append("mobileNo", values.mobileNo);
        formData.append("address", values.address);
        formData.append("jobtitle", values.jobtitle);
        formData.append("timeZone", values.timeZone);
        // formData.append("password", values.password);

        // if (values.timeZone) {
        //   const abbreviation = getAbbreviation(values.timeZone);
        //   if (abbreviation) {
        //     formData.append("timeZone", abbreviation);
        //   }
        // }
        if (userPic) {
          formData.append("avatar", userPic);
        }

        const response = await baseInstance.patch(
          `/users/update/${userId}`,
          formData
        );

        if (response?.status === 200) {
          successToastingFunction(response?.data?.message);
          setIsUserValid(() => false);
          getUserDetails();
          router.push("/users");
        } else {
          alert("Something went Wrong !!");
        }
      } catch (error: any) {
        if (error?.response && error?.response?.data) {
          errorToastingFunction(error?.response?.data.message);
        } else {
          errorToastingFunction(error?.response?.data.message);
        }
      } finally {
        setIsUserValid(() => false);
      }
    },
  });
  // const handleTimezoneChange = (value: ITimezone | null) => {
  //   setSelectedTimezone(value || { label: "", value: "" });
  //   formik.setFieldValue("timeZone", value ? value.value : null);
  // };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldTouched,
  } = formik;
  return (
    <div className="px-4 py-0 relative">
      <div className="text-xl font-semibold absolute top-[-32px]">
        {userDetails?.fullName ? userDetails?.fullName : "loading..."}
      </div>
      {/* <div className="mb-4">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}
      <motion.div
        initial={{ opacity: 0, x: -50, rotate: -5, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className=" flex gap-5 justify-center "
      >
        <ScrollArea className="h-[80vh]   sm:px-3 sm:py-3 w-[100%] xl:w-[75vw]">
          <form
            onSubmit={handleSubmit}
            className="border p-6 text-[0.8rem] bg-[#fff] boxShadow"
          >
            <div className="lg:flex gap-5">
              {/* full Name  */}
              <AnimationForm className="mb-3 w-full">
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white ">
                  Name
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{
                      borderColor: "#2e8b57",
                      boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                    }}
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Name"
                    className="w-full border border-[lightseagreen] bg-transparent py-2 pl-3  pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {touched.fullName && errors.fullName ? (
                    <div className="text-red-500 text-[0.8rem] pl-2">
                      {errors.fullName}
                    </div>
                  ) : null}

                  <span className="absolute right-4 top-2">
                    <UserIconSVG />
                  </span>
                </div>
              </AnimationForm>
              {/* Email  */}
              <AnimationForm className="mb-3 w-full" fromLeft={false}>
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                  Email Address
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{
                      borderColor: "#2e8b57",
                      boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                    }}
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter Your Email"
                    className="w-full border border-[lightseagreen] bg-transparent py-2 pl-3  pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-500 text-[0.8rem] pl-2">
                      {errors.email}
                    </div>
                  ) : null}

                  <span className="absolute right-4 top-[0.6rem]">
                    <EmailIconSVG />
                  </span>
                </div>
              </AnimationForm>
            </div>

            <div className="lg:flex gap-5">
              {/* Role  */}
              <AnimationForm className="mb-5 w-full">
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                  Role
                </label>
                <motion.div
                  className="relative"
                  whileHover={{
                    borderColor: "#2e8b57",
                    boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                  }}
                >
                  <Select
                    onValueChange={(value: any) =>
                      formik.setFieldValue("role", value)
                    }
                    // onBlur={formik.handleBlur}
                    value={formik.values.role}
                    // id="userRoles"
                    name="role"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="salesman">Sales Person</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {touched.role && errors.role ? (
                    <div className="text-red-500">{errors.role}</div>
                  ) : null}
                </motion.div>
              </AnimationForm>
              {/* Mobile No.  */}
              <AnimationForm className="mb-5 w-full" fromLeft={false}>
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                  Mobile No.
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{
                      borderColor: "#2e8b57",
                      boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                    }}
                    type="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobileNo}
                    id="mobileNo"
                    name="mobileNo"
                    placeholder="Enter Your Mobile Number"
                    className="w-full   border border-[lightseagreen] bg-transparent py-2 pl-3  pr-10  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {touched.mobileNo && errors.mobileNo ? (
                    <div className="text-red-500 text-[0.8rem] pl-2">
                      {errors.mobileNo}
                    </div>
                  ) : null} */}

                  <span className="absolute right-4 top-2">
                    <MobileIconSVG />
                  </span>
                </div>
              </AnimationForm>
            </div>

            <div className="lg:flex gap-5">
              {/* TimeZone  */}
              <AnimationForm className="mb-5 w-full">
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                  Time Zone
                </label>
                <motion.div
                  className="relative"
                  whileHover={{
                    borderColor: "#2e8b57",
                    boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                  }}
                >
                  <TimezoneSelect
                    className="w-full  border border-stroke bg-transparent  text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={selectedTimezone}
                    name="timeZone"
                    id="timeZone"
                    onChange={(value) => {
                      setSelectedTimezone({
                        label: value.label,
                        value: value.value,
                      });
                      formik.setFieldValue("timeZone", value.label);
                      setFieldTouched("timeZone", true);
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.timeZone && errors.timeZone ? (
                    <div className="text-red-500 text-[0.8rem] pl-2">
                      {errors.timeZone}
                    </div>
                  ) : null}
                </motion.div>
              </AnimationForm>
              {/* jobtitle */}
              <AnimationForm className="mb-3 w-full" fromLeft={false}>
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                  Job Title
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{
                      borderColor: "#2e8b57",
                      boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                    }}
                    type="text"
                    id="jobtitle"
                    name="jobtitle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.jobtitle}
                    placeholder="Job Title"
                    className="w-full   border border-[lightseagreen] bg-transparent py-2 pl-3  pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {touched.jobtitle && errors.jobtitle ? (
                    <div className="text-red-500 text-[0.8rem] pl-2">
                      {errors.jobtitle}
                    </div>
                  ) : null}
                </div>
              </AnimationForm>
            </div>

            <div className="lg:flex gap-5">
              {/* Address */}
              <AnimationForm className="mb-3 w-full">
                <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                  Address
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{
                      borderColor: "#2e8b57",
                      boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                    }}
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    placeholder="Enter Address"
                    className="w-full  border border-[lightseagreen] bg-transparent py-2 pl-3  pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {touched.address && errors.address ? (
                    <div className="text-red-500 text-[0.8rem] pl-2">
                      {errors.address}
                    </div>
                  ) : null}
                </div>
              </AnimationForm>
            </div>

            {/* Avatar */}
            <AnimationForm className="mb-3" fromLeft={false}>
              <label className="mb-2.5 block font-medium text-[#29354f] dark:text-white">
                Avatar
              </label>
              <div className="relative">
                <motion.input
                  whileHover={{
                    borderColor: "#2e8b57",
                    boxShadow: "0px 0px 4px rgba(46, 139, 87, 0.6)",
                  }}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleAvtarChange}
                  id="avatar"
                  name="avatar"
                  placeholder="choose your Avatar"
                  className="w-full cursor-pointer border border-[lightseagreen] bg-transparent py-2 pl-3  pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {userPreview && (
                  <div className="mt-2">
                    <img
                      src={userPreview}
                      alt="Avatar Preview"
                      className="h-[80px] w-[80px] object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </AnimationForm>

            <div className="my-6 ">
              <Button
                type="submit"
                className="lg:w-[6vw] w-full cursor-pointer  border border-primary bg-[#004d4b] hover:bg-[#004d4b] hover:scale-[95%] px-4 py-1 text-white transition hover:bg-opacity-90 text-md"
              >
                {isUserValid ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default EditUserContent;
