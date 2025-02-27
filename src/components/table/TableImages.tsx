import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as api from "src/services";
import { Avatar, Box } from "@mui/material";
import { debounce } from "lodash";
// import debounce from "lodash/debounce";

const TableImages = ({ domain, user }: any) => {
  const [state, setState] = useState<any>([]);
  const [maxVisibleAvatars, setMaxVisibleAvatars] = useState(4); // Default is 4

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth < 725) {
        setMaxVisibleAvatars(0);
      } else if (window.innerWidth < 1000) {
        setMaxVisibleAvatars(2);
      } else {
        setMaxVisibleAvatars(4);
      }
    }, 200); // Adjust the debounce time as needed

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`/api/domain?userId=${user._id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.log("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, [user]);

  const filterId = state.find((item: any) => item.id === domain);
  const mainId = filterId?.id;

  const { data } = useQuery(["all blog", filterId?._id], () =>
    api.getWidgetSettings(filterId)
  );

  const remainingAvatars = (data?.channels?.length || 0) - maxVisibleAvatars;

  return (
    <Box
      sx={{
        fontSize: "1rem",
        marginBottom: ".8rem",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          paddingLeft: "5px",
          minWidth: "80px",
        }}
      >
        {data?.channels
          ?.slice(0, maxVisibleAvatars)
          .map((item: any, index: number) => (
            <Avatar
              key={item.channelType || index} // Use channelType or index as key
              sx={{
                width: "40px",
                height: "40px",
                background: item.iconBackground,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "-5px",
              }}
            >
              <img
                style={{
                  width: "25px",
                  height: "25px",
                }}
                src={item.iconUrl}
                alt={item.channelType}
              />
            </Avatar>
          ))}
        {remainingAvatars > 0 && (
          <Box
            sx={{
              width: "40px",
              height: "40px",
              background: "#d5d2d2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "-5px",
              color: "white",
              borderRadius: "50%",
              fontSize: "16px",
            }}
          >
            +{remainingAvatars}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TableImages;
