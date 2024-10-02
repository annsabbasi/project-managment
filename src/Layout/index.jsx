import { Box } from "@mui/material";
import Sidebar from './Sidebar';
import TopBar from "./Topbar";
import styles from './page.module.scss';
import PropTypes from 'prop-types';

export default function Layout({ title, children }) {
    console.log("This is a layout Page")
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
                <Box>{children}</Box>
            </Box>
        </Box>
    );
}

Layout.propTypes = {
    title: PropTypes.string.isRequired, // Specify that title is required and must be a string
    children: PropTypes.node.isRequired, // Specify that children is required and must be a valid React node
}