import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField } from "@mui/material";
import { Label } from "@mui/icons-material";
import { themColor } from "@/src/theme/themColor";
import { AnyArray } from "mongoose";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    backgroundColor: "white",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    backgroundColor: "white",
  },
  "& .MuiPaper-root": {
    width: "400px",
    maxWidth: "400px",
  },
}));

interface Domain {
  id: string;
  type: string;
  domainName: string; // Added property
  isActive?: boolean; // Optional property
  // Add other properties as needed
}
interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setDomains: (domains: any[any]) => void; // Correctly typed
  domains: any[];
  data: string;
}

interface FormValues {
  widgetName: string;
}

export default function RenameWidgetDialog({
  open,
  setOpen,
  domains,
  setDomains,
  data,
}: DialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<FormValues>({ widgetName: "" });

  const handleClose = () => {
    setValue({ widgetName: "" });
    setError(null);
    setOpen(false);
  };

  const handleSwitchChange = async (domainId: any) => {
    if (value.widgetName === "") {
      return setError("Please enter a domain name");
    }

    const API_URL = `/api/domain?domainId=${domainId}`;

    // Find the domain to toggle
    const domainToUpdate = domains.find(
      (domain: any) => domain.id === domainId
    );
    if (!domainToUpdate) return;
    console.log("Toggling domain state for:", domainToUpdate);

    setDomains((prevDomains: Domain[]) => {
      return prevDomains.map((domain: any) =>
        domain.id === domainId
          ? { ...domain, type: value.widgetName } // Update widgetName
          : domain
      );
    });

    console.log("Local state updated optimistically.");

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          widgetName: value.widgetName,
        }),
      });
      console.log("API request sent to update domain status.");

      // Check if the response was successful
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error(
          `Failed to update domain status. Status: ${response.status} - ${errorDetails}`
        );
      }

      const data1 = await response.json();
      console.log("Domain updated successfully:", data1);
      setIsLoading(false);
      handleClose();
      return data1;
    } catch (error) {
      console.error("Error updating domain status:", error);

      // Optionally revert the local state if the API call fails
      setDomains((prevDomains: Domain[]) => {
        return prevDomains.map((domain: any) =>
          domain.id === domainId
            ? { ...domain, type: value.widgetName } // Update widgetName
            : domain
        );
      });
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ opacity: 0.99 }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            color: themColor.primary,
            backgroundColor: "white",
          }}
          id="customized-dialog-title"
        >
          Rename Widget
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ border: "1px solid  #f0efef" }}></Box>

        <Box sx={{ px: 3, py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Label sx={{ color: themColor.primary }} />
            <label htmlFor="widget-name" style={{ color: themColor.primary }}>
              Widget Name
            </label>
          </Box>
          <TextField
            id="widget-name"
            type="text"
            placeholder="Widget Name"
            sx={{ width: "100%", marginTop: 1, marginBottom: 2 }}
            value={value.widgetName}
            onChange={(e) => setValue({ ...value, widgetName: e.target.value })}
          />
        </Box>

        <Box
          sx={{
            px: 3,
            justifyContent: "flex-end",
            paddingBottom: 2.5,
            gap: "10px",
            display: "flex",
          }}
        >
          <Button autoFocus sx={{ border: "1px solid" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            sx={{
              border: "1px solid",
              bgcolor: themColor.primary,
              color: "white",
              "&:hover": {
                bgcolor: themColor.primary,
                opacity: 0.9,
              },
            }}
            onClick={() => {
              handleSwitchChange(data);
            }}
          >
            {isLoading ? "Saving..." : "Save Widget"}
          </Button>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
