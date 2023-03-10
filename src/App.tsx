import React, { useEffect, useState } from "react";
import logo from "./imgs/adaptive-icon.png";
import { animateScroll as scroll } from "react-scroll";
import "./App.css";
import { View, ViewRow } from "./components/Divs";
import { Colors } from "./Constants/Colors";
import { Label, Title } from "./components/Texts";
import ptbr from "./Constants/locales/ptbr.json";
import enus from "./Constants/locales/enus.json";
import Bt from "./components/Bt";

/**IMGS */
import screen1 from "./imgs/screens/screen1.png";
import screen2 from "./imgs/screens/screen2.png";
import screen3 from "./imgs/screens/screen3.png";
import { FiArrowUp } from "react-icons/fi";
import { FaAndroid, FaApple, FaDonate, FaQuestion, FaQuestionCircle } from "react-icons/fa";

function App() {
  const language = navigator.language;
  const portrait = window.innerHeight > window.innerWidth;
  const [t, setT] = useState<typeof enus>();

  const appView = document.getElementById("app") as HTMLDivElement;

  useEffect(() => {
    switch (language.toLowerCase()) {
      case "pt-br":
        setT(ptbr);
        break;
      case "en-us":
        setT(enus);
        break;
      default:
        setT(enus);
    }
  }, [language]);
  return (
    <View className="App" style={{ backgroundColor: Colors.primary }} id="app">
      <View className="App-header" id={"home"}>
        <img src={logo} className="App-logo" alt="logo" />
        <Title lightColor>PixelHelper</Title>
        <Label>{t?.txt1}</Label>
        <ViewRow style={{ paddingTop: 30, justifyContent: "space-between", gap: 20 }}>
          <Bt
            onClick={() => {
              const to = document.getElementById("howto");
              scroll.scrollTo(to.offsetTop, { duration: 500 });
            }}
          >
            <FaQuestionCircle />
            {t?.how_to}
          </Bt>
          <a href="https://apps.apple.com/br/app/pixelhelper/id6445954946">
            <Bt>
              <FaApple />
              {t?.download} Apple Store
            </Bt>
          </a>
          {/* <Bt>
            <FaAndroid />
            {t?.download} PlayStore
          </Bt> */}
        </ViewRow>
        <ViewRow style={{ marginTop: 20, gap: 20, flexWrap: "wrap" }}>
          <View style={{ alignItems: "flex-start" }}>
            <Label lightColor>{t?.developer}: Renato Pedroso</Label>
            <Label lightColor>
              <a href="mailto:natopedroso@gmail.com">Email: natopedroso@gmail.com</a>
            </Label>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Label>{t?.donate_msg1}</Label>
            <Label>{t?.donate_msg2}</Label>
            <Label>{t?.donate_msg3}</Label>
          </View>
        </ViewRow>
        <ViewRow style={{ justifyContent: "center", marginTop: 20 }}>
          <a href={t?.donate_link} target="_blank" rel="noreferrer">
            <Bt>
              <FaDonate />
              {t?.donate}
            </Bt>
          </a>
        </ViewRow>
      </View>
      <View className="App-header" id={"howto"} style={{ backgroundColor: Colors.secondaryDark }}>
        <ViewRow style={{ padding: 20, alignItems: "center" }}>
          <img src={logo} className="App-logo-small" alt="logo" />
          <Title lightColor>PixelHelper</Title>
          <Bt
            style={portrait ? {} : { position: "absolute", right: 10 }}
            onClick={() => {
              scroll.scrollToTop({ duration: 500 });
            }}
          >
            <FiArrowUp />
            {t?.start}
          </Bt>
        </ViewRow>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: "100%" }}>
          <ViewRow>
            <View style={{ flex: 1 }}>
              <img src={screen1} style={{ maxHeight: "60vh", objectFit: "contain" }} alt="" className="screens" />
            </View>
            <View style={{ flex: 1, padding: 20, gap: 20 }}>
              <Label>{t?.how_to_txt}</Label>
              <Bt
                bg2={Colors.primary}
                onClick={() => {
                  const to = document.getElementById("howtoledpanel");
                  scroll.scrollTo(to.offsetTop, { duration: 500 });
                }}
              >
                {t?.led_panel}
              </Bt>
              <Bt
                bg2={Colors.primary}
                onClick={() => {
                  const to = document.getElementById("howtoprojector");
                  scroll.scrollTo(to.offsetTop, { duration: 500 });
                }}
              >
                {t?.projection}
              </Bt>
            </View>
          </ViewRow>
        </View>
      </View>
      <View className="App-header" id={"howtoledpanel"}>
        <ViewRow style={{ padding: 20, alignItems: "center" }}>
          <img src={logo} className="App-logo-small" alt="logo" />
          <Title lightColor>PixelHelper - {t?.led_panel}</Title>{" "}
          <Bt
            style={portrait ? {} : { position: "absolute", right: 10 }}
            onClick={() => {
              const to = document.getElementById("howto");
              scroll.scrollTo(to.offsetTop, { duration: 500 });
            }}
          >
            <FiArrowUp />
            {t?.back}
          </Bt>
        </ViewRow>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: "100%", position: "relative" }}>
          <ViewRow style={{ flexWrap: "wrap" }}>
            <View style={{ flex: 1 }}>
              <img src={screen2} style={{ maxHeight: "60vh", objectFit: "contain" }} alt="" className="screens" />
            </View>
            <View style={{ flex: 1, padding: 20, gap: 20, alignItems: "flex-start", minWidth: "50vw" }}>
              <Label style={{ fontSize: 16, textAlign: "left" }}>{t?.how_to_led_panel_txt1}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>{t?.how_to_led_panel_txt2}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>{t?.how_to_led_panel_txt3}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>{t?.how_to_led_panel_txt4}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>{t?.how_to_led_panel_txt5}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>- {t?.gabinet_quantity_x_y}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>- {t?.gabinet_size_m_x_y}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>- {t?.gabinet_pixels_x_y}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>- {t?.gabinet_weight}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>- {t?.consumption_by_m2_or_q}</Label>
              <Label style={{ fontSize: 16, textAlign: "left" }}>{t?.how_to_led_panel_txt6}</Label>
            </View>
          </ViewRow>
          <Bt
            style={portrait ? { marginBottom: 20 } : { position: "absolute", left: 20, bottom: 20 }}
            onClick={() => {
              const to = document.getElementById("howtoprojector");
              scroll.scrollTo(to.offsetTop, { duration: 500 });
            }}
          >
            {t?.projection}
          </Bt>
        </View>
      </View>
      <View className="App-header" id={"howtoprojector"} style={{ backgroundColor: Colors.secondaryDark }}>
        <ViewRow style={{ padding: 20, alignItems: "center" }}>
          <img src={logo} className="App-logo-small" alt="logo" />
          <Title lightColor>PixelHelper - {t?.projection}</Title>{" "}
          <Bt
            style={portrait ? {} : { position: "absolute", right: 10 }}
            onClick={() => {
              const to = document.getElementById("howto");
              scroll.scrollTo(to.offsetTop, { duration: 500 });
            }}
          >
            <FiArrowUp />
            {t?.back}
          </Bt>
        </ViewRow>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: "100%", position: "relative" }}>
          <ViewRow style={{ flexWrap: "wrap" }}>
            <View style={{ flex: 1 }}>
              <img src={screen3} style={{ maxHeight: "60vh", objectFit: "contain" }} alt="" className="screens" />
            </View>
            <View style={{ flex: 1, padding: 20, gap: 20, minWidth: "50vw" }}>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                {t?.how_to_projector_txt1}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                {t?.how_to_projector_txt2}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                {t?.how_to_projector_txt3}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                {t?.how_to_projector_txt4}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                {t?.how_to_projector_txt5}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                - {t?.screen_size_m_x_y}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                - {t?.projector_resolution_x_y}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                - {t?.projector_lens_factor}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                - {t?.projector_lumens}
              </Label>
              <Label lightColor style={{ fontSize: 16, textAlign: "left" }}>
                {t?.how_to_led_panel_txt6}
              </Label>
            </View>
          </ViewRow>
          <Bt
            style={portrait ? { marginBottom: 20 } : { position: "absolute", left: 20, bottom: 20 }}
            onClick={() => {
              const to = document.getElementById("howtoledpanel");
              scroll.scrollTo(to.offsetTop, { duration: 500 });
            }}
          >
            {t?.led_panel}
          </Bt>
        </View>
      </View>
    </View>
  );
}

export default App;
