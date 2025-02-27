import { textFieldStyles } from "@/src/components/settingBtn/components/textFieldStyles";
import { themColor } from "@/src/theme/themColor";
import { ChannelSettings, SettingsInterface } from "@/src/types/settings";
import { Box, TextField, Typography } from "@mui/material";
import CheckboxComponent from "./components/checkboxComponent";
import FeaturesSection from "./components/featuresSection";
import IconBackgroundPickerComponent from "./components/iconBackgroundPickerComponent";
import ImageUploadComponent from "./components/imageUploadComponent";
import RedirectAndCloseFormSection from "./components/redirectAndCloseFormSection";
import SubmitButtonSection from "./components/submitButtonSection";
import TextInputComponent from "./components/textInputComponent";
import ThankYouMessageSection from "./components/thankYouMessageSection";
import TextFiledSubEmail from "./components/textFieldSubEmail";
import LinkedInSettings from "./components/linkedInSettings";
import SendLeadsToEmail from "./components/SendLeadsToEmail";

interface SettingBtnProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  Color: string;
  setColor: (color: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
  bgColor: string;
  imgNam: string;
  state: SettingsInterface;
  setState: React.Dispatch<React.SetStateAction<SettingsInterface>>;
  item: ChannelSettings;
}

const SettingBtn: React.FC<SettingBtnProps> = ({
  selectedImage,
  setSelectedImage,
  Color,
  setColor,
  checked,
  setChecked,
  handleImageUpload,
  handleRemoveImage,
  bgColor,
  imgNam,
  state,
  setState,
  item,
}) => {
  return (
    <Box
      sx={{ display: "flex", gap: 1, flexDirection: "column", width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          gap: "70px",
          flexWrap: "nowrap",
          paddingBottom: "20px",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
          },
        }}
      >
        <TextInputComponent
          item={item}
          imgName={imgNam}
          state={state}
          setState={setState}
        />
        <IconBackgroundPickerComponent
          item={item}
          state={state}
          setState={setState}
          Color={Color}
          setColor={setColor}
          bgColor={bgColor}
        />
      </Box>
      {
        item.channelType === "contact form" && (
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: themColor.tertiary,
                fontSize: ".875rem",
                marginBottom: "8px",
              }}
            >
              Contact Form Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Form Title"
              sx={{
                ...textFieldStyles,
                "& .MuiOutlinedInput-root": {
                  ...textFieldStyles["& .MuiOutlinedInput-root"],
                  width: "60%", // Override width to be 100%
                },
              }}
              value={
                state.channels.find((channel: any) => channel.id === item.id)
                  ?.contactFormTitle || ""
              }
              onChange={(e) =>
                setState({
                  ...state,
                  channels: state.channels.map((ch) =>
                    ch.id === item.id
                      ? { ...ch, contactFormTitle: e.target.value }
                      : ch
                  ),
                })
              }
            />{" "}
          </Box>
        )
        //  : (
        //   item.channelType === "whatsapp" && (
        //     <CheckboxComponent
        //       checked={checked}
        //       handleCheckboxChange={(event) => setChecked(event.target.checked)}
        //     />
        //   )
        // )
      }

      <TextFiledSubEmail item={item} state={state} setState={setState} />
      {item.channelType === "weChat" && (
        <ImageUploadComponent
          title="QR Code"
          imgTitle="Upload"
          selectedImage={selectedImage}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
        />
      )}

      {item.channelType === "linkedin" && <LinkedInSettings />}

      <ImageUploadComponent
        title="Custom Image"
        imgTitle="Upload Image"
        selectedImage={selectedImage}
        handleImageUpload={handleImageUpload}
        handleRemoveImage={handleRemoveImage}
      />
      {item.channelType === "contact form" && (
        <>
          <SubmitButtonSection item={item} setState={setState} state={state} />
          <SendLeadsToEmail item={item} setState={setState} state={state} />
          <ThankYouMessageSection
            item={item}
            setState={setState}
            state={state}
          />
          <RedirectAndCloseFormSection
            item={item}
            setState={setState}
            state={state}
          />
          {/* <FeaturesSection item={item} setState={setState} /> */}
        </>
      )}
    </Box>
  );
};

export default SettingBtn;
