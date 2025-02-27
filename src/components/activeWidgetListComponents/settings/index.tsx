import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SettingBtn from "./settingBtn";
import {
  Agent,
  ChannelSettings,
  SettingsInterface,
} from "@/src/types/settings";
import AgentList from "./settingBtn/components/agentList";
import MobileLaptop from "../../UI/Buttons/MobileLaptop";
import AgentButton from "../../UI/Buttons/AgentButton";

interface ActiveWidgetComponentsProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  Color: string;
  state: SettingsInterface;
  setState: Dispatch<SetStateAction<SettingsInterface>>;
  bgColor: string;
  imgNam: string;
  Desktop: () => void;
  setColor: (color: string) => void;
  Mobile: () => void;
  showOnMobile: boolean;
  showOnDesktop: boolean;
  item: ChannelSettings;
  handleRemoveImage: () => void;

  agentsList: Boolean;
  setAgentsList: Dispatch<SetStateAction<boolean>>;
}

const ActiveWidgetComponents: React.FC<ActiveWidgetComponentsProps> = ({
  selectedImage,
  setSelectedImage,
  Desktop,
  Color,
  Mobile,
  setColor,
  bgColor,
  imgNam,
  state,
  setState,
  showOnMobile,
  showOnDesktop,
  handleRemoveImage,
  item,
  agentsList,
  setAgentsList,
}) => {
  const [settings, setSettings] = useState<boolean>(false);
  const [activeChannelType, setActiveChannelType] = useState<string | null>(
    null
  );
  console.log("activeChannelType", item);
  useEffect(() => {
    if (
      item?.channelType === "whatsapp" &&
      item.agents &&
      item?.agents?.length > 0
    ) {
      setAgentsList(true);
    }
  }, [item.agents, setAgentsList, item.channelType, agentsList]);
  const [checked, setChecked] = useState(false);
  const handleIconClick = (channelType: string) => {
    setActiveChannelType((prevType) =>
      prevType === channelType ? null : channelType
    );
    setSettings((prev) => !prev);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const addNewAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      userName: "Name",
      handle: "+1234567890",
      iconUrl: "/icons/whatsapp.svg",
      profileImage: "",
      salesSupport: "Sales Support",
    };

    const updatedChannels = state.channels.map((channel) => ({
      ...channel,
      agents: [...(channel.agents ?? []), newAgent],
    }));

    setState({ ...state, channels: updatedChannels });
  };

  const channel = state.channels.find(
    (channel: ChannelSettings) => channel.id === item.id
  );

  if (!channel) {
    // Handle the case when no matching channel is found (maybe show an error or return null)
    return null; // or you could show a message or fallback UI
  }

  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: {
          lg: "20px",
          md: "5.5px",
          sm: "18px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: {
            lg: "20px",
            md: "5.5px",
            sm: "18px",
            xs: "10px",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          marginBottom: {
            xs: "20px",
            sm: "20px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              lg: 2.5,
              md: "5px",
              sm: 2,
              xs: "15px",
            },
          }}
        >
          <MobileLaptop
            showOnDesktop={showOnDesktop}
            showOnMobile={showOnMobile}
            Desktop={Desktop}
            Mobile={Mobile}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              lg: 2.5,
              md: "5px",
              sm: 2,
              xs: "15px",
            },
          }}
        >
          <AgentButton
            addNewAgent={addNewAgent}
            setAgentsList={setAgentsList}
            item={item}
            setSettings={setSettings}
            setActiveChannelType={setActiveChannelType}
          />
        </Box>
      </Box>

      {item?.channelType === "whatsapp" &&
        item?.agents &&
        item.agents.length > 0 &&
        agentsList === true && (
          <AgentList
            addNewAgent={addNewAgent}
            // channel={item}
            channel={channel}
            state={state}
            setState={setState}
          />
        )}
      {activeChannelType === item.channelType && (
        <Box
          sx={{
            marginTop: {
              xs: "0px",
              sm: "10px",
            },
          }}
        >
          <SettingBtn
            item={item}
            state={state}
            setState={setState}
            Color={Color}
            setColor={setColor}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            checked={checked}
            setChecked={setChecked}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
            bgColor={bgColor}
            imgNam={imgNam}
          />
        </Box>
      )}
    </Box>
  );
};

export default ActiveWidgetComponents;
