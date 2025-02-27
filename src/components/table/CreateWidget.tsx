import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function CreateWidget() {
  const emptyDomain = [
    { id: 1, domainName: "jstrainer.com" },
    { id: 2, domainName: "test.com" },
    { id: 3, domainName: "test.url" },
  ];

  return (
    <>
      <Box
        sx={{
          pointerEvents: "none",
          marginTop: "20px",
          filter: "blur(2px)",
        }}
      >
        {emptyDomain.map((domain) => (
          <>
            <Typography
              component="a"
              href={domain.domainName}
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#9b9b9b",
                marginBottom: "1rem",
                // marginTop: "5rem",
              }}
            >
              {domain.domainName}
            </Typography>

            <Box
              sx={{
                position: "relative",
              }}
            >
              <TableContainer
                sx={{
                  border: "none",
                  borderRadius: "10px",
                  width: "100%",
                  // overflow: "unset",
                  overflowX: "auto",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 24px 1px rgba(0,0,0,0.1)",
                  marginBottom: "3rem",
                }}
              >
                <Table>
                  {/* table Heads */}
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "rgba(0, 125, 252, 0.65) !important",
                      }}
                    >
                      <TableCell></TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Visitors</TableCell>
                      <TableCell>Unique Clicks</TableCell>
                      <TableCell>Click Rate</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Box>
          </>
        ))}
      </Box>
    </>
  );
}
