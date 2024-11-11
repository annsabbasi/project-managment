import { Box, Stack } from "@mui/material";
import Sidebar from './Sidebar';
import TopBar from "./Topbar";
import styles from './page.module.scss';
import PropTypes from 'prop-types';

export default function AdminWork({ title, children }) {
    return (
        <Stack flexDirection="row">
            <Sidebar />

            <Box className={styles.container}>
                <TopBar title={title} />
                <Box className={styles.content}>{children}</Box>
            </Box>

        </Stack>
    );
}

AdminWork.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}