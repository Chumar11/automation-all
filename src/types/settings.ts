import { Document, Types } from "mongoose";
import { boolean } from "yup";

// Common Channel Settings Interface
export interface ChannelSettings {
  id: string;
  channelType: string; // e.g., 'whatsapp', 'email', etc.
  iconUrl?: string;
  showOnDesktop?: boolean;
  showOnMobile?: boolean;
  mailSubject?: string;
  hoverText?: string;
  iconBackground?: string;
  customImage?: string;
  // inputNumber?: string;
  channelUrl?: string;
  // WhatsApp-Specific Settings
  enableChatWidget?: boolean;
  chatWidgetText?: string;
  widgetHeading?: string;
  nickname?: string;
  profileImage?: string;
  placeholder?: string;
  presetMessage?: string;
  // Contact Form-Specific Settings
  fields?: ContactFormField[];

  contactFormTextField?: string;
  contactFormTitle?: string;
  submitButton?: SubmitButtonSettings;
  agents?: Agent[];
  thankYouMessage?: string;
  toEmail?: string;
  redirectVisitors?: string;
  closeFormAutomatically?: boolean;
  closeAfterSeconds?: number;
  sendLeadsToEmail?: boolean;
  enableRecaptcha?: boolean;
}

export interface Agent {
  id: string;
  salesSupport: string;
  userName: string;
  handle: string;
  iconUrl: string;
  profileImage?: string;
}

// Contact Form Field Interface
export interface ContactFormField {
  id: string;
  fieldName?: string;
  value?: string;
  fieldPlaceholder?: string;
  required?: boolean;
  isEnabled?: boolean;
}

// Submit Button Settings Interface for Contact Form
interface SubmitButtonSettings {
  textColor?: string;
  backgroundColor?: string;
  buttonText?: string;
}
interface preview {
  onCloseButton: string;
}

// Widget Customization Interface
interface Widgetcustomization {
  viewType?: "simple" | "chat";
  widgetColor?: string;
  position?: WidgetPosition;
  iconsView?: "vertical" | "horizontal";
  defaultState?: "click" | "hover" | "opened";
  closeButton?: boolean;
  widgetIcon?: number;
  googleAnalytics?: boolean;
  customCss?: boolean;
  PendingMessage?: number;
  CustomwidgetIcon?: string;
  callToActionText?: string;
  widgetSize?: "S" | "M" | "L" | "XL" | "XXL" | "Custom";
  MobileWidgetSize?: "S" | "M" | "L" | "Custom";
  customSize?: number | undefined;
  customMobileSize?: number | undefined;
  callToActionTextColor?: string;
  callToActionTextBackground?: string;
  animationCustom?: boolean;
  callToActionBehavior?: "hideAfterFirstClick" | "showAllTheTime";
}

// Widget Position Interface
interface WidgetPosition {
  type?: "left" | "right" | "custom";
  custom?: {
    customPosition?: "left" | "right";
    sideSpacing?: number;
    bottomSpacing?: number;
  };
}

// Triggers and Targeting Rules Interface
interface TargetingRule {
  show?: boolean;
  rule?: string;
  link?: string;
}

export interface DateScheduling {
  id: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
}

export interface DateAndTime {
  id: string;
  startTime?: string;
  endTime?: string;
  timeZone?: string;
  selectDays?: string;
}

export interface SelectCountry {
  id?: string; // required unless it's truly optional
  country?: string; // required unless it's optional
}
export interface TrafficSource {
  directVisit?: boolean;
  socialNetwork?: boolean;
  searchEngines?: boolean;
  googleAds?: boolean;
  specificURL?: boolean;
}

interface TriggersAndTargeting {
  timeZone?: string;
  active?: boolean;
  displayCheckSecond?: boolean;
  displayCheckPercent?: boolean;
  displayAfterSeconds?: number;
  displayAfterPercentage?: number;
  exitIntentTrigger?: boolean;
  trafficSource: TrafficSource;
  trafficTrueFalse?: boolean;
  targetingRules?: TargetingRule[]; // Ensure TargetingRule type is defined
  dateScheduling?: DateScheduling[]; // Ensure DateScheduling type is defined
  dateAndTime?: DateAndTime[]; // Ensure DateAndTime type is defined
  selectCountry?: SelectCountry[]; // List of SelectCountry
}

// // Main Settings Interface
export interface SettingsInterface {
  _id: Types.ObjectId;
  domainId: Types.ObjectId;
  // userId: Types.ObjectId;
  channels: ChannelSettings[];
  preview: preview;
  widgetcustomization?: Widgetcustomization;
  triggersAndTargeting?: TriggersAndTargeting;
  snippetCode?: string;
}
