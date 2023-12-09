import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TodoWrapper from "./to-do";
import Login from "./login";
import SignUp from "./sign-up";
import ForgotPassword from "./forgot-password";
import AuthRoute from "./components/auth-route";
import CircularLoader from "./components/circular-loader";
import { AppContext } from "./AppContext";
import "./App.css";

function App() {
  const { loading } = useContext(AppContext);
  return (
    // <div
    //   style={{
    //     height: "calc(100vh - 4rem)",
    //     width: "calc(100% - 4rem)",
    //     padding: "2rem",
    //     display: "flex",
    //     gap: "2rem",
    //   }}
    // >
    //   <MUICard sx={{ width: 210, height: 116, position: "relative" }}>
    //     <CardContent sx={{ height: "100%" }}>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           height: "calc(100% - 32px)",
    //         }}
    //       >
    //         <Typography
    //           sx={{
    //             wordWrap: "break-word",
    //             overflow: "hidden",
    //             height: "4rem",
    //           }}
    //           title="ggdhdkj_jhgrgfhyruhfj_fjrhgbftuegyrnhfiuerijk_jher_lkjhghfcghbjnkmkjhgcvbn__dhgefwghfkjgeyhjk__hgfghjkftghjk"
    //         >
    //           ggdhdkj_jhgrgfhyruhfj_fjrhgbftuegyrnhfiuerijk_jher_lkjhghfcghbjnkmkjhgcvbn__dhgefwghfkjgeyhjk__hgfghjkftghjk
    //         </Typography>
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             position: "absolute",
    //             bottom: "5px",
    //             width: "calc(100% - 2rem)",
    //           }}
    //         >
    //           <div style={{ display: "flex" }}>
    //             <PriorityHighIcon />
    //             <Typography>8</Typography>
    //           </div>
    //           <Image />
    //         </div>
    //       </div>
    //     </CardContent>
    //   </MUICard>
    //   <MUICard sx={{ width: 210, height: 116, position: "relative" }}>
    //     <CardContent sx={{ height: "100%" }}>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           height: "calc(100% - 32px)",
    //         }}
    //       >
    //         <Typography
    //           sx={{
    //             wordWrap: "break-word",
    //             overflow: "hidden",
    //             height: "4rem",
    //           }}
    //         >
    //           ggdhdkj_jhgrgfhyruhfj_fjrhgbftuegyrnhfiuerij
    //         </Typography>
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             position: "absolute",
    //             bottom: "5px",
    //             width: "calc(100% - 25px)",
    //           }}
    //         >
    //           <div style={{ display: "flex" }}>
    //             <PriorityHighIcon />
    //             <Typography>6</Typography>
    //           </div>
    //           <Image />
    //         </div>
    //       </div>
    //     </CardContent>
    //   </MUICard>
    // </div>
    <div className="App">
      {loading && <CircularLoader />}
      <Routes>
        <Route path="/" element={<Navigate to="todo_app" replace={true} />} />
        <Route
          path="todo_app"
          element={<AuthRoute component={TodoWrapper} />}
        />
        <Route
          path="login"
          element={<AuthRoute component={Login} skipCheck={true} />}
        />
        <Route
          path="signup"
          element={<AuthRoute component={SignUp} skipCheck={true} />}
        />
        <Route
          path="forgot_password"
          element={<AuthRoute component={ForgotPassword} skipCheck={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
