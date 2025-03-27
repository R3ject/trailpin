// src/components/Onboarding.jsx
import React, { useEffect } from 'react';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

const Onboarding = () => {
  useEffect(() => {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          intro: "Welcome to TrailPin! Let's take a quick tour."
        },
        {
          element: document.querySelector('.map-container'),
          intro: "This is your interactive map where you can drop pins."
        },
        {
          element: document.querySelector('.timeline'),
          intro: "Here you can see your ride history."
        },
        {
          element: document.querySelector('.filter-panel'),
          intro: "Use these filters to search your rides."
        },
        {
          element: document.querySelector('header button'),
          intro: "Use this button to switch themes."
        }
      ]
    });
    intro.start();
  }, []);

  return null;
};

export default Onboarding;
