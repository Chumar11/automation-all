import { idID } from "@mui/material/locale";
import { Model, Schema, models, model } from "mongoose";
import { start } from "repl";
import { SettingsInterface } from "src/types/settings";
import { string } from "yup";

// Define the schema for channel settings including channel-specific settings
const ChannelSettingsSchema = new Schema({
  id: {
    type: String,
    required: false,
  },

  channelType: {
    type: String,
    required: true,
  }, // e.g., 'whatsapp', 'email', etc.
  channelUrl: {
    type: String,
    required: false,
  },
  iconUrl: {
    type: String,
    required: false,
  },
  showOnDesktop: {
    type: Boolean,
    default: true,
  },
  showOnMobile: {
    type: Boolean,
    default: true,
  },
  hoverText: {
    type: String,
    required: false,
  },
  iconBackground: {
    type: String,
    required: false,
  },
  customImage: {
    type: String,
    required: false,
  },
  enableChatWidget: {
    type: Boolean,
    default: false,
  },
  chatWidgetText: {
    type: String,
    required: false,
  },
 
  widgetHeading: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  presetMessage: {
    type: String,
    required: false,
  },
  fields: [
    {
      fieldName: {
        type: String,
        required: false,
      },
      fieldPlaceholder: {
        type: String,
        required: false,
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      isEnabled: {
        type: Boolean,
        required: false,
        default: true,
      },
      id: {
        type: String,
        required: false,
      },
    },
  ],
  agents: [
    {
      salesSupport: {
        type: String,
        required: false,
      },
      userName: {
        type: String,
        required: false,
      },
      handle: {
        type: String,
        required: false,
      },
      id: {
        type: String,
        required: false,
      },
      iconUrl: {
        type: String,
        required: false,
      },
      profileImage: {
        type: String,
        required: false,
      },
    },
  ],
  toEmail: {
    type: String,
    required: true,
  },
  contactFormTitle: {
    type: String,
    required: false,
  },
  submitButton: {
    textColor: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    buttonText: {
      type: String,
      required: false,
    },
  },
  thankYouMessage: {
    type: String,
    required: false,
  },
  redirectVisitors: {
    type: String,
    required: false,
  },
  closeFormAutomatically: {
    type: Boolean,
    required: false,
    default: false,
  },
  closeAfterSeconds: {
    type: Number,
    required: false,
  },
  sendLeadsToEmail: {
    type: Boolean,
    required: false,
    default: false,
  },
  enableRecaptcha: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// const AgentsSchema = new Schema({
//   userName: {
//     type: String,
//     required: false,
//   },
//   handle: {
//     type: String,
//     required: false,
//   },
//   id: {
//     type: String,
//     required: false,
//   },
//   iconUrl: {
//     type: String,
//     required: false,
//   },
//   profileImage: {
//     type: String,
//     required: false,
//   },
// });
// handle
// :
// "+92 345665768"
// iconUrl
// :
// "/icons/whatsapp.svg"
// id
// :
// "1728904943970"
// profileImage
// :
// "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA
// userName
// :
// "Haris"

// Define the schema for widget customization
// const previewSchema = new Schema ({
//   onCloseButton:{
//     type:String,
//     required: false,
//   }

// });

const WidgetCustomizationSchema = new Schema({
  CustomwidgetIcon: {
    type: String,
    required: false,
  },
  viewType: {
    type: String,
    enum: ["simple", "chat"],
    default: "simple",
  },
  widgetColor: {
    type: String,
    required: false,
  },
  position: {
    type: {
      type: String,
      enum: ["left", "right", "custom"],
      default: "right",
    },
    custom: {
      customPosition: {
        type: String,
        enum: ["left", "right"],
        required: false,
      },
      sideSpacing: {
        type: Number,
        required: false,
      },
      bottomSpacing: {
        type: Number,
        required: false,
      },
    },
  },
  iconsView: {
    type: String,
    required: false,
  },
  defaultState: {
    type: String,
    enum: ["click", "hover", "opened"],
    default: "click",
  },
  widgetIcon: {
    type: String,
    required: false,
  },
  callToActionText: {
    type: String,
    required: false,
  },
  widgetSize: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL", "Custom"],
    default: "M",
  },
  MobileWidgetSize: {
    type: String,
    enum: ["S", "M", "L", "Custom"],
    default: "S",
  },
  customwidgetIcon: {
    type: String,
    required: false,
  },
  PendingMessage: {
    type: String,
    required: false,
  },
  customSize: {
    type: Number,
    required: false,
  },
  customMobileSize: {
    type: Number,
    required: false,
  },
  callToActionTextColor: {
    type: String,
    required: false,
  },
  callToActionTextBackground: {
    type: String,
    required: false,
  },
  callToActionBehavior: {
    type: String,
    enum: ["hideAfterFirstClick", "showAllTheTime"],
    default: "hideAfterFirstClick",
  },
  closeButton: {
    type: Boolean,
    default: false,
  },
  customCss: {
    type: Boolean,
    default: false,
  },
  animationCustom: {
    type: Boolean,
    default: false,
  },
  googleAnalytics: {
    type: Boolean,
    default: false,
  },
});

// Define the schema for triggers and targeting rules
const TriggersAndTargetingSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
  displayAfterSeconds: {
    type: Number,
    required: false,
  },
  displayAfterPercentage: {
    type: Number,
    required: false,
  },

  displayCheckPercent: {
    type: Boolean,
    default: false,
  },
  displayCheckSecond: {
    type: Boolean,
    default: false,
  },

  exitIntentTrigger: {
    type: Boolean,
    default: false,
  },
  targetingRules: [
    {
      show: { type: Boolean, default: true },
      rule: { type: String, required: false },
      link: { type: String, required: false },
    },
  ],
  dateScheduling: [
    {
      id: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
      timeZone: { type: String, required: false },
      startTime: { type: String, required: false },
      endTime: { type: String, required: false },
    },
  ],

  trafficTrueFalse: {
    type: Boolean,
    default: false,
  },

  trafficSource: {
    directVisit: { type: Boolean, default: false },
    socialNetwork: { type: Boolean, default: false },
    searchEngines: { type: Boolean, default: false },
    googleAds: { type: Boolean, default: false },
    specificURL: { type: Boolean, default: false },
  },
  selectCountry: [
    {
      country: { type: String, required: false },
    },
  ],
  dateAndTime: [
    {
      id: { type: String, required: false },
      timeZone: { type: String, required: false },
      startTime: { type: String, required: false },
      endTime: { type: String, required: false },
      selectDays: { type: String, required: false },
    },
  ],
});

// Define the main settings schema
const SettingsSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    domainId: { type: Schema.Types.ObjectId, ref: 'Domain', required: true },
    channels: [ChannelSettingsSchema],
    preview: {
      onCloseButton: {
        type: String,
        required: false,
      },
    },
    widgetcustomization: WidgetCustomizationSchema,
    triggersAndTargeting: TriggersAndTargetingSchema,
    snippetCode: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Settings = (models?.Settings ||
  model("Settings", SettingsSchema)) as Model<SettingsInterface>;

export default Settings;
