import { Box, Stack } from "@mui/material";
import Sidebar from './Sidebar';
import TopBar from "./Topbar";
import styles from './page.module.scss';
import PropTypes from 'prop-types';
import { useAuth } from "../context/AuthProvider";

export default function AdminWork({ title, children }) {
    const { mode } = useAuth();

    const contentBg =
        mode === "light"
            // ? "rgba(250, 249, 246, 0.85)"
            ? "white"
            : "rgba(40, 40, 43, 0.9)";

    return (
        <Stack flexDirection="row">
            <Sidebar />

            <Box className={styles.container}>
                <TopBar title={title} />
                <Box
                    className={styles.content}
                    sx={{
                        backgroundColor: contentBg,
                        transition: 'background-color 0.1s ease',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Stack>
    );
}

AdminWork.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
