export const savePins = (pins) => {
    localStorage.setItem('trailPins', JSON.stringify(pins));
  };
  
  export const loadPins = () => {
    const pins = localStorage.getItem('trailPins');
    return pins ? JSON.parse(pins) : [];
  };
  