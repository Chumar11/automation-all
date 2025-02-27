import { Box, Container, Skeleton, Stack } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Header from "./header";
import WidgetList from "./widgetList";
// import { widgets } from "@/src/config";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import ActiveWidgetList from "../widgetComponents/ActiveWidgetList";
import CloseButtonComponent from "../widgetComponents/closeButtonComponent";
import { themColor } from "@/src/theme/themColor";
import { widgets as initialWidgets } from "src/config";
import { useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
interface PageOneProps {
  title: string;
  onButtonClick: (page: string) => void;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  isloading: Boolean;
  agentsList: Boolean;
  setAgentsList: Dispatch<SetStateAction<boolean>>;
}

const PageOne: React.FC<PageOneProps> = ({
  title,
  onButtonClick,
  state,
  setState,
  isloading,
  agentsList,
  setAgentsList,
}) => {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [activeWidgetIds, setActiveWidgetIds] = React.useState<string[]>([]);
  console.log("this is state", activeWidgetIds);
  const handleIconClick = (item: ChannelSettings) => {
    setState((prevState: SettingsInterface) => {
      // Filter out the channel with the specified ID
      const updatedChannels = prevState.channels.filter(
        (channel: ChannelSettings) => channel.id !== item.id
      );
      const { Details }: any = useContext(AuthContext);
      console.log("this is Details", Details);

      // Reassign IDs sequentially
      const reindexedChannels = updatedChannels.map((channel, index) => ({
        ...channel,
        id: (index + 1).toString(), // Assuming IDs are strings
      }));

      console.log("this is updatedChannels", reindexedChannels);
      return {
        ...prevState,
        channels: reindexedChannels,
        // Ensure all other properties from SettingsInterface are included
        widgetcustomization: prevState.widgetcustomization,
        triggersAndTargeting: prevState.triggersAndTargeting,
        snippetCode: prevState.snippetCode,
        // userId: prevState.userId,
        _id: prevState._id,
        // Include any other properties required by SettingsInterface
      };
    });
  };

  return (
    // <BoxContainer>
    <>
      {isloading ? (
        <Skeleton variant="rectangular" width={600} height={471} />
      ) : (
        <Box display={"grid"} gap={"20px"} height={"100%"}>
          <Container
            sx={{
              height: "auto",
              borderRadius: "10px",
              background: "#fff",
              overflowY: "auto", // Changed from scroll to auto
              paddingLeft: 0,
              paddingRight: 0,
              border: `1px solid ${themColor.ghost}`,
              "::webkit-scrollbar": {
                width: "none",
                height: "none",
              },
              "::webkit-scrollbar-thumb": {
                background: "#a0a0a0",
              },
              "@media (min-width: 600px)": {
                paddingLeft: 0,
                paddingRight: 0,
              },
            }}
          >
            <Header title={title} />
            <Stack
              sx={{
                flexDirection: {
                  xs: "column", // for small screens
                  md: "row", // for medium and up screens
                },
                width: "100%",
                gap: 2, // Add some gap between items for clarity
              }}
            >
              <WidgetList
                state={state}
                setState={setState}
                activeWidgetIds={activeWidgetIds}
                handleIconClick={handleIconClick}
                widgets={widgets}
                setWidgets={setWidgets}
              />

              {/* <PreviewSection /> */}
            </Stack>
          </Container>
          {state?.channels?.length > 0 && (
            <Container
              sx={{
                height: "auto",
                borderRadius: "10px",
                background: "#fff",
                overflowY: "auto", // Changed from scroll to auto
                paddingLeft: 0,
                paddingRight: 0,
                border: `1px solid ${themColor.ghost}`,
                "::webkit-scrollbar": {
                  width: "none",
                  height: "none",
                },
                "::webkit-scrollbar-thumb": {
                  background: "#a0a0a0",
                },
                "@media (min-width: 600px)": {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
              }}
            >
              <Box>
                <ActiveWidgetList
                  setAgentsList={setAgentsList}
                  agentsList={agentsList}
                  activeWidgets={widgets.filter((widget) =>
                    activeWidgetIds.includes(widget.id)
                  )}
                  state={state}
                  handleIconClick={handleIconClick}
                  setState={setState}
                  widgets={widgets}
                  setWidgets={setWidgets}
                />
                <Box sx={{ paddingX: "20px" }}>
                  {state.channels.length > 1 && (
                    <CloseButtonComponent state={state} setState={setState} />
                  )}
                </Box>
              </Box>
            </Container>
          )}
        </Box>
      )}
    </>

    // </BoxContainer>
  );
};

export default PageOne;
