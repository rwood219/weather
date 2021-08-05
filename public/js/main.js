!navigator.geolocation
  ? alert("app requires geolocation to be enabeled")
  : navigator.geolocation.getCurrentPosition(async (position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      data = json;
      const { current, hourly, daily, alerts, timezone } = data;
      let temp__units = (' F', ' C')
      console.log(data);


      //SET CURRENT WEATHER INFORMATION
     const current__weather__temp = document.querySelector('#current__weather__temp');
     current__weather__temp.textContent = Math.floor(current.temp) + (temp__units)
     
     console.log(current)

      //SET HEADER/ POSITION AND TIMEZONE
      document.querySelector(
        "h1"
      ).textContent = `Current Weather For ${timezone}`;

      //SET ALERT CONTENT IF THERE IS ANY
      if (data.alerts) {
        document.querySelector("#alert-text").textContent =
          alerts[0].description;
      }

      const date = new Date();
      let amPm = "AM" || "PM";

      //FORMAT TIME FOR 12 HOUR CLOCK
      formatHour = (hour, amPm) => {
        if (hour > 12) {
          hour = hour % 12 || 12;
        } else {
          hour = hour;        
        }
        return hour;
      };

      // HOURLY FORCAST / CREATE DIVS AND SET DATA 
      for (let i = 0; i < 24; i++) {
        const date = new Date();
        let hour = date.getHours();
        if (hour + i > 12 && hour + i < 24) {
          amPm = "PM";
        } else if (hour + i > 24 || hour + i < 12) {
          amPm = "AM";
        }
        let hourlyData = hourly[i];
        let hourTime = document.createElement("p");
        let hourlyHumidity = document.createElement("p");
        let newDiv = document.createElement("div");
        let hourlyWind = document.createElement("p");
        let hourTemp = document.createElement('p');
        hourTime.textContent = formatHour(hour + i) + amPm;
        hourlyWind.textContent = hourlyData.wind_speed + " MPH";
        hourlyHumidity.textContent = hourlyData.humidity + "%" + " HUMIDITY";
        newDiv.className = "new-div";
        hourTemp.textContent = hourlyData.temp + " F";
        document.getElementById("main__hour__forcast__ctn").appendChild(newDiv);
        newDiv.appendChild(hourTime);
        newDiv.appendChild(hourTemp)
        newDiv.appendChild(hourlyHumidity);
        newDiv.appendChild(hourlyWind);
      }
    

    //7 DAY FORCAST
   
    const currentDay = date.getDay();

    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    
    getNext7Days = (currentDay) => {
      const next7Days = [];
      for (let i = 1; i <= 8; i++) {
        let dayNumber = currentDay + i;
        let adjustedDayNumber = 0;
        dayNumber >= weekdays.length
          ? (adjustedDayNumber = dayNumber - weekdays.length)
          : (adjustedDayNumber = dayNumber);
        let day = weekdays[adjustedDayNumber];
        next7Days.push(day);
      }
      return next7Days;
    };

    for (let i = 0; i < daily.length; i++) {
      const nextDay = getNext7Days(currentDay)
      console.log(daily[i].temp.day , daily[i].temp.min, daily[i], nextDay[i])
    }
  })