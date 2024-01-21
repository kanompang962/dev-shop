// session.service.ts

export function getSessionUser(key: string): any {
    const sessionData = sessionStorage.getItem(key);
  
    try {
      // Parse JSON if the stored data is a JSON string
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Error parsing session data:', error);
      return null;
    }
  }
  