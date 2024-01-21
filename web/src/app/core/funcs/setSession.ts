export function setSessionUser(key: string,value:string): any {
    const sessionData = sessionStorage.setItem(key,value);
  
    try {
      // Parse JSON if the stored data is a JSON string
      return true
    } catch (error) {
      console.error('Error parsing session data:', error);
      return false;
    }
  }