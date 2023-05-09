export const getSavedVinIds = () => {
    const savedVinIds = localStorage.getItem('saved_vins')
      ? JSON.parse(localStorage.getItem('saved_vins'))
      : [];
  
    return savedVinIds;
  };
  
  export const saveVinIds = (vinIdArr) => {
    if (vinIdArr.length) {
      localStorage.setItem('saved_vins', JSON.stringify(vinIdArr));
    } else {
      localStorage.removeItem('saved_vins');
    }
  };
  
  export const removeVinyId = (vinId) => {
    const savedVinIds = localStorage.getItem('saved_vins')
      ? JSON.parse(localStorage.getItem('saved_vins'))
      : null;
  
    if (!savedVinIds) {
      return false;
    }
  
    const updatedSavedVinIds = savedVinIds?.filter((savedVinId) => savedVinId !== vinId);
    localStorage.setItem('saved_vins', JSON.stringify(updatedSavedVinIds));
  
    return true;
  };