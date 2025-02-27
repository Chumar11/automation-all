import { defaults } from "@/src/config";
import { themColor } from "@/src/theme/themColor";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { Grid, Typography } from "@mui/material";

interface Widget {
  id: string;
  name: string;
  icon: string;
  background: string;
}

interface WidgetCardProps {
  item: Widget;
  activeWidgetIds: string[];
  handleIconClick: (item: ChannelSettings) => void;
  state: SettingsInterface;
  setState: (state: SettingsInterface) => void;
  setWidgets: (widgets: any) => void;
  ChannelId: number;
  setNewChannelId: (prevId: number) => void;
  index: number;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  item,
  index,
  setNewChannelId,
  ChannelId,
  state,
  setState,
  setWidgets,
}) => {
  console.log("item", item);
  const handleClick = (item: any, index: number) => {
    console.log("item", item.name.toLowerCase());

    if (
      item.name.toLowerCase() === "custom5" ||
      item.name.toLowerCase() === "custom6" ||
      item.name.toLowerCase() === "custom7" ||
      item.name.toLowerCase() === "custom8" ||
      item.name.toLowerCase() === "custom9" ||
      item.name.toLowerCase() === "custom10"
    ) {
      const PreviewCard = state?.channels?.some(
        (channel: ChannelSettings) =>
          channel.channelType?.toLowerCase() === item.name.toLowerCase()
      );
      setNewChannelId(ChannelId - 1);

      console.log("PreviewCard", PreviewCard);
      // Remove custom widget from state channels
      const updatedChannels = state.channels.filter(
        (channel: ChannelSettings) =>
          channel.channelType.toLowerCase() !== item.name.toLowerCase()
      );
      const newFields = [...updatedChannels];
      newFields.splice(index, 1);

      // Reassign the id based on the new index after removal
      const updatedFields = newFields.map((field, i) => ({
        ...field,
        id: (i + 1).toString(), // Assign new id based on index
      }));

      setState({
        ...state,
        channels: updatedFields, // Update myState with removed fields and new ids
      });
      // setState({
      //   ...state,
      //   channels: updatedChannels,
      // });

      setWidgets((prevWidgets: any) =>
        prevWidgets.filter(
          (widget: any) => widget.name.toLowerCase() !== item.name.toLowerCase()
        )
      );
      console.log("item", item);
    } else {
      const channelExists = state?.channels?.some(
        (channel: ChannelSettings) =>
          channel.channelType?.toLowerCase() === item.name.toLowerCase()
      );

      let updatedChannels = channelExists
        ? state.channels.filter(
            (channel: ChannelSettings) =>
              channel.channelType.toLowerCase() !== item.name.toLowerCase()
          )
        : [
            ...state.channels,
            {
              id: String(state.channels.length + 1),
              ...defaults[item.name.toLowerCase() as keyof typeof defaults],
            },
          ];

      // Update the id for all channels based on their new position
      updatedChannels = updatedChannels.map((channel, index) => ({
        ...channel,
        id: String(index + 1),
      }));

      setState({
        ...state,
        channels: updatedChannels,
      });
    }
  };

  return (
    <>
      <Grid item xs={2.8} sm={2} md={2} lg={1.5}>
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            padding: "0.5rem",
            boxSizing: "border-box",
          }}
        >
          <Grid
            item
            onClick={() => handleClick(item, index)}
            sx={{
              background: state?.channels?.some(
                (channel: ChannelSettings) =>
                  channel.channelType?.toLowerCase() === item.name.toLowerCase()
              )
                ? item.background
                : themColor?.mediumGray,
              "&:hover": {
                background: item.background,
              },
              borderRadius: "50%",
              marginBottom: "5px",
              width: "3rem",
              height: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease",
              animation: state?.channels?.some(
                (channel: ChannelSettings) =>
                  channel.channelType?.toLowerCase() === item.name.toLowerCase()
              )
                ? "bopIn 0.25s ease-in-out"
                : "none",
            }}
          >
            <img src={item.icon} alt={item.name} width={30} />
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontSize: "11px",
                color: themColor.tertiary,
                textAlign: "center",
              }}
            >
              {item.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default WidgetCard;
