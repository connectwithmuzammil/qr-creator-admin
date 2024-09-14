import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import { useMediaQuery, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Logo, SidebarAccount, SidebarBilling, SidebarLogout } from "./SVGIcon";
import apis from "../services";
import { logout } from "../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const [state, setState] = React.useState({
    left: false,
  });
  const [openCompany, setOpenCompany] = React.useState(false);
  const [openHelp, setOpenHelp] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  // State to control the sidebar and toggle between MenuIcon and CloseIcon
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setIsDrawerOpen(open); // Toggle the drawer open/close state
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
      <Box className="logo" onClick={() => navigate("/")}>
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
            to="/dashboard"
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <DashboardIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#fcfcfc" }} primary={"Dashboard"} />
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
            to="/user-listing"
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <PeopleIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#fcfcfc" }} primary={"User Listing"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/user-billing"
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
              <AccountBalanceWalletIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#fcfcfc" }} primary={"User Billing"} />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
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
            <ListItemText sx={{ color: "#fcfcfc" }} primary={"User Account"} />
          </ListItemButton>
        </ListItem> */}
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
            to="/user-finance"
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <SidebarBilling />
            </ListItemIcon>
            <ListItemText primary={"Finance"} sx={{ color: "#fff" }} />
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
              <SidebarLogout />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "#6f7b87" }}
              primary={"Log Out"}
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
          <IconButton
            onClick={toggleDrawer("left", !isDrawerOpen)}
            style={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
          >
            {isDrawerOpen ? (
              <CloseIcon sx={{ color: "#fff" }} />
            ) : (
              <MenuIcon sx={{ color: "#000" }} />
            )}
          </IconButton>
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
