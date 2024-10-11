import { Box } from "@mui/material";
import Sidebar from './Sidebar';
import TopBar from "./Topbar";
import styles from './page.module.scss';
import PropTypes from 'prop-types';

export default function Layout({ title, children }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }}
                className={styles.container}
            >
                <TopBar title={title} />
                <Box sx={{
                    padding: '1.2rem 1rem'
                }}>{children}</Box>
            </Box>
        </Box>
    );
}

Layout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}