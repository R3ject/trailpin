// src/App.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import MapView from './components/MapView';
import AddPinForm from './components/AddPinForm';
import Timeline from './components/Timeline';
import FilterPanel from './components/FilterPanel';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { savePins, loadPins } from './utils/storage';
import { savePinToFirestore, loadPinsFromFirestore, deletePinFromFirestore } from './firebaseHelpers';
import { uploadPinPhoto } from './cloudinaryHelpers';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

// Lazy load heavy components
const PinModal = lazy(() => import('./components/PinModal'));
const RideTrendsChart = lazy(() => import('./components/RideTrendsChart'));

function App() {
  const [pins, setPins] = useState([]);
  const [newPinCoords, setNewPinCoords] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [filter, setFilter] = useState({ trailName: '', startDate: '', endDate: '' });
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  // Persist authentication state with Firebase.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Geolocation "Locate Me" handler.
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Convert Leaflet's LatLng to a plain object.
          setNewPinCoords({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Load pins on mount.
  useEffect(() => {
    if (user) {
      loadPinsFromFirestore(user.uid).then((loadedPins) => setPins(loadedPins));
    } else {
      setPins(loadPins());
    }
  }, [user]);

  // Save pins locally whenever they change.
  useEffect(() => {
    savePins(pins);
  }, [pins]);

  // Show authentication UI if no user is signed in.
  if (!user) {
    return (
      <div className="auth-container">
        {showSignUp ? (
          <>
            <SignUp onSignUp={setUser} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignUp(false)}>Sign In</button>
            </p>
          </>
        ) : (
          <>
            <SignIn onSignIn={setUser} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Filtering logic.
  const filteredPins = pins.filter((pin) => {
    const matchesName = pin.trailName.toLowerCase().includes(filter.trailName.toLowerCase());
    const pinDate = new Date(pin.date);
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;
    const matchesStart = startDate ? pinDate >= startDate : true;
    const matchesEnd = endDate ? pinDate <= endDate : true;
    return matchesName && matchesStart && matchesEnd;
  });

  // Map click handler.
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setNewPinCoords({ lat, lng });
    setSelectedPin(null);
  };

  // Add pin handler with Cloudinary upload.
  const handleAddPin = async (pinData) => {
    let photoUrls = [];
    if (pinData.photos && pinData.photos.length > 0) {
      for (let i = 0; i < pinData.photos.length; i++) {
        try {
          const url = await uploadPinPhoto(pinData.photos[i]);
          photoUrls.push(url);
        } catch (error) {
          console.error("Error uploading photo to Cloudinary:", error);
        }
      }
    }
    const fullPinData = { ...pinData, photos: photoUrls, coords: newPinCoords, userId: user ? user.uid : 'guest' };
    const updatedPins = [...pins, fullPinData];
    setPins(updatedPins);
    if (user) {
      try {
        await savePinToFirestore(fullPinData, user.uid);
      } catch (error) {
        alert("Error saving pin to Firestore. Check the console for details.");
      }
    }
    setNewPinCoords(null);
  };

  // Delete pin handler.
  const handleDeletePin = async (pin) => {
    const updatedPins = pins.filter((p) => p.id !== pin.id);
    setPins(updatedPins);
    if (selectedPin && selectedPin.id === pin.id) {
      setSelectedPin(null);
    }
    if (user && pin.id) {
      try {
        await deletePinFromFirestore(pin.id);
      } catch (error) {
        alert("Error deleting pin from Firestore. Check the console for details.");
      }
    }
  };

  // Other handlers.
  const handleSelectPin = (pin) => setSelectedPin(pin);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleEditPin = (pin) => {
    console.log('Edit pin:', pin);
    // Implement editing functionality as desired.
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TrailPin</h1>
        <button onClick={handleLocateMe}>Locate Me</button>
      </header>
      <div className="container">
        <div className="main">
          <MapView pins={filteredPins} onMapClick={handleMapClick} />
          {newPinCoords && (
            <div className="form-container">
              <h2>Add Pin at {JSON.stringify(newPinCoords)}</h2>
              <AddPinForm onAddPin={handleAddPin} />
            </div>
          )}
          <Suspense fallback={<div>Loading Trends Chart...</div>}>
            <RideTrendsChart pins={pins} />
          </Suspense>
        </div>
        <div className="sidebar">
          <FilterPanel onFilterChange={handleFilterChange} />
          <Timeline pins={filteredPins} onSelectPin={handleSelectPin} />
          <Suspense fallback={<div>Loading Pin Details...</div>}>
            {selectedPin && (
              <PinModal
                pin={selectedPin}
                onClose={() => setSelectedPin(null)}
                onDelete={handleDeletePin}
                onEdit={handleEditPin}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
