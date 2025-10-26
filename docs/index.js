import {
  format_string,
  format_with_custom_locale,
} from "@rprojects/num-format-js";

// Sample number for demonstrations
const SAMPLE_NUMBER = 9876543;
const NEGATIVE_NUMBER = -9876543;

// Locale examples with flags and country names
const localeExamples = [
  { flag: "🇺🇸", country: "United States", locale: "en", number: SAMPLE_NUMBER },
  { flag: "🇹🇷", country: "Turkey", locale: "tr", number: SAMPLE_NUMBER },
  { flag: "🇩🇪", country: "Germany", locale: "de", number: SAMPLE_NUMBER },
  { flag: "🇫🇷", country: "France", locale: "fr", number: SAMPLE_NUMBER },
  { flag: "🇪🇸", country: "Spain", locale: "es", number: SAMPLE_NUMBER },
  { flag: "🇮🇹", country: "Italy", locale: "it", number: SAMPLE_NUMBER },
  { flag: "🇯🇵", country: "Japan", locale: "ja", number: SAMPLE_NUMBER },
  { flag: "🇧🇷", country: "Brazil", locale: "pt-BR", number: SAMPLE_NUMBER },
  { flag: "🇮🇳", country: "India", locale: "en-IN", number: SAMPLE_NUMBER },
];

// Fun examples with emojis
const funExamples = [
  {
    name: "🎉 Party Numbers",
    number: SAMPLE_NUMBER,
    settings: { separator: "🎉", minus_sign: "😢" },
  },
  {
    name: "💎 Diamond Separator",
    number: SAMPLE_NUMBER,
    settings: { separator: "💎", minus_sign: "➖" },
  },
  {
    name: "⭐ Star Format",
    number: NEGATIVE_NUMBER,
    settings: { separator: "⭐", minus_sign: "❌" },
  },
  {
    name: "🎯 Target Style",
    number: SAMPLE_NUMBER,
    settings: { separator: "🎯", decimal: "🔴" },
  },
];

function createLocaleExamples() {
  const container = document.getElementById("locale-examples");

  localeExamples.forEach(({ flag, country, locale, number }) => {
    const formatted = format_string(locale, number);

    const card = document.createElement("div");
    const flagDiv = document.createElement("div");
    const countryDiv = document.createElement("div");
    const localeDiv = document.createElement("div");
    const numberDiv = document.createElement("div");

    flagDiv.className = "flag";
    countryDiv.className = "country";
    localeDiv.className = "locale";
    numberDiv.className = "number";
    card.className = "example-card";

    flagDiv.textContent = flag;
    countryDiv.textContent = country;
    localeDiv.textContent = `locale: '${locale}'`;
    numberDiv.textContent = formatted;

    card.appendChild(flag);
    card.appendChild(country);
    card.appendChild(locale);
    card.appendChild(numberDiv);

    container.appendChild(card);
  });
}

function createCustomDemo() {
  const settingsContainer = document.getElementById("custom-settings");
  const resultContainer = document.getElementById("custom-result");

  const customSettings = {
    grouping: 0,
    minus_sign: "−",
    plus_sign: "+",
    decimal: ",",
    separator: " ",
  };

  // Display settings
  const settingsDisplay = [
    { label: "Grouping", value: "Standard (0)" },
    { label: "Minus Sign", value: customSettings.minus_sign },
    { label: "Plus Sign", value: customSettings.plus_sign },
    { label: "Decimal", value: customSettings.decimal },
    { label: "Separator", value: `'${customSettings.separator}'` },
  ];

  settingsDisplay.forEach(({ label, value }) => {
    const item = document.createElement("div");
    item.className = "setting-item";
    item.innerHTML = `
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    `;
    settingsContainer.appendChild(item);
  });

  // Format and display result
  const result = format_with_custom_locale(NEGATIVE_NUMBER, customSettings);
  resultContainer.textContent = result;
}

function createFunExamples() {
  const container = document.getElementById("fun-examples");

  funExamples.forEach(({ name, number, settings }) => {
    const formatted = format_with_custom_locale(number, settings);

    const card = document.createElement("div");
    const country = document.createElement("div");
    const locale = document.createElement("div");
    const numberDiv = document.createElement("div");
    country.className = "country";
    locale.className = "locale";
    numberDiv.className = "number";
    card.className = "example-card";

    country.textContent = name;
    locale.textContent = `Input: ${number.toLocaleString()}`;
    numberDiv.textContent = formatted;

    card.appendChild(country);
    card.appendChild(locale);
    card.appendChild(numberDiv);

    container.appendChild(card);
  });
}

function init() {
  console.log("🚀 @rprojects/num-format-js demo loaded!");

  createLocaleExamples();
  createCustomDemo();
  createFunExamples();

  console.log("✅ All examples rendered successfully!");
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
