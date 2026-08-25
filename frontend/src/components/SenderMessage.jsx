import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

function SenderMessage({ message, image, time }) {
  const scroll = useRef();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex justify-end items-end gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4">

      {/* Message Bubble */}
      <div
        className="
          max-w-[82%]
          sm:max-w-[70%]
          md:max-w-[60%]
          lg:max-w-[52%]

          bg-indigo-600
          text-white

          rounded-[20px]
          rounded-br-[6px]

          overflow-hidden
        "
        ref={scroll}
      >

        {/* Image Message */}
        {image && (
          <div className="p-1">
            <img
              src={image}
              alt="sent"
              className="
                block
                w-full
                max-w-[260px]
                sm:max-w-[320px]
                md:max-w-[350px]

                max-h-[300px]
                sm:max-h-[360px]

                object-cover
                rounded-[16px]
              "
              onLoad={handleImageScroll}
            />
          </div>
        )}

        {/* Text Message */}
        {message && (
          <p
            className="
              px-3
              sm:px-3.5
              md:px-4

              py-2
              sm:py-2.5

              text-[13px]
              sm:text-sm
              md:text-[15px]

              leading-relaxed
              break-words
            "
          >
            {message}
          </p>
        )}

        {/* Time */}
        <span
          className="
            block
            text-[9px]
            sm:text-[10px]
            md:text-[11px]

            text-indigo-200
            text-right

            px-3
            sm:px-3.5
            md:px-4

            pb-1.5
          "
        >
          {time}
        </span>
      </div>

      {/* Sender Profile */}
      <img
        src={userData?.user?.image}
        alt="profile"
        className="
          w-7 h-7
          sm:w-8 sm:h-8
          md:w-9 md:h-9

          rounded-full
          object-cover
          shrink-0
        "
      />

    </div>
  );
}

export default SenderMessage;