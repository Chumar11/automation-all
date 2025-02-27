import { Suspense, useContext, useEffect, useState, lazy } from "react";
import PageOne from "../pageOne";
import { Box, Skeleton } from "@mui/material";
import NewProgressBar from "src/layout/MultiSteperProgress/ProgressBar";
import PageFour from "../pageFour/PageFour";
import PageThree from "../pageThree";
import PageTwo from "../pageTwo";
import { SettingsInterface } from "@/src/types/settings";
import { Types } from "mongoose";
import Preview from "../preview";
import BoxContainer from "../settings/boxContainer/styled";
import { themColor } from "@/src/theme/themColor";
import toast from "react-hot-toast";
import { AuthContext } from "@/src/contexts/AuthContext";
import FunctionalErrorBoundary from "../HandlingError";
import SubscriptionAlert from "../UI/subscription-alert";
import ConnectDomain from "../UI/connect-domain";
import axios from "axios";
import Alert from "../UI/Dialogue";
import Home from "@/src/pages";
import DashboardPage from "@/src/pages/home";
import AboutPage from "@/src/pages/about";
import { useQuery } from "react-query";
import * as api from "src/services";

const HomePage = ({ data, isloading }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("pageone");
  console.log("data:::", data);

  const nextPage = (page: string) => {
    setPage(page);
  };
  const { user, updateUser }: any = useContext(AuthContext);

  const [agentsList, setAgentsList] = useState(false);

  const [state, setState] = useState<SettingsInterface>({
    ...data,
  });
  console.log('State"::', state);

  // console.log("umarstate", state);

  useEffect(() => {
    if (data) {
      setState(data);
    } else {
      setState({
        _id: new Types.ObjectId(),
        domainId: new Types.ObjectId(),
        channels: [],

        preview: {
          onCloseButton: "close",
        },
        widgetcustomization: {
          viewType: "simple",
          widgetColor: themColor.primary,
          position: {
            type: "right",
            custom: {
              customPosition: "right",
              sideSpacing: 0,
              bottomSpacing: 0,
            },
          },
          closeButton: false,
          PendingMessage: 0,
          iconsView: "vertical",
          defaultState: "click",
          widgetIcon: 0,
          CustomwidgetIcon: "",
          callToActionText: "kdo Us",
          widgetSize: "S",
          customSize: 38,
          callToActionTextColor: "#89a1b8",
          callToActionTextBackground: "#fff",
          callToActionBehavior: "hideAfterFirstClick",
          customCss: false,
          animationCustom: false,
          googleAnalytics: false,
        },
        triggersAndTargeting: {
          active: false,
          displayAfterSeconds: 0,
          displayAfterPercentage: 0,
          displayCheckSecond: false,
          displayCheckPercent: false,
          exitIntentTrigger: false,
          targetingRules: [],
          dateScheduling: [],
          trafficTrueFalse: false,
          trafficSource: {
            directVisit: false,
            socialNetwork: false,
            searchEngines: false,
            googleAds: false,
            specificURL: false,
          },
          dateAndTime: [],
          selectCountry: [],
        },
        snippetCode: "",
      });
    }
  }, [data]);

  // const [state, setState] = useState<SettingsInterface>({
  //   _id: new Types.ObjectId(),
  //   userId: new Types.ObjectId(),
  //   channels: [
  //     {
  //       id: "1",
  //       channelType: "whatsapp",
  //       iconUrl: "/icons/whatsapp.svg",
  //       channelUrl: "https://wa.me/1234567890",
  //       iconBackground: "#54CF61",
  //       showOnDesktop: true,
  //       inputNumber: "+1",
  //       showOnMobile: true,
  //       hoverText: "WhatsApp",
  //       customImage: "",
  //       enableChatWidget: false,
  //       chatWidgetText: "How can I help you? :)",
  //       widgetHeading: "Let's Chat on WhatsApp",
  //       nickname: "Nickname",
  //       profileImage: "",
  //       placeholder: "Type your message...",
  //       presetMessage: "Hi, I need help with...",
  //     },
  //     {
  //       id: "2",
  //       channelType: "email",
  //       showOnDesktop: true,
  //       showOnMobile: true,
  //       hoverText: "Email",
  //       channelUrl: "demo@mail.com",
  //       iconBackground: "#FF4561",
  //       mailSubject: "Title and Url are Supported",
  //       iconUrl: "/icons/mail.svg",
  //       placeholder: "Example: john@example.com",
  //       customImage: "https://example.com/custom-email-image.png",
  //     },
  //     {
  //       id: "3",
  //       iconUrl: "/icons/instagram.svg",
  //       placeholder: "Example: Instagram__username",
  //       iconBackground: "linear-gradient(135deg, #8134AF, #E83B86)",
  //       channelType: "instagram",
  //       showOnDesktop: true,
  //       channelUrl: "user_name",
  //       showOnMobile: true,
  //       hoverText: "Instagram",
  //       customImage: "https://example.com/custom-instagram-image.png",
  //     },
  //     {
  //       id: "4",
  //       channelType: "contact form",
  //       hoverText: "Contact Form",
  //       showOnDesktop: true,
  //       showOnMobile: false,
  //       iconBackground: "#223B78",
  //       iconUrl: "/icons/notebook-of-contacts.svg",
  //       fields: [
  //         {
  //           id: "1",
  //           fieldName: "Name",
  //           value: "",
  //           fieldPlaceholder: "Enter your name",
  //           required: false,
  //           isEnabled: false,
  //         },
  //         {
  //           id: "2",
  //           fieldName: "Email",
  //           value: "",
  //           fieldPlaceholder: "Enter your email",
  //           required: true,
  //           isEnabled: true,
  //         },
  //         {
  //           id: "3",
  //           fieldName: "Phone",
  //           value: "",
  //           fieldPlaceholder: "Enter your phone number",
  //           required: true,
  //           isEnabled: true,
  //         },
  //         {
  //           id: "4",
  //           fieldName: "Message",
  //           value: "",
  //           fieldPlaceholder: "Enter your message",
  //           required: true,
  //           isEnabled: true,
  //         },
  //       ],
  //       contactFormTextField: "Contact Form",
  //       contactFormTitle: "Contact Us",
  //       submitButton: {
  //         textColor: "#FFFFFF",
  //         backgroundColor: "#007BFF",
  //         buttonText: "Send Message",
  //       },
  //       thankYouMessage: "You're all done!",
  //       redirectVisitors: "https://example.com/thank-you",
  //       closeFormAutomatically: false,
  //       closeAfterSeconds: 5,
  //       sendLeadsToEmail: true,
  //       enableRecaptcha: true,
  //     },
  //     {
  //       id: "5",
  //       channelType: "phone",
  //       iconUrl: "/icons/phone.svg",
  //       placeholder: "Example: +1234567890",
  //       showOnDesktop: true,
  //       channelUrl: "+1234567890",
  //       showOnMobile: true,
  //       hoverText: "phone",
  //       iconBackground: "#007dfc",
  //       customImage: "https://example.com/custom-phone-image.png",
  //     },

  //     // {
  //     //   id: "5",
  //     //   iconUrl: "/icons/custom.svg",
  //     //   placeholder: "Example: custom__username",
  //     //   iconBackground: "linear-gradient(135deg, #8134AF, #E83B86)",
  //     //   channelType: "custom5",
  //     //   showOnDesktop: true,
  //     //   channelUrl: "user_name",
  //     //   showOnMobile: true,
  //     //   hoverText: "custom",
  //     //   customImage: "https://example.com/custom-widget-image.png",
  //     // },
  //   ],
  //   preview: {
  //     onCloseButton: "Close",
  //   },
  //   widgetcustomization: {
  //     viewType: "simple",
  //     widgetColor: themColor.primary,
  //     position: {
  //       type: "right",
  //       custom: {
  //         customPosition: "right",
  //         sideSpacing: 25,
  //         bottomSpacing: 25,
  //       },
  //     },
  //     closeButton: false,
  //     PendingMessage: 1,
  //     iconsView: "vertical",
  //     defaultState: "click",
  //     widgetIcon: 0,
  //     CustomwidgetIcon: "",
  //     callToActionText: "Contact Us",
  //     widgetSize: "M",
  //     customSize: 38,
  //     callToActionTextColor: "#89a1b8",
  //     callToActionTextBackground: "#fff",
  //     callToActionBehavior: "hideAfterFirstClick",
  //     customCss: false,
  //     animationCustom: false,
  //     googleAnalytics: false,
  //   },
  //   triggersAndTargeting: {
  //     active: false,
  //     displayAfterSeconds: 10,
  //     displayAfterPercentage: 50,
  //     exitIntentTrigger: true,
  //     targetingRules: [],
  //     dateScheduling: [],
  //     dateAndTime: [],
  //   },
  //   snippetCode: "<script>console.log('Widget Loaded');</script>",
  // });
  // const [state, setState] = useState<SettingsInterface>({
  //   _id: new Types.ObjectId(),
  //   userId: new Types.ObjectId(),
  //   channels: [],
  //   preview: {
  //     onCloseButton: "Close",
  //   },
  //   widgetcustomization: {
  //     viewType: "simple",
  //     widgetColor: themColor.primary,
  //     position: {
  //       type: "right",
  //       custom: {
  //         customPosition: "right",
  //         sideSpacing: 0,
  //         bottomSpacing: 0,
  //       },
  //     },
  //     closeButton: false,
  //     PendingMessage: 0,
  //     iconsView: "vertical",
  //     defaultState: "opend",
  //     widgetIcon: 0,
  //     CustomwidgetIcon: "",
  //     callToActionText: "Contact Us",
  //     widgetSize: "M",
  //     customSize: 38,
  //     callToActionTextColor: "#89a1b8",
  //     callToActionTextBackground: "#fff",
  //     callToActionBehavior: "hideAfterFirstClick",
  //     customCss: false,
  //     animationCustom: false,
  //     googleAnalytics: false,
  //   },
  //   triggersAndTargeting: {
  //     active: false,
  //     displayAfterSeconds: 0,
  //     displayAfterPercentage: 0,
  //     exitIntentTrigger: false,
  //     targetingRules: [],
  //     dateScheduling: [],
  //     trafficSource: {
  //       directVisit: false,
  //       socialNetwork: false,
  //       searchEngines: false,
  //       googleAds: false,
  //       specificURL: false,
  //     },
  //     dateAndTime: [],
  //     selectCountry: [],
  //   },
  //   snippetCode: "",
  // });
  useEffect(() => {
    console.log("This is the updated state", state);
  }, [state]);
  // console.log("state", state.channels.inputNumber);
  const nextPageNumber = (pageNumber: number) => {
    switch (pageNumber) {
      case 1:
        setPage("pageone");
        break;
      case 2:
        if (state.channels.some((channel) => channel.channelUrl === "")) {
          toast.error("Please Add details in all the selected channels");
          return;
        }
        if (state.channels.length === 0) {
          toast.error("Please select at least one channel");
          return;
        }

        setPage("pagetwo");
        break;
      case 3:
        if (state.channels.length === 0) {
          toast.error("Please select at least one channel");
          return;
        }
        setPage("pagethree");
        break;
      case 4:
        setPage("pagefour");
        break;
      default:
        setPage("pageone");
    }
  };

  const { data: myselfData } = useQuery(["user"], () => api.getMySelf(), {
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!myselfData) return;
    const storedUser = localStorage.getItem("user");
    if (storedUser && JSON.stringify(myselfData) === storedUser) return;
    localStorage.setItem("user", JSON.stringify(myselfData));
    updateUser(myselfData);
  }, [myselfData, updateUser]);

  return (
    <Box
      className="bg-red-950"
      sx={{
        background: " #f7f8fc",
        padding: "0",
        position: "relative",
      }}
    >
      {isloading && (
        <BoxContainer style={{ display: "flex", justifyContent: "center" }}>
          <Skeleton variant="rectangular" width={700} height={471} />
          <Skeleton variant="rectangular" width={400} height={380} />
        </BoxContainer>
      )}
      {user?.domain?.includes("wixsite") && !isloading && (
        <ConnectDomain state={state} />
      )}
      {!user?.domain?.includes("wixsite") && !isloading && (
        <>
          {/* {user.plan === "free" && !isloading && (
            <SubscriptionAlert setOpen={setOpen} />
          )}
          {user.plan !== "free" && !isloading && (
            <>
              <FunctionalErrorBoundary
                fallback={<p>Something went wrong. Please try again.</p>}
              >
                <NewProgressBar
                  onPageNumberClick={nextPageNumber}
                  page={page}
                  state={state}
                  setState={setState}
                />
              </FunctionalErrorBoundary>

              <BoxContainer sx={{ display: "flex" }}>
                {
                  {
                    pageone: (
                      <FunctionalErrorBoundary
                        fallback={
                          <p>Something went wrong. Please try again.</p>
                        }
                      >
                        <PageOne
                          setAgentsList={setAgentsList}
                          agentsList={agentsList}
                          isloading={isloading}
                          onButtonClick={nextPage}
                          state={state}
                          setState={setState}
                          title={" Select channels "}
                        />
                      </FunctionalErrorBoundary>
                    ),
                    pagetwo: (
                      <FunctionalErrorBoundary
                        fallback={
                          <p>Something went wrong. Please try again.</p>
                        }
                      >
                        <PageTwo
                          state={state}
                          setState={setState}
                          onButtonClick={nextPage}
                          title={" Widget Customization"}
                        />
                      </FunctionalErrorBoundary>
                    ),
                    pagethree: (
                      <FunctionalErrorBoundary
                        fallback={
                          <p>Something went wrong. Please try again.</p>
                        }
                      >
                        <PageThree
                          state={state}
                          setState={setState}
                          onButtonClick={nextPage}
                          title={" Triggers and targeting"}
                        />
                      </FunctionalErrorBoundary>
                    ),
                    // pagefour: (
                    //   <PageFour
                    //     onButtonClick={nextPage}
                    //     title={"Add Live Chat"}
                    //   />
                    // ),
                  }[page]
                }
                {page && (
                  <FunctionalErrorBoundary
                    fallback={<p>Something went wrong. Please try again.</p>}
                  >
                    <Preview
                      state={state}
                      setState={setState}
                      isloading={isloading}
                    />
                  </FunctionalErrorBoundary>
                )}
              </BoxContainer>
            </>
          )} */}

          {user.plan === "free" && !isloading ? (
            <SubscriptionAlert setOpen={setOpen} />
          ) : (
            !isloading && (
              <>
                <FunctionalErrorBoundary
                  fallback={<p>Something went wrong. Please try again.</p>}
                >
                  <NewProgressBar
                    onPageNumberClick={nextPageNumber}
                    page={page}
                    state={state}
                    setState={setState}
                  />
                </FunctionalErrorBoundary>
                <BoxContainer sx={{ display: "flex" }}>
                  {
                    {
                      pageone: (
                        <FunctionalErrorBoundary
                          fallback={
                            <p>Something went wrong. Please try again.</p>
                          }
                        >
                          <PageOne
                            setAgentsList={setAgentsList}
                            agentsList={agentsList}
                            isloading={isloading}
                            onButtonClick={nextPage}
                            state={state}
                            setState={setState}
                            title={" Select channels "}
                          />
                        </FunctionalErrorBoundary>
                      ),
                      pagetwo: (
                        <FunctionalErrorBoundary
                          fallback={
                            <p>Something went wrong. Please try again.</p>
                          }
                        >
                          <PageTwo
                            state={state}
                            setState={setState}
                            onButtonClick={nextPage}
                            title={" Widget Customization"}
                          />
                        </FunctionalErrorBoundary>
                      ),
                      pagethree: (
                        <FunctionalErrorBoundary
                          fallback={
                            <p>Something went wrong. Please try again.</p>
                          }
                        >
                          <PageThree
                            state={state}
                            setState={setState}
                            onButtonClick={nextPage}
                            title={" Triggers and targeting"}
                          />
                        </FunctionalErrorBoundary>
                      ),
                      // pagefour: (
                      //   <PageFour
                      //     onButtonClick={nextPage}
                      //     title={"Add Live Chat"}
                      //   />
                      // ),
                    }[page]
                  }
                  {page && (
                    <FunctionalErrorBoundary
                      fallback={<p>Something went wrong. Please try again.</p>}
                    >
                      <Preview
                        state={state}
                        setState={setState}
                        isloading={isloading}
                      />
                    </FunctionalErrorBoundary>
                  )}
                </BoxContainer>
              </>
            )
          )}
        </>
      )}
      {open && <Alert open={open} setOpen={setOpen} />}
    </Box>
  );
};

export default HomePage;
