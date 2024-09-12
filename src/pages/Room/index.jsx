import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RoomPage = () => {
  const { roomId } = useParams();
  const user = useSelector((user) => user.login.loggedIn);
  const meetingContainer = useRef(null);

  useEffect(() => {
    const startMeeting = async () => {
      const appID = Number(import.meta.env.VITE_APP_ID);
      const serverSecret = import.meta.env.VITE_APP_SERVERSECRET;

      if (appID && serverSecret) {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          user.uid,
          user.displayName
        );
        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
          container: meetingContainer.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: `${import.meta.env.VITE_BASE_URL}/room/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: true,
        });
      } else {
        console.error("AppID or ServerSecret is missing.");
      }
    };

    startMeeting();
  }, [roomId]);

  return (
    <>
      <Helmet>
        <title>Room</title>
      </Helmet>
      <div
        ref={meetingContainer}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </>
  );
};

export default RoomPage;
