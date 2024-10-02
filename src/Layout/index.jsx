import { Box } from "@mui/material";
import Sidebar from './Sidebar';
import TopBar from "./Topbar";
import styles from './page.module.scss';

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








// import { Box } from "@mui/material";
// import Sidebar from './Sidebar'
// import TopBar from "./Topbar";
// import styles from './page.module.scss'

// export default function Layout( title, children ) {
//     return (
//         <Box sx={{ display: 'flex' }}>
//             <Sidebar />
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: '100vh'
//                 }}
//                 className={styles.container}
//             >
//                 <TopBar title={title} />
//                 <Box>{children}</Box>
//             </Box>
//         </Box>
//     )
// }
