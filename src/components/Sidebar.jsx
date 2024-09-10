import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  Logo,
  SidebarAccount,
  SidebarAnalytics,
  SidebarBilling,
  SidebarCompany,
  SidebarHelp,
  SidebarLogout,
  SideBarQrCodeSVG,
} from "./SVGIcon";
import apis from "../services";
import { logout } from "../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  console.log("user", user?.user);
  const [state, setState] = React.useState({
    left: false,
  });
  const [openCompany, setOpenCompany] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);
  const handleCompanyClick = () => {
    setOpenCompany(!openCompany);
  };
  const handleHelpClick = () => {
    setOpenHelp(!openHelp);
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  //LOGOUT API
  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await apis.logout(token);
      toast.success("Logout Successfully");
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 278 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{}} className="logo" onClick={()=>navigate("/")}>
        <Logo color={"#fcfcfc"} />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": {
                opacity: 0.8,
                borderLeft: "4px solid #307fe2",
                backgroundColor: "#0a335c !important",
              },
              borderLeft: "4px solid transparent",
              transition: "all 0.3s ease",
              margin: "0px 30px 0px 30px",
            }}
            component={Link}
            to="/my-qr-codes"
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              {/* <HomeIcon /> */}
              <SideBarQrCodeSVG />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "#fcfcfc",
              }}
              primary={"user listing"}
              className=""
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/my-qr-analytics"
            sx={{
              "&:hover": {
                opacity: 0.8,
                borderLeft: "4px solid #307fe2",
                backgroundColor: "#0a335c !important",
              },
              borderLeft: "4px solid transparent",
              transition: "all 0.3s ease",
              margin: "0px 30px 0px 30px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <SidebarAnalytics />
            </ListItemIcon>
            <ListItemText
              primary={"user billing"}
              sx={{
                color: "#fcfcfc",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": {
                opacity: 0.8,
                borderLeft: "4px solid #307fe2",
                backgroundColor: "#0a335c !important",
              },
              borderLeft: "4px solid transparent",
              transition: "all 0.3s ease",
              margin: "0px 30px 0px 30px",
            }}
            component={Link}
            to="/my-account"
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <SidebarAccount />
            </ListItemIcon>
            <ListItemText
              primary={"user account"}
              sx={{
                color: "#fcfcfc",
                fontFamily: '"Nunito Sans", sans-serif',
                fontSize: "16px",
                font: "inherit",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ marginBottom: "20px" }}>
          <ListItemButton
            sx={{
              "&:hover": {
                opacity: 0.8,
                borderLeft: "4px solid #307fe2",
                backgroundColor: "#0a335c !important",
              },
              borderLeft: "4px solid transparent",
              transition: "all 0.3s ease",
              margin: "0px 30px 0px 30px",
            }}
            component={Link}
            to="/my-billing"
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <SidebarBilling />
            </ListItemIcon>
            <ListItemText primary={"Billing"} sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": {
                opacity: 0.8,
                borderLeft: "4px solid #307fe2",
                backgroundColor: "#0a335c !important",
              },
              borderLeft: "4px solid transparent",
              transition: "all 0.3s ease",
              margin: "0px 30px 0px 30px",
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              {/* <HomeIcon /> */}
              <SidebarLogout />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: "#6f7b87",
              }}
              primary={"Log Out"}
              className=""
              onClick={logoutHandler}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {!isMobile && (
        <Box
          className="sidebar"
          sx={{ width: 278, flexShrink: 0 }}
          role="presentation"
        >
          {list("left")}
        </Box>
      )}
      {isMobile && (
        <>
          <MenuIcon
            onClick={toggleDrawer("left", true)}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 1300 }}
          />
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;
