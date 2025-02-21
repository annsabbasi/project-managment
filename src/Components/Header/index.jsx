import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useAuth } from "../../context/AuthProvider";

const TransparentNavbar = () => {
    const { theme } = useAuth();
    const bgColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.1)";



    return (
        <AppBar position="sticky" sx={{ background: bgColor, backdropFilter: "blur(10px)", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 4 }}>
                    MyBrand
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <IconButton color="inherit">
                        <HomeIcon />
                        <Typography variant="body1" sx={{ ml: 1 }}>Home</Typography>
                    </IconButton>
                    <IconButton color="inherit">
                        <InfoIcon />
                        <Typography variant="body1" sx={{ ml: 1 }}>About</Typography>
                    </IconButton>
                    <IconButton color="inherit">
                        <ContactMailIcon />
                        <Typography variant="body1" sx={{ ml: 1 }}>Contact</Typography>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TransparentNavbar;
