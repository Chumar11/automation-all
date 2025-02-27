import { Box, Grid } from "@mui/material";
import WidgetCard from "src/components/widgetComponents/widgetCard";
import WidgetActions from "../../widgetComponents/widgetActions";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { Dispatch, SetStateAction, useState } from "react";

interface Widget {
  id: string;
  name: string;
  icon: string;
  background: string;
  color: string;
}

interface WidgetListProps {
  activeWidgetIds: string[];
  handleIconClick: (id: ChannelSettings) => void;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  widgets: Widget[];
  setWidgets: Dispatch<SetStateAction<Widget[]>>;
}

const WidgetList: React.FC<WidgetListProps> = ({
  activeWidgetIds,
  handleIconClick,
  state,
  widgets,
  setWidgets,
  setState,
}) => {
  // console.log("widgets", widgets);
  const [ChannelId, setNewChannelId] = useState(5); // Initial value set to 5
  console.log("channe", ChannelId);
  const handleNew = () => {
    // Generate a new ID for the custom channel
    console.log("channels", state.channels.length);
    const newChannelId = String(state.channels.length + 1);

    const newCustomChannel = {
      id: newChannelId,
      channelType: `custom${ChannelId}`,
      iconUrl: "/icons/custom.svg",
      channelUrl: "custom_url",
      iconBackground: "linear-gradient(135deg, #8134AF, #E83B86)",
      showOnDesktop: true,
      showOnMobile: true,
      hoverText: "Custom Channel",
      placeholder: "Enter custom URL",
      customImage: "",
    };

    setState((prevState) => ({
      ...prevState,
      channels: [...prevState.channels, newCustomChannel],
    }));

    const storeWidget = widgets.length + 1;

    const newWidget = {
      id: `${storeWidget}`,
      name: `Custom${ChannelId}`,
      icon: "/icons/custom.svg",
      color: "#fff",
      background: "linear-gradient(135deg, #8134AF, #E83B86)",
    };

    setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
    setNewChannelId((prevId) => prevId + 1);

    console.log("Custom channel added", newCustomChannel);
  };
  const activeWidgetNames = widgets
    .filter((widget) => activeWidgetIds.includes(widget.id)) // Filter widgets based on activeWidgetIds
    .map((widget) => widget.name.toLowerCase()); // Map to extract the name of each widget

  console.log("AllWidget", activeWidgetNames);
  console.log("activeWidgetIds", activeWidgetIds);
  const isLoading = false;
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
        },
      }}
      className="border-r-ghost border-r-[1px]"
      padding={"25px 30px 0"}
    >
      <Grid
        container
        spacing={1}
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
          },
          padding: "0.5rem 0 0",
          marginTop: ".5rem",
          marginBottom: "1rem",
          "& .MuiGrid-item": {
            paddingTop: "0px",
          },
        }}
      >
        {widgets.map((item: Widget, index) => (
          <WidgetCard
            state={state}
            index={index}
            setState={setState}
            key={item.id}
            ChannelId={ChannelId}
            item={item}
            activeWidgetIds={activeWidgetIds}
            handleIconClick={handleIconClick}
            setWidgets={setWidgets}
            setNewChannelId={setNewChannelId}
          />
        ))}
      </Grid>
      {/* {widgets.length <= 28 && (
        <WidgetActions handleNew={handleNew} />
        // <Button
        //   startIcon={<Add />}
        //   onClick={handleNew}
        //   sx={{
        //     "&:hover": {
        //       backgroundColor: "#edf3f6",
        //     },
        //     "& .MuiSvgIcon-root": {
        //       color: themColor.secondary,
        //     },
        //     "&.MuiButton-sizeMedium": {
        //       border: `1px solid ${themColor.neutral}`,
        //       borderRadius: "4px",
        //       color: themColor.secondary,
        //       fontSize: "0.75rem",
        //       fontWeight: 400,
        //       height: "32px",
        //       padding: "0 8px",
        //     },
        //   }}
        // >
        //   Custom Channel
        // </Button>
      )} */}
    </Box>
  );
};

export default WidgetList;
