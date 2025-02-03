import { axiosInstance } from "../../api/axiosInstance";
import { useState, useEffect } from "react";
// import axios from "axios";

export default function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  // Fetch Timer State from Backend
  useEffect(() => {
    const fetchTimerState = async () => {
      try {
        // const response = await axiosInstance.get("/user/timer");
        const response = await axiosInstance.get("/user/getElapsedTime");
        console.log("Elapsed Time data Response", response.data.data)
        // const { elapsedTime, isRunning, isCheckedOut } = response.data;
        const { elapsedTime, isRunning, isCheckedOut } = response.data.data;
        // console.log("Response data of fetchTimerState Frontend", response.data.data)
        setElapsedTime(elapsedTime);
        setIsRunning(isRunning);
        setIsCheckedOut(isCheckedOut);
      } catch (error) {
        console.error("Failed to fetch timer state", error);
      }
    };

    fetchTimerState();
    const interval = setInterval(fetchTimerState, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Timer UI Update
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format Time
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Start Timer
  const handleStart = async () => {
    const res = await axiosInstance.post("/user/checkIn");
    console.log("Response from handleStart Template", res)
    setIsRunning(true);
    setElapsedTime(0);
  };

  // Pause Timer
  const handlePause = async () => {
    await axiosInstance.put("/user/pauseOrResume");
    setIsRunning(false);
  };

  // Resume Timer
  const handleResume = async () => {
    await axiosInstance.put("/user/timer/resume");
    setIsRunning(true);
  };

  // Check Out (Stop & Reset)
  const handleCheckOut = async () => {
    await axiosInstance.put("/user/checkout");
    setIsRunning(false);
    setElapsedTime(0);
    setIsCheckedOut(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{formatTime(elapsedTime)}</h1>

      <button onClick={handleStart} disabled={isRunning || isCheckedOut}>
        Check-In
      </button>

      <button onClick={handlePause} disabled={isCheckedOut}>
        {/* <button onClick={handlePause} > */}
        Pause
      </button>

      <button onClick={handleResume} disabled={isRunning || isCheckedOut}>
        Resume
      </button>

      <button onClick={handleCheckOut} disabled={isCheckedOut}>
        {/* <button onClick={handleCheckOut}> */}
        Check-Out
      </button>
    </div>
  );
}














// import { useState, useEffect } from "react";
// import moment from "moment";
// import io from "socket.io-client";
// import { axiosInstance } from "../../api/axiosInstance";

// const socket = io("http://localhost:6007");

// const Template = () => {
//   const [isTracking, setIsTracking] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [timeEntry, setTimeEntry] = useState(null);

//   useEffect(() => {
//     socket.on("timer_update", ({ userId, elapsedTime }) => {
//       if (!isPaused) {
//         setElapsedTime(elapsedTime);
//       }
//     });

//     return () => {
//       socket.off("timer_update");
//     };
//   }, [isPaused]);

//   const handleCheckIn = async () => {
//     try {
//       const res = await axiosInstance.post("/user/checkIn");
//       setTimeEntry(res.data.data);
//       setIsTracking(true);
//       setElapsedTime(0); // Reset time to 0

//       socket.emit("start_timer", { userId: res.data.data.userId, checkIn: Date.now() });
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };


//   const handlePause = async () => {
//     try {
//       const res = await axiosInstance.post("/user/pauseOrResume");
//       setIsPaused(res.data.data.isPaused);

//       if (res.data.data.isPaused) {
//         socket.emit("pause_timer", res.data.data.userId);
//       } else {
//         // Resume and add totalDuration
//         setElapsedTime(res.data.data.totalDuration);
//         socket.emit("resume_timer", res.data.data.userId);
//       }
//     } catch (error) {
//       console.log("Error from handlePause", error);
//     }
//   };


//   const handleCheckOut = async () => {
//     try {
//       const res = await axiosInstance.post("/user/checkOut");
//       setTimeEntry(res.data.data);
//       setElapsedTime(res.data.data.totalDuration); // Set final time
//       setIsTracking(false);
//       setIsPaused(false);
//       socket.emit("pause_timer", res.data.data.userId);
//     } catch (error) {
//       console.log("Error from handleCheckOut", error);
//     }
//   };


//   return (
//     <div className="time-tracker">
//       <h2>Work Time Tracker</h2>
//       <p>Time: {moment.utc(elapsedTime * 1000).format("HH:mm:ss")}</p>

//       {!isTracking ? (
//         <button onClick={handleCheckIn}>Check In</button>
//       ) : (
//         <>
//           <button onClick={handlePause}>{isPaused ? "Resume" : "Pause"}</button>
//           <button onClick={handleCheckOut}>Check Out</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Template;
