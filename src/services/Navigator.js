export const Navigator = (setLocation) => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      const success = (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      }
      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert('Location access denied')
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
}
