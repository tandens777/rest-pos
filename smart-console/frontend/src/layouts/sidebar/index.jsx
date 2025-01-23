import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi"; // Logout icon
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom"; // Remove useNavigate
//------Sidebar icons --------
import { BiHandicap } from "react-icons/bi";//surcharge discounts logo
import { BiDonateHeart } from "react-icons/bi";
import { BiSolidDiscount } from "react-icons/bi";
import { TbDiscount } from "react-icons/tb";

import { BiCreditCard } from "react-icons/bi";//payment logo
import { BiDollarCircle } from "react-icons/bi";

import { BiGroup } from "react-icons/bi";//employee logo
import { BiGridAlt } from "react-icons/bi";//apps logo
import { BiCog } from "react-icons/bi"; //settings logo
import { BiBuildings } from "react-icons/bi";//company
import { BiRestaurant } from "react-icons/bi"; //food menu
import { BiPackage } from "react-icons/bi";//ingredients
import { BiColorFill } from "react-icons/bi";
import { BiFridge } from "react-icons/bi";
import { MdOutlineScale } from "react-icons/md";//foodscale

import { LiaPeopleCarrySolid } from "react-icons/lia";//food department


import companyLogo from "../../assets/images/smartPOS.png";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  // Get the username and role from localStorage
  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "CASHIER"; // Default to CASHIER if role is not set

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

    const adminMenus = [
      {
        name: "Company",
        icon: BiBuildings,
        link: "/company",
      },
      {
        name: "Employees",
        icon: BiGroup,
        link: "/employees",
      },
      {
        name: "Food Station",
        icon: LiaPeopleCarrySolid,
        link: "/food-station",
      },
      {
        name: "Food Menu",
        icon: BiRestaurant,
        link: "/food-menu",
      },
      {
        name: "Ingredients",
        icon: BiFridge,
        link: "/ingredients",
      },
      {
        name: "Unit of Measure",
        icon: MdOutlineScale,
        link: "/unit-of-measure",
      },
      {
        name: "Payment Method",
        icon: BiCreditCard,
        link: "/payment-method",
      },
      {
        name: "Surcharge/Discounts",
        icon: BiHandicap,
        link: "/surcharge-discounts",
      },
      {
        name: "Food Delivery Apps",
        icon: BiGridAlt,
        link: "/food-delivery-apps",
      },
    ];
  const managerMenus = [
    {
      name: "Change PIN",
      icon: SlSettings,
      link: "/change-pin",
    },
    {
      name: "Branch Food Menu",
      icon: AiOutlineAppstore,
      link: "/branch-food-menu",
    },
    {
      name: "Ingredients Intake",
      icon: HiOutlineDatabase,
      link: "/ingredients-intake",
    },
    {
      name: "Stock Inventory",
      icon: TbReportAnalytics,
      link: "/stock-inventory",
    },
    {
      name: "Down Payment",
      icon: RiBuilding3Line,
      link: "/down-payment",
    },
  ];

  const reportingSubMenus = [
    {
      name: "Sales",
      icon: TbReportAnalytics,
      menus: ["daily-sales", "monthly-sales", "yearly-sales"],
    },
    {
      name: "Stock Management",
      icon: HiOutlineDatabase,
      menus: ["stock-in", "stock-out", "stock-adjustment"],
    },
    {
      name: "Price List",
      icon: RiBuilding3Line,
      menus: ["product-pricing", "discounts", "promotions"],
    },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("username"); // Remove username from localStorage
    localStorage.removeItem("role"); // Remove role from localStorage
    window.location.reload(); // Force a page refresh
  };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <img
            src={companyLogo}
            width={45}
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-xl whitespace-pre">SMARTConsole</span>
            <span className="text-xs text-gray-500">Ver 1.0.0</span> {/* Version number */}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            {/* Render menus based on role */}
            {role === "ADMIN" ? (
              // ADMIN menu
              <>
                {adminMenus.map((menu) => (
                  <li key={menu.name}>
                    <NavLink to={menu.link} className="link">
                      <menu.icon size={23} className="min-w-max" />
                      {menu.name}
                    </NavLink>
                  </li>
                ))}
                {/* Keep Settings for ADMIN */}
                <li>
                  <NavLink to="/settings" className="link">
                    <SlSettings size={23} className="min-w-max" />
                    Settings
                  </NavLink>
                </li>
              </>
            ) : ["CASHIER", "MANAGER", "SUPERVISOR"].includes(role) ? (
              // MANAGER, CASHIER, SUPERVISOR menu
              <>
                {managerMenus.map((menu) => (
                  <li key={menu.name}>
                    <NavLink to={menu.link} className="link">
                      <menu.icon size={23} className="min-w-max" />
                      {menu.name}
                    </NavLink>
                  </li>
                ))}
                {(open || isTabletMid) && (
                  <div className="border-y py-5 border-slate-300">
                    <small className="pl-3 text-slate-500 inline-block mb-2">
                      Reporting
                    </small>
                    {reportingSubMenus?.map((menu) => (
                      <div key={menu.name} className="flex flex-col gap-1">
                        <SubMenu data={menu} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Other roles (only Change PIN)
              <li>
                <NavLink to="/change-pin" className="link">
                  <SlSettings size={23} className="min-w-max" />
                  Change PIN
                </NavLink>
              </li>
            )}
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Welcome, {username}</p> {/* Display the username */}
                  <small>You are logged in</small>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 py-1.5 px-3 text-xs bg-red-50 rounded-xl flex items-center gap-2 hover:bg-red-100 transition-colors"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;