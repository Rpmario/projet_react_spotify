class MusicApiService {
    constructor(apiBaseUrl) {
      this.apiBaseUrl = apiBaseUrl;
    }
  
    async getLatestTracks() {
      try {
        const response = await fetch(`${this.apiBaseUrl}/tracks/latest`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching latest tracks:', error);
        throw error;
      }
    }
  
    async getArtist(id) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/artists/${id}`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching artist:', error);
        throw error;
      }
    }
  
    async getAlbum(id) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/albums/${id}`);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching album:', error);
        throw error;
      }
    }
  }
  
  export default MusicApiService;
  