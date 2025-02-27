import React from "react";
import { Check } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import BoxContainer from "../settings/boxContainer/styled";
import AddLiveBtn from "./addLiveButton";
import { themColor } from "@/src/theme/themColor";

interface PageFourProps {
  title: string;
  onButtonClick: (page: string) => void;
}

const PageFour: React.FC<PageFourProps> = ({ title, onButtonClick }) => {
  return (
    <BoxContainer>
      <Grid
        sx={{
          height: "auto",
          minWidth: "60vw",
          borderRadius: "10px",
          background: "#fff",
          border: `1px solid ${themColor.ghost}`,
          overflow: {
            xs: "scroll",
          },
          "@media (min-width: 600px)": {
            "::-webkit-scrollbar": {
              width: "none",
              height: "none",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#a0a0a0",
            },
          },
        }}
      >
        <Box
          sx={{
            opacity: 1,
            padding: "19px 30px",
            borderBottom: `1px solid ${themColor.ghost}`,
            backgroundColor: "#fff",
            position: "sticky",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            top: 0,
            zIndex: 2,
            m: 0,
          }}
        >
          <Box
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flex: "0 1 auto",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              color={themColor.secondary}
              sx={{
                fontWeight: "400",
                fontSize: {
                  xs: "18px",
                  sm: "24px",
                  md: "24px",
                  lg: "24px",
                },
              }}
            >
              <strong className="">Step 4:</strong>
              {title}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              padding: {
                xs: "",
              },
            }}
          >
            <Grid
              md={6}
              lg={6}
              sx={{
                width: "515px",
                paddingTop: "1.5rem",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                },
              }}
            >
              <Box component="img" alt="Add Live" src="/chatway.png" />
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Box
                sx={{
                  height: "66.6vh",
                  right: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingBottom: "6.5rem",
                  paddingTop: "5rem",
                  margin: {
                    xs: "5rem",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "700",
                      marginBottom: "10px",
                      marginLeft: "20px",
                      color: themColor.secondary,
                      fontSize: "20.09px",
                      fontFamily: "Rubik, sans-serif",
                    }}
                  >
                    Add Chatway Live Chat widget to your website
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginLeft: "1rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                      paddingRight: "8px",
                    }}
                  >
                    <Check
                      sx={{
                        borderRadius: "50%",
                        background: "#E4FEF5",
                        fontSize: "25px",
                        padding: "4px",
                        color: themColor.success,
                      }}
                    />
                    <Check
                      sx={{
                        borderRadius: "50%",
                        background: "#E4FEF5",
                        fontSize: "25px",
                        transform: "translate(0, 18px)",
                        padding: "4px",
                        color: themColor.success,
                      }}
                    />
                    <Check
                      sx={{
                        transform: "translate(0, 12px)",
                        borderRadius: "50%",
                        background: "#E4FEF5",
                        fontSize: "25px",
                        padding: "4px",
                        color: themColor.success,
                      }}
                    />
                    <Check
                      sx={{
                        transform: "translate(0, 5px)",
                        borderRadius: "50%",
                        background: "#E4FEF5",
                        fontSize: "25px",
                        padding: "4px",
                        color: themColor.success,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: themColor.secondary,
                      }}
                    >
                      Unlimited conversations, email, and Facebook Messenger{" "}
                      <br />
                      integrations
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: themColor.secondary,
                      }}
                    >
                      Team collaboration with agents
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: themColor.secondary,
                      }}
                    >
                      Canned responses, private notes, reminders, and more
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: themColor.secondary,
                      }}
                    >
                      iOS & Android apps available
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: "1rem",
                    width: "30vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Button
                        variant="outlined"
                        sx={{
                          height: "38px !important",
                          width: {
                            xs: "auto",
                            sm: "auto",
                            md: "auto",
                            lg: "auto",
                          },
                          color: "#1654E0",
                          border: "1px solid #0446DE",
                          fontSize: {
                            xs: "10px",
                            sm: "10px",
                            md: "13px",
                            lg: "13px",
                          },
                          fontWeight: "500",
                          gap: "8px",
                          cursor: "pointer",
                          transition: "background-color 0.6s ease",
                          "&:hover": {
                            backgroundColor: "#EDF3F6",
                          },
                        }}
                      >
                        <AddLiveBtn />
                        <span> Manage Live Chat</span>
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: themColor.tertiary,
                      marginTop: "10px",
                      marginLeft: "23px",
                      fontWeight: "400",
                    }}
                  >
                    You can skip this step by saving the widget
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </BoxContainer>
    //     <BoxContainer>
    //   <Box
    //     sx={{
    //       height: { xs: "auto", sm: "67vh" }, // Make height auto on small screens
    //       minWidth: "60vw",
    //       borderRadius: "10px",
    //       background: "#fff",
    //       border: `1px solid ${themColor.ghost}`,
    //       overflow: "hidden",
    //     }}
    //   >
    //     <Box>
    //       <Box
    //         sx={{
    //           opacity: 1,
    //           padding: "19px 30px",
    //           borderBottom: `1px solid ${themColor.ghost}`,
    //           backgroundColor: "#fff",
    //           position: "sticky",
    //           borderTopRightRadius: "10px",
    //           borderTopLeftRadius: "10px",
    //           top: 0,
    //           zIndex: 2,
    //           m: 0,
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             boxSizing: "border-box",
    //             display: "flex",
    //             flex: "0 1 auto",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             flexWrap: "wrap",
    //             justifyContent: "space-between",
    //             width: "100%",
    //           }}
    //         >
    //           <Typography              color={themColor.secondary}

    //             sx={{ fontSize: "24px", fontWeight: "400" }}
    //           >
    //             <strong className="">Step 4:</strong>
    //             {title}
    //           </Typography>
    //         </Box>
    //       </Box>
    //       <Box>
    //         <Grid
    //           container
    //           spacing={2}
    //           sx={{
    //             display: "flex",
    //             justifyContent: "start",
    //             alignItems: "start",
    //           }}
    //         >
    //           {/* Image will be hidden on medium screens and below */}
    //           <Grid item lg={6} md={12} xs={12} sx={{ paddingTop: "1.5rem" }}>
    //             <Box
    //               component="img"
    //               alt="Add Live"
    //               src="/chatway.png"
    //               sx={{
    //                 display: { xs: "none", md: "block" }, // Hide on small and medium screens
    //                 maxWidth: "100%",
    //               }}
    //             />
    //           </Grid>
    //           <Grid item lg={6} md={12} xs={12}>
    //             <Box
    //               sx={{
    //                 height: { xs: "auto", sm: "66.6vh" }, // Adjust height for responsiveness
    //                 right: "2.5rem",
    //                 margin: 0,
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 justifyContent: "center",
    //                 alignItems: "flex-start",
    //                 paddingBottom: { xs: "2rem", sm: "6.5rem" }, // Adjust padding
    //                 paddingTop: "2rem",
    //               }}
    //             >
    //               <Box>
    //                 <Typography
    //                   variant="body2"
    //                   sx={{
    //                     fontWeight: "700",
    //                     marginBottom: "10px",
    //                     marginLeft: "20px",
    //                     color: themColor.secondary,
    //                     fontSize: { xs: "18px", md: "20.09px" }, // Responsive font size
    //                     fontFamily: "Rubik, sans-serif",
    //                   }}
    //                 >
    //                   Add Chatway Live Chat widget to your website
    //                 </Typography>
    //               </Box>
    //               <Box sx={{ display: "flex", marginLeft: "1rem" }}>
    //                 <Box
    //                   sx={{
    //                     display: "flex",
    //                     flexDirection: "column",
    //                     gap: "15px",
    //                     paddingRight: "8px",
    //                   }}
    //                 >
    //                   {[0, 18, 12, 5].map((translateY, index) => (
    //                     <Check
    //                       key={index}
    //                       sx={{
    //                         borderRadius: "50%",
    //                         background: "#E4FEF5",
    //                         fontSize: "25px",
    //                         transform: `translate(0, ${translateY}px)`,
    //                         padding: "4px",
    //                         color: themColor.success,
    //                       }}
    //                     />
    //                   ))}
    //                 </Box>
    //                 <Box
    //                   sx={{
    //                     display: "flex",
    //                     flexDirection: "column",
    //                     gap: "10px",
    //                   }}
    //                 >
    //                   {[
    //                     "Unlimited conversations, email, and Facebook Messenger integrations",
    //                     "Team collaboration with agents",
    //                     "Canned responses, private notes, reminders, and more",
    //                     "iOS & Android apps available",
    //                   ].map((text, index) => (
    //                     <Typography
    //                       key={index}
    //                       variant="body1"
    //                       sx={{
    //                         fontWeight: "400",
    //                         fontSize: "16px",
    //                         color: themColor.secondary,
    //                       }}
    //                     >
    //                       {text}
    //                     </Typography>
    //                   ))}
    //                 </Box>
    //               </Box>
    //               <Box
    //                 sx={{
    //                   marginTop: "1rem",
    //                   width: { xs: "100%", sm: "30vw" }, // Make width 100% on small screens
    //                   display: "flex",
    //                   flexDirection: "column",
    //                   alignItems: "flex-start",
    //                 }}
    //               >
    //                 <Grid container spacing={2}>
    //                   <Grid item lg={12} md={12} xs={12} sm={12}>
    //                     <Button
    //                       variant="outlined"
    //                       sx={{
    //                         height: "38px !important",
    //                         width: { xs: "100%", sm: "19.2vw" }, // Make width responsive
    //                         color: "#1654E0",
    //                         border: "1px solid #0446DE",
    //                         fontSize: "13px",
    //                         fontWeight: "500",
    //                         gap: "8px",
    //                         cursor: "pointer",
    //                         transition: "background-color 0.6s ease",
    //                         "&:hover": {
    //                           backgroundColor: "#EDF3F6",
    //                         },
    //                       }}
    //                     >
    //                       <AddLiveBtn />
    //                       <span> Manage Live Chat</span>
    //                     </Button>
    //                   </Grid>
    //                 </Grid>
    //                 <Typography
    //                   sx={{
    //                     fontSize: 12,
    //                     color: themColor.tertiary,
    //                     marginTop: "10px",
    //                     marginLeft: "23px",
    //                     fontWeight: "400",
    //                   }}
    //                 >
    //                   You can skip this step by saving the widget
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Box>
    // </BoxContainer>
  );
};

export default PageFour;
