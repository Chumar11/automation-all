import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, rgbToHex, TextField } from "@mui/material";
import { Label, Opacity } from "@mui/icons-material";
import { themColor } from "@/src/theme/themColor";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";

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
    width: "400px", // Decrease width
    maxWidth: "400px", // Ensure max width is also set
  },
}));
interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormValues {
  widgetName: string;
  domainName: string;
}

interface DomainPayload {
  domainName: string;
  type: string;
  isActive: boolean;
  userId: string;
  id: string;
}

export default function CustomizedDialogs({ open, setOpen }: DialogProps) {
  const { user }: any = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [value, setValue] = React.useState<FormValues>({
    widgetName: "",
    domainName: "",
  });
  const router = useRouter();

  const handleClose = () => {
    setValue({ widgetName: "", domainName: "" });
    setError(null);
    setOpen(false);
  };

  const createDomain = async () => {
    if (!value.widgetName || !value.domainName) {
      setError("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const createId = Math.random().toString(36).substring(7);
      const payload: DomainPayload = {
        domainName: value.domainName,
        type: value.widgetName,
        isActive: true,
        userId: user?._id,
        id: createId,
      };

      const response = await fetch("/api/domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create domain");
      }

      const data = await response.json();

      handleClose();
      router.push(`/update-widget/${data.domain.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // sx={{ opacity: 0.99 }}
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
          New Widget
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
        {/* ***** */}
        <DialogContent dividers>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Label
              sx={{
                color: themColor.primary,
              }}
            />
            <label htmlFor="widget-name" style={{ color: themColor.primary }}>
              Widget Name
            </label>
          </Box>
          <TextField
            type="text"
            placeholder=" Widget Name"
            sx={{
              width: "100%",
              marginTop: 1,
              marginBottom: 2,
            }}
            value={value.widgetName}
            onChange={(e) => {
              setValue({ ...value, widgetName: e.target.value });
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Label
              sx={{
                color: themColor.primary,
              }}
            />
            <label htmlFor="Domain-name" style={{ color: themColor.primary }}>
              Domain Name
            </label>
          </Box>
          <TextField
            type="text"
            placeholder=" your-Doamin.com"
            sx={{ width: "100%", marginTop: 1 }}
            value={value.domainName}
            onChange={(e) => {
              setValue({ ...value, domainName: e.target.value });
            }}
          />
        </DialogContent>

        {/* ************* */}

        <DialogActions>
          <Button
            autoFocus
            sx={{
              border: "1px solid",
            }}
            onClick={handleClose}
          >
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
            onClick={createDomain}
          >
            {isLoading ? "Creating..." : "Start Creating"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
