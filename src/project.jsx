"@babel/plugin-proposal-private-property-in-object";
// Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

//React Hooks
import { useEffect, useState } from "react";

// External Libraries
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";
import "./i18n";
moment.locale("ar");
let cancelAxios = null;

//----------------------------------------------------------
export default function Project() {
  const [language, setLanguage] = useState("ar");
  const direction = language === "ar" ? "rtl" : "ltr";
  const { t, i18n } = useTranslation();
  // console.log(t, "this t");

  const [dateAndTime, setDateAndTime] = useState("");
  // console.log(dateAndTime);

  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  useEffect(() => {
    i18n.changeLanguage(language);
    setDateAndTime(moment().subtract(10, "days").calendar());
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.774265&lon=46.738586&appid=1c70ad67e39f7092c34fa1077253da1d",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        setTemp({
          number: responseTemp,
          description: description,
          min: min,
          max: max,
          icon: icon,
        });
        // console.log(response.data);
        // console.log(temp);
        // console.log(min);
        // console.log(max);
        // console.log(description);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);
  //------------------------------------------------------------------
  function handleLanguageClick() {
    if (language === "ar") {
      setLanguage("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else if (language === "en") {
      setLanguage("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setDateAndTime(moment().subtract(10, "days").calendar());
  }

  return (
    <Container maxWidth="sm">
      <div
        dir={direction}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "orange",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 11px 5px rgp(0, 0, 0, 0.5)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end",
            }}
          >
            <Typography
              variant="h4"
              style={{ margin: "20px", fontWeight: "600" }}
            >
              {t("Riyadh")}
            </Typography>
            <Typography variant="h5" style={{ margin: "20px" }}>
              {dateAndTime}
            </Typography>
          </div>
          <hr />
          <div
            dir={direction}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "20px",
                textAlign: "right",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h1">{temp.number}</Typography>
                <img src={temp.icon} />
              </div>
              <h4>{t(temp.description)}</h4>
              <span
                style={{
                  display: "flex",
                }}
              >
                <h5>
                  {t("max")}: {temp.max}
                </h5>
                <h5 style={{ margin: " 0px 10px" }}>|</h5>
                <h5
                  style={{
                    marginRight: "5px",
                  }}
                >
                  {t("min")}: {temp.min}
                </h5>
              </span>
            </div>
            <CloudIcon sx={{ fontSize: "200px", marginLeft: "20px" }} />
          </div>
        </div>
        <div
          dir={direction}
          style={{
            width: "100%",
            marginTop: "5px",
            color: "white",
          }}
        >
          <Button
            variant="text"
            style={{
              color: "white",
            }}
            onClick={handleLanguageClick}
          >
            {language === "ar" ? "انجليزي" : "Arabic"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
