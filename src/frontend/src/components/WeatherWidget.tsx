import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  return "⛈️";
}

function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  return "Thunderstorm";
}

function getFlyingCondition(
  wind: number,
  code: number,
): { label: string; color: string; bg: string } {
  const isRainy = code >= 45;
  if (wind > 35 || isRainy)
    return { label: "MARGINAL", color: "#FF4444", bg: "rgba(255,68,68,0.15)" };
  if (wind > 20 || code > 3)
    return {
      label: "GOOD",
      color: "#FFD700",
      bg: "rgba(255,215,0,0.15)",
    };
  return {
    label: "EXCELLENT",
    color: "#00FF88",
    bg: "rgba(0,255,136,0.15)",
  };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=28.2096&longitude=83.9856&current=temperature_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh",
    )
      .then((r) => r.json())
      .then((d) => {
        setWeather({
          temperature: Math.round(d.current.temperature_2m),
          windSpeed: Math.round(d.current.wind_speed_10m),
          weatherCode: d.current.weather_code,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const condition = weather
    ? getFlyingCondition(weather.windSpeed, weather.weatherCode)
    : null;

  return (
    <section className="py-20 px-4" style={{ background: "#07162A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-cinematic tracking-[0.4em] text-sm mb-4"
            style={{ color: "#27D7FF" }}
          >
            LIVE CONDITIONS
          </p>
          <h2 className="font-cinematic text-4xl md:text-5xl text-white">
            POKHARA WEATHER
          </h2>
        </div>

        <div
          className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "rgba(0,20,50,0.7)",
            border: "1px solid rgba(39,215,255,0.25)",
            boxShadow: "0 0 60px rgba(39,215,255,0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(39,215,255,0.08) 0%, transparent 60%)",
            }}
          />

          {loading && (
            <div
              className="flex flex-col items-center justify-center gap-4 py-8"
              data-ocid="weather.loading_state"
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  background: "rgba(39,215,255,0.1)",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div
                className="h-4 w-32 rounded"
                style={{
                  background: "rgba(39,215,255,0.1)",
                  animation: "pulse 1.5s ease-in-out infinite 0.2s",
                }}
              />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Fetching live conditions...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-8" data-ocid="weather.error_state">
              <div className="text-5xl mb-4">🌤️</div>
              <p className="font-cinematic text-xl text-white mb-2">
                Check Conditions On Site
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Our team will brief you on weather before every flight
              </p>
            </div>
          )}

          {!loading && !error && weather && condition && (
            <div
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              data-ocid="weather.success_state"
            >
              {/* Left: weather info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-sm tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    📍 Pokhara, Nepal
                  </span>
                </div>
                <p
                  className="text-sm mb-6"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {today}
                </p>

                <div className="flex items-end gap-4 mb-6">
                  <span className="text-7xl">
                    {getWeatherIcon(weather.weatherCode)}
                  </span>
                  <div>
                    <div
                      className="font-cinematic text-6xl"
                      style={{ color: "#27D7FF", lineHeight: 1 }}
                    >
                      {weather.temperature}°
                    </div>
                    <div
                      className="text-sm mt-1"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {getWeatherLabel(weather.weatherCode)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">💨</span>
                  <div>
                    <span
                      className="font-cinematic text-2xl"
                      style={{ color: "white" }}
                    >
                      {weather.windSpeed} km/h
                    </span>
                    <span
                      className="text-sm ml-2"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Wind Speed
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: flying condition */}
              <div className="text-center">
                <p
                  className="text-sm tracking-widest mb-4"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  TODAY'S FLYING CONDITIONS
                </p>
                <div
                  className="inline-block rounded-2xl px-8 py-6"
                  style={{
                    background: condition.bg,
                    border: `2px solid ${condition.color}`,
                  }}
                >
                  <div
                    className="font-cinematic text-4xl md:text-5xl"
                    style={{
                      color: condition.color,
                      textShadow: `0 0 30px ${condition.color}`,
                    }}
                  >
                    {condition.label}
                  </div>
                </div>
                <p
                  className="text-xs mt-4"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  ✓ Weather checked before every flight
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
