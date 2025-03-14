import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  useFetchAdminSettings,
  useUpdateApplicationInfo,
  useUpdateContactInfo,
  useUpdateMaintenance,
} from "../AdminApis/SettingsApi";

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    appName: "",
    appUrl: "",
    contactEmail: "",
    logoUrl: "",
    maintenanceMode: false,
  });

  const {
    data: fetchedSettings,
    isLoading: isFetching,
    isError,
    refetch,
  } = useFetchAdminSettings();

  const { mutate: updateAppInfo, isLoading: appLoading } =
    useUpdateApplicationInfo();
  const { mutate: updateContactInfo, isLoading: contactLoading } =
    useUpdateContactInfo();
  const { mutate: updateMaintenance, isLoading: maintenanceLoading } =
    useUpdateMaintenance();

  useEffect(() => {
    if (fetchedSettings) {
      setSettings({
        appName: fetchedSettings?.appName || "",
        appUrl: fetchedSettings?.appUrl || "",
        contactEmail: fetchedSettings?.contactEmail || "",
        logoUrl: fetchedSettings?.logoUrl || "",
        maintenanceMode: fetchedSettings?.maintenanceMode || false,
      });
    }
  }, [fetchedSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveApplicationInfo = () => {
    const data = { appName: settings.appName, appUrl: settings.appUrl };
    updateAppInfo(data, { onSuccess: refetch });
  };

  const handleSaveContactInfo = () => {
    const data = {
      contactEmail: settings.contactEmail,
      logoUrl: settings.logoUrl,
    };
    updateContactInfo(data, { onSuccess: refetch });
  };

  const handleSaveMaintenance = () => {
    const data = { maintenanceMode: settings.maintenanceMode };
    updateMaintenance(data, { onSuccess: refetch });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, borderRadius: 1, border: 1, borderColor: "divider", p: 4 }}
    >
      <Typography variant="h5" gutterBottom></Typography>

      {isError && (
        <Typography color="error">
          Error loading settings. Please try again later.
        </Typography>
      )}

      {/* Application Information Section */}
      <Card sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Application Information
        </Typography>
        <TextField
          fullWidth
          label="Application Name"
          name="appName"
          variant="outlined"
          margin="normal"
          value={settings.appName}
          onChange={handleChange}
          disabled={isFetching}
        />
        <TextField
          fullWidth
          label="Application URL"
          name="appUrl"
          variant="outlined"
          margin="normal"
          value={settings.appUrl}
          onChange={handleChange}
          disabled={isFetching}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveApplicationInfo}
            disabled={appLoading || isFetching}
          >
            {appLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Save Application Info"
            )}
          </Button>
        </Box>
      </Card>

      {/* Contact Information Section */}
      <Card sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <TextField
          fullWidth
          label="Contact Email"
          name="contactEmail"
          variant="outlined"
          margin="normal"
          value={settings.contactEmail}
          onChange={handleChange}
          disabled={isFetching}
        />
        <TextField
          fullWidth
          label="Logo URL"
          name="logoUrl"
          variant="outlined"
          margin="normal"
          value={settings.logoUrl}
          onChange={handleChange}
          disabled={isFetching}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveContactInfo}
            disabled={contactLoading || isFetching}
          >
            {contactLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Save Contact Info"
            )}
          </Button>
        </Box>
      </Card>

      {/* Maintenance Settings Section */}
      <Card sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Maintenance Settings
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={settings.maintenanceMode}
                onChange={handleSwitchChange}
                name="maintenanceMode"
                color="primary"
                disabled={isFetching}
              />
            }
            label="Maintenance Mode"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveMaintenance}
            disabled={maintenanceLoading || isFetching}
          >
            {maintenanceLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Save Maintenance Setting"
            )}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default AdminSettings;
