import { useState } from "react";
import {
    Stack, Box, Button, TextField, Typography, Snackbar, Alert, Grid, Card, CardContent,
    Skeleton
} from "@mui/material";
import { styled } from "@mui/system";
import style from './styles.module.scss';
import { useAddPdf, useDeletePdf, useFetchPdfs } from "./videoApi/addVideo";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from "@mui/material/IconButton";

const StyledInput = styled("input")({
    display: "none",
});

const handleDownload = async (pdfUrl) => {
    try {
        const response = await fetch(pdfUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "document.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading PDF:", error);
    }
};


const Pdf = () => {
    const [pdf, setPdf] = useState(null);
    const [pdfURL, setPdfURL] = useState("");
    const [description, setDescription] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { mutate: uploadPdf, isLoading } = useAddPdf();
    const { data: pdfs, isLoading: pdfLoading } = useFetchPdfs();

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (!file || file.type !== "application/pdf" || file.size > 10 * 1024 * 1024) {
            setSnackbarMessage("File must be a PDF and not exceed 10MB!");
            setSnackbarOpen(true);
            return;
        }
        setPdf(file);
        setPdfURL(URL.createObjectURL(file));
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pdf || !description) {
            setSnackbarMessage("Please provide both a PDF and description.");
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append("pdf", pdf);
        formData.append("description", description);

        uploadPdf(formData, {
            onSuccess: () => {
                setSnackbarMessage("PDF uploaded successfully!");
                setSnackbarOpen(true);
                setPdf(null);
                setPdfURL("");
                setDescription("");
            },
            onError: () => {
                setSnackbarMessage("Failed to upload PDF. Please try again.");
                setSnackbarOpen(true);
            },
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    const { mutate: deletePdf } = useDeletePdf();
    const handleDelete = (id) => {
        deletePdf(id);
    };


    return (
        <Stack>
            <Box component="form" onSubmit={handleSubmit} noValidate className={style.mainContainer}>
                <Typography variant="h4" component="h1" gutterBottom textAlign="left" mb={4}>
                    Upload Your PDF
                </Typography>
                <Stack spacing={3}>
                    <label htmlFor="pdf-upload" style={{ width: 'fit-content' }}>
                        <StyledInput
                            accept="application/pdf"
                            id="pdf-upload"
                            type="file"
                            onChange={handlePdfChange} />
                        <Button variant="contained" component="span" fullWidth className={style.dialogBtnSecondary}>
                            {pdf ? pdf.name : "Choose PDF"}
                        </Button>
                    </label>

                    {pdfURL && (
                        <Box className={style.previewPdf}>
                            <Typography variant="h6" gutterBottom>PDF Preview</Typography>
                            <iframe
                                src={pdfURL}
                                width="100%"
                                height="400px"
                                style={{ borderRadius: "8px", border: "1px solid #ddd" }}
                            />
                        </Box>
                    )}

                    <TextField
                        label="PDF Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={handleDescriptionChange}
                        fullWidth />

                    <Button size="md" variant="outlined" type="submit" disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Submit"}
                    </Button>
                </Stack>

                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>

            <Box sx={{ flexGrow: 1, }} mt={4}>
                <Typography variant="h5" mb={3}>Uploaded PDFs</Typography>
                {pdfLoading ? <>
                    <Skeleton variant="text" width="90%" height={90} />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="85%" />
                    <Skeleton variant="text" width="80%" />
                </> : (
                    <Grid container spacing={3}>
                        {pdfs?.data?.map((pdf) => (
                            <Grid
                                item xs={12} sm={6} md={4}
                                key={pdf._id}>
                                <Card sx={{ height: '100%', padding: 2, position: "relative" }} className={style.linkContainer}>

                                    <IconButton className={style.linkDelete} onClick={() => handleDelete(pdf._id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                    <CardContent sx={{ padding: 0 }}>
                                        <Typography variant="h6" sx={{ fontSize: "18px" }} gutterBottom>
                                            {pdf.description}
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleDownload(pdf.pdf)}
                                        size="small"
                                        sx={{ textTransform: "capitalize", mt: 2 }}
                                    >
                                        Download PDF
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Stack >
    );
};

export default Pdf;